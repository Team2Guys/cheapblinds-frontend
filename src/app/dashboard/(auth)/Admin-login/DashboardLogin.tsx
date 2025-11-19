"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { SignIn_validationSchema } from "@data/Validations";
import { Input, Toaster } from "@components/ui";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "@context/UserContext";
import { SIGN_IN } from "@graphql";

interface FormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    id: string;
    role: string;
  };
}

const DashboardLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");

  // mutation
  const [signin, { loading }] = useMutation<{ signin: LoginResponse }>(SIGN_IN);

  const initialValues: FormValues = { email: "", password: "" };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const variables = {
        input: {
          email: values.email.trim(),
          password: values.password,
          role: activeTab, // 👈 SEND ROLE BASED ON SELECTED TAB
        },
      };

      const { data } = await signin({ variables });

      const response = data?.signin;
      if (!response) throw new Error("No response received");

      if (response.status.toLowerCase() !== "success")
        throw new Error(response.message || "Invalid credentials");

      if (!response.data) throw new Error("No user data received");

      // LOGIN & SAVE TOKEN + ROLE
      login(response.data);

      Toaster("success", `${activeTab} logged in successfully!`);
      router.push("/dashboard");
    } catch  {
      Toaster("error", "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-white items-center justify-center px-4">
      <div className="w-full max-w-md border p-6 rounded-lg bg-white shadow-md relative z-10">
        <h1 className="text-heading mb-5 text-center text-2xl font-bold">Login</h1>

        <div className="flex mb-5 border-b">
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "ADMIN"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("ADMIN")}
          >
            Admin
          </button>

          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "SUPER_ADMIN"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("SUPER_ADMIN")}
          >
            Super Admin
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignIn_validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <Input name="email" type="email" placeholder="Enter your email" />
            <Input name="password" type="password" placeholder="Enter your password" />

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-md mt-4 px-4 disabled:opacity-60 w-full"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Sign In"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default DashboardLogin;
