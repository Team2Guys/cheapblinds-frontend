"use client";
import { Input } from "@components/ui/Input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
export const SampleCheckout = () => {
  return (
    <div className="bg-primary-light p-2 rounded-md space-y-4">
      <h1 className="font-rubik font-medium text-xl mt-2 text-center">Shipping Address</h1>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          country: "United Arab Emirates",
          street: "",
          city: "",
          state: "",
          phone: "",
          email: "",
          notes: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          country: Yup.string().required("Country is required"),
          street: Yup.string().required("Street address is required"),
          city: Yup.string().required("City is required"),
          phone: Yup.string().required("Phone is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
        })}
        onSubmit={(values) => console.log("Form Submitted:", values)}
      >
        {() => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name*" name="firstName" />
              <Input label="Last Name*" name="lastName" />
            </div>

            <div className="space-y-2">
              <p>
                Country / Region<span className="text-red-500">*</span>
              </p>
              <p className="font-semibold">United Arab Emirates</p>
            </div>

            <Input label="Street Address*" name="street" />
            <Input label="Town / City*" name="city" />
            <Input label="State / County (optional)" name="state" />
            <Input label="Phone*" name="phone" type="tel" />
            <Input label="Email Address*" name="email" type="email" />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="createAccount"
                name="createAccount"
                className="w-4 h-4 accent-primary cursor-pointer rounded"
              />
              <label htmlFor="createAccount" className="font-semibold cursor-pointer select-none">
                Ship to a different address?
              </label>
            </div>

            <Input
              label="Order Notes (optional)"
              name="notes"
              as="textarea"
              rows={5}
              placeholder="Notes about your order, e.g. special notes for delivery"
            />
            <button
              type="submit"
              className="w-full bg-primary font-semibold py-2 px-4 rounded-md hover:bg-primary/90 cursor-pointer"
            >
              Place Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
