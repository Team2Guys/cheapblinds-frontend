"use client";

import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import React from "react";
import { NewsletterProps } from "@/types/category";
import { UPDATE_NEWSLETTER_SUBSCRIBER } from "@graphql";
import { Toaster } from "@components/ui";

export const NewsletterSubscriptions = ({ newsletter }: { newsletter: NewsletterProps | null }) => {
  const [updateNewsletter] = useMutation(UPDATE_NEWSLETTER_SUBSCRIBER);

  if (!newsletter) return <p>No newsletter data found.</p>;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        isActive: newsletter?.isActive ?? false,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateNewsletter({
            variables: {
              id: newsletter.id,
              input: { isActive: values.isActive },
            },
          });

          Toaster("success", "Subscription updated successfully!");
        } catch {
          Toaster("error", "Failed to update newsletter.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-semibold">Newsletter Subscriptions</h2>

          {/* Checkbox Field */}
          <label className="flex items-center gap-2 cursor-pointer w-fit">
            <Field
              type="checkbox"
              name="isActive"
              checked={values.isActive}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue("isActive", e.target.checked)
              }
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <span>General Subscription</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-semibold p-2 bg-primary hover:bg-primary/90 text-white rounded-md disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
