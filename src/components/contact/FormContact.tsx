"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/Input";

interface FormData {
  contactType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const FormContact = () => {
  const initialValues: FormData = {
    contactType: "Email",
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  return (
    <div className="container mx-auto text-black pt-5 lg:pt-10 pb-5 font-open_Sans">
      <h2 className="text-lg font-semibold mb-2">Still Need Help?</h2>
      <p className="font-bold mb-6">Get in touch with us.</p>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          contactType: Yup.string().required("Please select a contact type"),
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone must contain only digits")
            .min(10, "Phone must be at least 10 digits")
            .required("Phone is required"),
          message: Yup.string().max(500, "Message too long (max 500 chars)"),
        })}
        onSubmit={(values, { resetForm }) => {
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
        }}
      >
        {() => (
          <Form className="space-y-4">
            <Input
              label="Contact Type"
              name="contactType"
              as="select"
              options={["Email", "Call", "WhatsApp"]}
            />
            <Input label="Your name" name="name" />
            <Input label="Your email" name="email" type="email" />
            <Input label="Mobile Number" name="phone" type="tel" />
            <Input
              label="Your message (optional)"
              name="message"
              rows={5}
              as="textarea"
            />

            <button
              type="submit"
              className="bg-black text-white w-full lg:w-[20%] py-2 rounded-md hover:bg-gray-800 cursor-pointer text-[16px] font-semibold"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormContact;
