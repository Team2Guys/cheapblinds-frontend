"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Input, Toaster } from "@components/ui";
import { useMutation } from "@apollo/client";
import { useSearchParams, useRouter } from "next/navigation";
import { UPDATE_PASSWORD } from "@graphql/auth";
import { UpdatePasswordSchema } from "@data/Validations";
import { FaSpinner } from "react-icons/fa";

interface FormValues {
  password: string;
  confirmPassword: string;
}

export const UpdatePassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resetToken = searchParams.get("resetToken");

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD);

  const initialValues: FormValues = { password: "", confirmPassword: "" };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    if (!resetToken) {
      Toaster("error", "Reset token is missing!");
      setSubmitting(false);
      return;
    }

    try {
      const { data } = await updatePassword({
        variables: {
          input: {
            resetToken: resetToken,
            password: values.password,
          },
        },
      });

      const response = data?.updatePassword;

      if (response?.status.toLowerCase() === "success") {
        Toaster("success", response.message || "Password updated successfully!");
        router.push("/login");
      } else {
        if (response?.message?.toLowerCase().includes("jwt expired")) {
          Toaster("error", "Token is expired. Please request a new reset link.");
        } else {
          Toaster("error", response?.message || "Failed to update password");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("jwt expired")) {
          Toaster("error", "Token is expired. Please request a new reset link.");
        } else {
          Toaster("error", error.message);
        }
      } else {
        Toaster("error", "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="my-10 mx-auto max-w-xl px-2">
      <h1 className="text-center text-3xl font-bold mb-6">Update Password</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={UpdatePasswordSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <Input type="password" name="password" placeholder="New Password" />
          <Input type="password" name="confirmPassword" placeholder="Confirm Password" />

          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md  disabled:opacity-60 cursor-pointer"
          >
            {loading ? <FaSpinner className="animate-spin text-lg" /> : "Update Password"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
