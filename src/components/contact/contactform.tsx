"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormData } from "types/type";
import FormInput from "./forminput";
import FormTextarea from "./formtextarea";

const ContactForm = () => {
  const formik = useFormik<FormData>({
    initialValues: {
      contactType: "Email",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      contactType: Yup.string().required("Please select a contact type"),
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must contain only digits")
        .min(10, "Phone must be at least 10 digits")
        .required("Phone is required"),
      message: Yup.string().max(500, "Message too long (max 500 chars)"),
    }),
    onSubmit: (values, { resetForm }) => {
      try {
        const storedData = JSON.parse(localStorage.getItem("contactFormData") || "[]");
        const updatedData = [...storedData, values];
        localStorage.setItem("contactFormData", JSON.stringify(updatedData));

        alert("Form submitted successfully! (stored locally)");
        resetForm();
      } catch (error) {
        console.error("Error saving form data locally:", error);
        alert("Something went wrong while saving data locally.");
      }
    },
  });

  return (
    <div className="container mx-auto text-black pt-5 lg:pt-10 pb-5 font-open_Sans">
      <h2 className="text-lg font-semibold mb-2">Still Need Help?</h2>
      <p className="font-bold mb-6">Get in touch with us.</p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <FormInput
          label="Contact Type"
          name="contactType"
          value={formik.values.contactType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.contactType}
          touched={formik.touched.contactType}
          as="select"
          options={["Email", "Call", "WhatsApp"]}
        />

        <FormInput
          label="Your name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          touched={formik.touched.name}
        />

        <FormInput
          label="Your email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <FormInput
          label="Mobile Number"
          name="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        <FormTextarea
          label="Your message (optional)"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.message}
          touched={formik.touched.message}
        />

        <button
          type="submit"
          className="bg-black text-white w-full lg:w-[20%] py-2 rounded-md hover:bg-gray-800 cursor-pointer text-[16px] font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
