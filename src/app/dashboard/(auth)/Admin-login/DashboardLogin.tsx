"use client";
import React, { useState } from "react";
import USRcomponent from "@components/userComponent/userComponent";
import { IoIosLock, IoMdMail } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const DashboardLogin = () => {
  const intialvalue = {
    email: "",
    password: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState(intialvalue);

  const [loginError, setError] = useState<string | null | undefined>();
  const [adminType, setadminType] = useState<string | undefined>("Admin");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      return setError("All fields are rquired");
    }
    try {
      const adminFlag = adminType == "Admin";

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        IsAdmin: adminFlag,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err, "err");
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as unknown as { response: { data: { message: string } } }).response ===
          "object" &&
        (err as unknown as { response: { data: { message: string } } }).response?.data?.message
      ) {
        setError(
          (err as unknown as { response: { data: { message: string } } }).response.data.message,
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const inputFields = [
    {
      type: "email",
      name: "email",
      id: "email",
      placeholder: "Email",
      value: formData.email,
      onChange: handleChange,
      Icon: IoMdMail,
      iconClassName: "text-red-500",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      placeholder: "Enter Password",
      value: formData.password,
      onChange: handleChange,
      Icon: IoIosLock,
      iconClassName: "text-red-500",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden relative bg-white dark:bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-primary opacity-30 rounded-full blur-3xl top-1/3 left-[10%] mix-blend-overlay" />
        <div className="absolute w-[500px] h-[500px] bg-primary opacity-20 rounded-full blur-2xl -top-20 right-[5%] mix-blend-overlay" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 rounded-full blur-2xl bottom-0 right-0 mix-blend-overlay" />
      </div>
      <USRcomponent
        handleSubmit={handleSubmit}
        error={loginError}
        loading={false}
        inputFields={inputFields}
        title="Sign In as Admin"
        buttonTitle="Sign In"
        setadminType={setadminType}
        adminType={adminType}
      />
    </div>
  );
};

export default DashboardLogin;
