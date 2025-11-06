"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/Input"; // adjust path as needed

export const ForgotForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email address is required"),
  });

  return (
    <div className="max-w-md mx-auto mt-10 space-y-5">
      <h2 className="text-heading">Forgot Your Password?</h2>
      <p className=" text-center">
        Please enter your email address below. You will receive a link to reset your password.
      </p>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Reset Request Submitted:", values);
        }}
      >
        {() => (
          <Form className="space-y-4">
            <Input name="email" type="email" placeholder="Email address*" />

            <button
              type="submit"
              className="w-fit bg-primary font-semibold py-2 px-4 rounded-md hover:bg-primary/90 cursor-pointer"
            >
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
