"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Formik, Form, FormikHelpers } from "formik";
import { SignIn_validationSchema } from "@data/Validations";
import { Input, Toaster } from "@components/ui";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "@context/UserContext";
import { ADMIN_LOGIN, SUPER_ADMIN_LOGIN } from "@graphql/Admins";

interface FormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    id: string;
    accessToken: string;
    role: string;
  };
}

const DashboardLogin = () => {
  const router = useRouter();
  const { loginAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<"ADMIN" | "SUPERADMIN">("ADMIN");

  const [adminLogin, { loading: adminLoading }] = useMutation<{ signinAdmin: LoginResponse }>(
    ADMIN_LOGIN,
  );

  const [superAdminLogin, { loading: superAdminLoading }] = useMutation<{
    signinSuperAdmin: LoginResponse;
  }>(SUPER_ADMIN_LOGIN);

  const loading = activeTab === "ADMIN" ? adminLoading : superAdminLoading;

  const initialValues: FormValues = { email: "", password: "" };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const variables = {
        input: {
          email: values.email.trim(),
          password: values.password,
        },
      };

      let response: LoginResponse | undefined;

      if (activeTab === "SUPERADMIN") {
        const { data } = await superAdminLogin({ variables });
        response = data?.signinSuperAdmin;
      } else {
        const { data } = await adminLogin({ variables });
        response = data?.signinAdmin;
      }

      if (!response) throw new Error("No response received");
      if (response.status.toLowerCase() !== "success")
        throw new Error(response.message || "Invalid credentials");

      if (!response.data) throw new Error("No admin data received");

      loginAdmin(response.data);

      Toaster("success", `${activeTab} logged in successfully!`);
      router.push("/dashboard");
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong!";
      Toaster("error", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-primary opacity-30 rounded-full blur-3xl top-1/3 left-[10%]" />
        <div className="absolute w-[500px] h-[500px] bg-primary opacity-20 rounded-full blur-2xl -top-20 right-[5%]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-2xl bottom-0 right-0" />
      </div>

      <div className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-md border p-6 rounded-lg bg-white shadow-md relative z-10">
          <h1 className="text-heading mb-5 text-center text-2xl font-bold">Login</h1>
          <div className="flex mb-5 border-b">
            <button
              className={`flex-1 py-2 font-semibold ${
                activeTab === "ADMIN" ? "border-b-2 border-primary text-primary" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("ADMIN")}
            >
              Admin
            </button>

            <button
              className={`flex-1 py-2 font-semibold ${
                activeTab === "SUPERADMIN"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("SUPERADMIN")}
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
              <Input name="email" type="email" placeholder="Enter email" />
              <Input name="password" type="password" placeholder="Enter password" />

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
    </div>
  );
};

export default DashboardLogin;
