"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
interface ContactFormProps {
  variant?: "withLabel" | "noLabel"; 
}

const ContactForm: React.FC<ContactFormProps> = ({ variant = "withLabel" }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      message: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Submitted values:", values);
      alert("Form submitted successfully!");
      resetForm(); 
    },
  });

  const inputBase =
    "w-full bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`${
        variant === "noLabel"
          ? "bg-white shadow-xl rounded-2xl p-6 w-full md:max-w-sm"
          : "w-full max-w-lg"
      }`}
    >
      {/* Email */}
      <div className="mb-4">
        {variant === "withLabel" && <label className={labelClass}>Email</label>}
        <input
          type="email"
          name="email"
          placeholder={variant === "noLabel" ? "Email*" : ""}
          className={inputBase}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={errorClass}>{formik.errors.email}</p>
        )}
      </div>

      {/* Name */}
      <div className="mb-4">
        {variant === "withLabel" && <label className={labelClass}>Your name</label>}
        <input
          type="text"
          name="name"
          placeholder={variant === "noLabel" ? "Your name*" : ""}
          className={inputBase}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className={errorClass}>{formik.errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        {variant === "withLabel" && <label className={labelClass}>Mobile Number</label>}
        <input
          type="text"
          name="phone"
          placeholder={variant === "noLabel" ? "Phone Number*" : ""}
          className={inputBase}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className={errorClass}>{formik.errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-4">
        {variant === "withLabel" && (
          <label className={labelClass}>Your message (optional)</label>
        )}
        <textarea
          name="message"
          placeholder={variant === "noLabel" ? "Comment" : ""}
          className={`${inputBase} min-h-[100px]`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`${
          variant === "noLabel"
            ? "bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-full px-6 py-2"
            : "bg-black text-white font-medium px-6 py-2 rounded-md hover:bg-gray-800"
        }`}
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
