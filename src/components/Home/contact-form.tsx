"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const ContactForm: React.FC = () => {
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
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 w-full md:max-w-sm"
    >
      {/* Email */}
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email*"
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
        <input
          type="text"
          name="name"
          placeholder="Your name*"
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
        <input
          type="text"
          name="phone"
          placeholder="Phone Number*"
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
        <textarea
          name="message"
          placeholder="Comment"
          className={`${inputBase} min-h-[100px]`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-full px-6 py-2"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
