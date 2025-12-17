"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_NEWSLETTER_SUBSCRIBER_MUTATION } from "@graphql";
import { Toaster } from "@components/ui";

export const Newsletter = () => {
  const [createNewsletterSubscriber, { loading }] = useMutation(
    CREATE_NEWSLETTER_SUBSCRIBER_MUTATION,
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const isGmail = values.email.toLowerCase().includes("@gmail.com");

        await createNewsletterSubscriber({
          variables: {
            input: {
              email: values.email,
              isActive: isGmail ? true : false, // Gmail → true
            },
          },
        });

        resetForm();
        Toaster("success", "Thank you for subscribing!");
      } catch (error: unknown) {
        const errMsg =
          (error as ApolloError)?.graphQLErrors?.[0]?.message || "Something went wrong. Try again!";

        Toaster("error", errMsg);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col justify-end lg:items-end gap-2">
      <h3>For the latest offers and inspiration sign up below</h3>

      <div className="flex w-full lg:w-[330px] xl:w-[370px] h-14">
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="grow px-4 py-2 rounded-l-md border-none bg-white focus:outline-none"
        />

        <button
          type="submit"
          className="bg-black text-primary px-4 rounded-r-md font-semibold cursor-pointer disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};
