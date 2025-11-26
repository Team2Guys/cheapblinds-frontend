"use client";

import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { SIGN_UP } from "@graphql";
import { toast } from "react-toastify";
import { signUp_validationSchema } from "@data/Validations";
import { FaSpinner } from "react-icons/fa";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
  isNewsletterSubscribed: boolean;
}

export const RegisterForm = () => {
  const router = useRouter();
  const [signup, { loading }] = useMutation(SIGN_UP);

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm }: FormikHelpers<RegisterFormValues>,
  ) => {
    try {
      await signup({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: "USER",
            password: values.password,
            isNewsletterSubscribed: values.isNewsletterSubscribed,
          },
        },
      });

      toast.success(
        <div className="text-center space-y-2 p-2">
          <h3 className="font-bold text-lg text-black">Account Created Successfully 🎉</h3>
          <p className="text-sm">
            Please verify your account. We’ve sent a confirmation email to{" "}
            <span className="font-semibold">{values.email}</span>.
          </p>
          <p className="text-sm text-gray-500">Go to Gmail and check your inbox.</p>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: true,
          draggable: false,
          hideProgressBar: true,
          className: "rounded-lg shadow-xl bg-white text-black p-6 flex flex-col items-center",
          onClose: () => {
            router.push("/login");
          },
        },
      );

      resetForm();
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const graphQLError = error.graphQLErrors?.[0]?.message || "";
        const message = graphQLError.toLowerCase();

        if (message.includes("user already exists") || message.includes("email already exists")) {
          toast.error("Account already exists. Please log in instead.");
        } else {
          toast.error("Something went wrong while creating your account. Please try again later.");
        }
      } else if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 space-y-5">
      <h2 className="text-heading">Create new account</h2>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "USER",
          confirmPassword: "",
          isNewsletterSubscribed: false,
        }}
        validationSchema={signUp_validationSchema}
        onSubmit={handleSubmit}
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
                id="isNewsletterSubscribed"
                name="isNewsletterSubscribed"
                className="w-5 h-5 accent-primary cursor-pointer"
              />
              <label
                htmlFor="isNewsletterSubscribed"
                className="font-semibold cursor-pointer select-none"
              >
                Sign Up for Newsletter
              </label>
            </div>

            <Input name="email" type="email" placeholder="Email address*" />
            <Input name="password" type="password" placeholder="Password*" />
            <Input name="confirmPassword" type="password" placeholder="Confirm Password*" />

            <button
              type="submit"
              disabled={loading}
              className="w-fit bg-primary font-semibold py-2 px-4 rounded-md mx-auto disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {loading ? <FaSpinner className="animate-spin text-lg" /> : "Create an Account"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
