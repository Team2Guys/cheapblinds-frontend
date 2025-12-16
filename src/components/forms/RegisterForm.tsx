"use client";

import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { SIGN_UP_MUTATION, CREATE_NEWSLETTER_SUBSCRIBER_MUTATION } from "@graphql";
import { toast } from "react-toastify";
import { signUp_validationSchema } from "@data/Validations";
import { FaSpinner } from "react-icons/fa";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  isNewsletterSubscribed: boolean;
}

export const RegisterForm = () => {
  const router = useRouter();

  const [signup, { loading }] = useMutation(SIGN_UP_MUTATION);
  const [createSubscriber] = useMutation(CREATE_NEWSLETTER_SUBSCRIBER_MUTATION);

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      // 1️⃣ Create User Account
      await signup({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            role: "USER",
            password: values.password,
          },
        },
      });

      // 2️⃣ Create Newsletter Entry (true/false)
      await createSubscriber({
        variables: {
          input: {
            email: values.email,
            isActive: values.isNewsletterSubscribed ? true : false,
          },
        },
      });

      // 3️⃣ Success Popup
      toast.success(
        <div className="text-center space-y-2 p-2">
          <h3 className="font-bold text-lg text-black">
            Account Created Successfully 🎉
          </h3>
          <p className="text-sm">
            Please verify your account. We’ve sent a confirmation email to{" "}
            <span className="font-semibold">{values.email}</span>.
          </p>
          <p className="text-sm text-gray-500">
            Open your inbox to activate your account.
          </p>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          className: "rounded-lg shadow-xl bg-white text-black p-6",
          onClose: () => router.push("/login"),
        }
      );

      resetForm();
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const gqlMessage =
          error.graphQLErrors?.[0]?.message?.toLowerCase() || "";

        if (
          gqlMessage.includes("user already exists") ||
          gqlMessage.includes("email already exists")
        ) {
          toast.error("Account already exists. Please log in instead.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      } else {
        toast.error("Unexpected error occurred.");
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
          confirmPassword: "",
          role: "USER",
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

            {/* Newsletter Checkbox */}
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
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password*"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-fit bg-primary font-semibold py-2 px-4 rounded-md mx-auto disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-lg" />
              ) : (
                "Create an Account"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
