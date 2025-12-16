"use client";
import React from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useMutation, ApolloError } from "@apollo/client";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SIGN_IN_MUTATION } from "@graphql";
import { Toaster, Input } from "@components";
import { SignIn_validationSchema } from "@data/Validations";
import { useAuth } from "@context/UserContext";

interface LoginValues {
  email: string;
  password: string;
  role: string;
}

export const LoginForms = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);

  const initialValues: LoginValues = {
    email: "",
    password: "",
    role: "USER",
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      const response = await signIn({
        variables: {
          input: {
            email: values.email.trim(),
            password: values.password,
            role: "USER",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/graphql-response+json",
          },
        },
      });

      const userData = response.data?.signin;
      if (!userData) {
        Toaster("error", "Invalid login response from server.");
        return;
      }

      // login context
      login(userData);

      Toaster("success", "Logged in successfully!");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof ApolloError) {
        const graphQLError = error.graphQLErrors?.[0]?.message;
        Toaster(
          "error",
          graphQLError || error.message || "Something went wrong. Please try again.",
        );
        return;
      }
      Toaster("error", "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignIn_validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <Input name="email" type="email" placeholder="Enter your email" />
          <Input name="password" type="password" placeholder="Enter your password" />

          <div className="flex gap-4 items-center">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 font-semibold py-2 rounded-md w-fit px-4 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <FaSpinner className="animate-spin text-lg" /> : "Sign In"}
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
