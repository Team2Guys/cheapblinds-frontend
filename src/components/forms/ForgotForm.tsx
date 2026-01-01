"use client";

import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Toaster, Input } from "@components";
import { REQUEST_PASSWORD_RESET_MUTATION } from "@graphql";
import { ForgotForm_validationSchema } from "@data/Validations";
import { FaSpinner } from "react-icons/fa";

export const ForgotForm = React.memo(() => {
  const [requestPasswordReset, { loading }] = useMutation(REQUEST_PASSWORD_RESET_MUTATION);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-5 px-2">
      <h2 className="text-heading text-center">Forgot Your Password?</h2>
      <p className="text-center">
        Please enter your email address below. You will receive a link to reset your password.
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotForm_validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const { data } = await requestPasswordReset({
              variables: {
                input: {
                  email: values.email,
                },
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/graphql-response+json",
                },
              },
            });

            const response = data?.requestPasswordReset;

            if (response?.status === "success") {
              Toaster("success", response.message || "Reset password email sent successfully.");
              resetForm();
            } else {
              Toaster("error", response?.message || "Something went wrong. Please try again.");
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              Toaster("error", error.message);
            } else {
              Toaster("error", "Network error. Please try again.");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Input name="email" type="email" placeholder="Email address*" />

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-fit bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 cursor-pointer disabled:opacity-60"
            >
              {loading ? <FaSpinner className="animate-spin text-lg" /> : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
