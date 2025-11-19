"use client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHECK_VERIFICATION_TOKEN, SEND_VERIFICATION_TOKEN } from "@graphql";
import { useSearchParams, useRouter } from "next/navigation";
import { Toaster } from "@components/ui";
import { FaSpinner } from "react-icons/fa";

export const UserVerification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verificationToken = searchParams.get("verificationToken");
  const email = searchParams.get("email");

  console.log(email, "emailemail");

  const [isExpired, setIsExpired] = useState(false);

  // ✅ Check Verification Mutation
  const [checkVerificationToken, { loading }] = useMutation(CHECK_VERIFICATION_TOKEN, {
    onCompleted: (data) => {
      if (data?.checkVerificationToken?.status) {
        Toaster("success", data.checkVerificationToken.message || "Email verified successfully!");
        router.push("/login");
      } else {
        Toaster("error", data?.checkVerificationToken?.message || "Verification failed!");
      }
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Email verification failed. Please try again.";

      if (message.toLowerCase().includes("jwt expired")) {
        setIsExpired(true);
        Toaster("error", "Verification link has expired. Please resend the code.");
      } else {
        Toaster("error", message);
      }
    },
  });

  // ✅ Resend Verification Token Mutation
  const [sendVerificationToken, { loading: resendLoading }] = useMutation(SEND_VERIFICATION_TOKEN, {
    onCompleted: (data) => {
      if (data?.sendVerificationToken?.status) {
        Toaster("success", data.sendVerificationToken.message || "New verification email sent!");
      } else {
        Toaster(
          "error",
          data?.sendVerificationToken?.message || "Failed to resend verification email.",
        );
      }
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to resend verification link.";
      Toaster("error", message);
    },
  });

  // ✅ Handle Verify Button Click
  const handleVerifyClick = () => {
    if (!verificationToken) {
      Toaster("error", "Invalid or missing verification token.");
      return;
    }

    checkVerificationToken({
      variables: {
        input: {
          verificationToken,
        },
      },
    });
  };
  const handleResendClick = async () => {
    if (!email) {
      Toaster("error", "Email is required to resend verification link");
      return;
    }
    try {
      await sendVerificationToken({
        variables: {
          input: { email },
        },
      });
    } catch {
      Toaster("error", "Something went wrong. Please try again.");
    }
  };

  return (
    <div className=" p-10 flex items-center justify-center px-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-8 py-10 mx-auto max-w-xl w-full space-y-6">
        <h1 className="font-semibold text-2xl">Email Verification</h1>

        <p className="leading-relaxed text-gray-600">
          Click the button below to verify your email address.
        </p>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleVerifyClick}
            disabled={loading || isExpired}
            className="bg-primary text-white py-3 px-3 md:px-6 hover:bg-primary/90 rounded-md font-semibold cursor-pointer disabled:opacity-60 "
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Verify Email"}
          </button>

          {isExpired && (
            <button
              onClick={handleResendClick}
              disabled={resendLoading}
              className="underline text-primary cursor-pointer text-sm md:text-base"
            >
              {resendLoading ? <FaSpinner className="animate-spin" /> : "Resend Code"}
            </button>
          )}
        </div>

        <div className="text-center pt-4 space-y-1 text-gray-500 text-sm">
          <p>This is an automated email. Please do not reply.</p>
          <p>© 2025 All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
