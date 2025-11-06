"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/Input"; // adjust import path as needed

export const RegisterForm = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email address is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="max-w-4xl mx-auto px-2">
      <h2 className="text-heading">Create new account</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          newsletter: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Submitted:", values);
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First name*" />
              <Input name="lastName" placeholder="Last name*" />
            </div>
            <div className="flex items-center space-x-2">
              <Field
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <label htmlFor="newsletter" className="font-semibold cursor-pointer">
                Sign Up for Newsletter
              </label>
            </div>
            <Input name="email" type="email" placeholder="Email address*" />
            <Input name="password" type="password" placeholder="Password" />
            <Input name="confirmPassword" type="password" placeholder="Confirm Password" />
            <button
              type="submit"
              className="w-fit bg-primary font-semibold py-2 px-4 rounded-md mx-auto"
            >
              Create an Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
