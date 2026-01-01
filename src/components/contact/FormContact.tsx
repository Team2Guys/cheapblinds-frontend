"use client";
import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/Input";
import { useMutation } from "@apollo/client";
import { Toaster } from "@components/ui";
import { CREATE_INQUIRY_MUTATION } from "@graphql";

interface FormData {
  inquiryType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const FormContact = () => {
  const [createInquiry, { loading }] = useMutation(CREATE_INQUIRY_MUTATION);

  const initialValues: FormData = {
    inquiryType: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    inquiryType: Yup.string().required("Please select a contact type"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must contain only digits")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
    message: Yup.string().max(500, "Message too long (max 500 chars)"),
  });

  const handleSubmit = async (values: FormData, { resetForm }: FormikHelpers<FormData>) => {
    try {
      await createInquiry({
        variables: {
          input: {
            ...values,
            inquiryType: values.inquiryType.toUpperCase(),
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/graphql-response+json",
          },
        },
      });
      Toaster("success", "Form submitted successfully!");
      resetForm();
    } catch {
      Toaster("error", "Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="container mx-auto text-black pt-5 lg:pt-10 pb-5 font-open_Sans">
      <h2 className="text-lg font-semibold mb-2">Still Need Help?</h2>
      <p className="font-bold mb-6">Get in touch with us.</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <Input
              label="Contact Type"
              name="inquiryType"
              as="select"
              options={["Email", "Phone", "WhatsApp", "Other"]}
            />
            <Input label="Your Name" name="name" />
            <Input label="Your Email" name="email" type="email" />
            <Input label="Mobile Number" name="phone" type="tel" />
            <Input label="Your Message (optional)" name="message" rows={5} as="textarea" />

            <button
              type="submit"
              className="bg-black text-white w-fit py-2 px-6 rounded-md hover:bg-black/80 font-semibold disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(FormContact);
