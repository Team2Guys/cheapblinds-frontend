"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@components/ui/Input";
import Link from "next/link";

export const LoginForms = () => {
  // ✅ Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // ✅ Initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // ✅ Submit handler
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Login Data:", values);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <Input name="email" type="email" placeholder="Enter your email" />
          <Input name="password" type="password" placeholder="Enter your password" />
          <div className="flex gap-4 items-center">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 font-semibold py-2 rounded-md w-fit px-4 cursor-pointer"
            >
              Sign In
            </button>
            <Link href="/forgot-password" className="underline font-semibold">
              Forgot Your Password?
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
