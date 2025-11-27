"use client";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHECK_VERIFICATION_TOKEN, SEND_VERIFICATION_TOKEN } from "@graphql";
import { useSearchParams, useRouter } from "next/navigation";
import { Toaster } from "@/components/ui";
import { FaSpinner } from "react-icons/fa";

export const UserVerification = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verificationToken = searchParams.get("verificationToken");
  const email = searchParams.get("email");

  const [isExpired, setIsExpired] = useState(false);

  // ✅ Check Verification Token Mutation
  const [checkVerificationToken, { loading: verifyLoading }] = useMutation(
    CHECK_VERIFICATION_TOKEN,
    {
      onCompleted: (data) => {
        const message = data?.checkVerificationToken?.message;
        if (message === "Email verified successfully") {
          Toaster("success", message);
          router.push("/login");
        } else {
          Toaster("error", message || "Verification failed!");
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
    },
  );

  // ✅ Resend Verification Token Mutation
  const [sendVerificationToken, { loading: resendLoading }] = useMutation(SEND_VERIFICATION_TOKEN, {
    onCompleted: (data) => {
      const message = data?.sendVerificationToken?.message;
      if (message) {
        Toaster("success", message);
      } else {
        Toaster("error", "Failed to resend verification email.");
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
      variables: { input: { verificationToken } },
    });
  };

  const handleResendClick = () => {
    if (!email) {
      Toaster("error", "Email is required to resend verification link.");
      return;
    }

    sendVerificationToken({
      variables: { input: { email } },
    });
  };

  return (
    <div className="p-10 flex items-center justify-center px-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-8 py-10 mx-auto max-w-xl w-full space-y-6">
        <h1 className="font-semibold text-2xl">Email Verification</h1>

        <p className="leading-relaxed text-gray-600">
          Click the button below to verify your email address.
        </p>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleVerifyClick}
            disabled={verifyLoading || isExpired}
            className="bg-primary text-white py-3 px-3 md:px-6 hover:bg-primary/90 rounded-md font-semibold cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {verifyLoading && <FaSpinner className="animate-spin" />}
            {!verifyLoading && "Verify Email"}
          </button>

          {isExpired && (
            <button
              onClick={handleResendClick}
              disabled={resendLoading}
              className="underline text-primary cursor-pointer text-sm md:text-base flex items-center gap-2"
            >
              {resendLoading && <FaSpinner className="animate-spin" />}
              {!resendLoading && "Resend Code"}
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
