"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import OrderProducts from "./OrderProduct";
import { OrderData } from "@/data/bin";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/textArea";

const CheckoutPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "United Arab Emirates",
      street: "",
      city: "",
      state: "",
      phone: "",
      email: "",
      notes: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      country: Yup.string().required("Country is required"),
      street: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <div className=" container mx-auto px-2 grid grid-cols-12 gap-4 my-10">
      {/* Billing Details */}
      <div className="col-span-12 md:col-span-6 lg:col-span-8">
        <h1 className="font-rubik font-medium text-xl mb-4">Billing Details</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name*"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
            />

            <Input
              label="Last Name*"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
            />
          </div>

          <div className="space-y-2">
            <p>
              Country / Region<span className="text-red-500">*</span>
            </p>
            <p className="font-semibold">United Arab Emirates</p>
          </div>

          <Input
            label="Street Address*"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.street}
            touched={formik.touched.street}
          />

          <Input
            label="Town / City*"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.city}
            touched={formik.touched.city}
          />

          <Input
            label="State / County (optional)"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            label="Phone*"
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.phone}
            touched={formik.touched.phone}
          />

          <Input
            label="Email Address*"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="createAccount"
              name="createAccount"
              className="w-4 h-4 accent-primary cursor-pointer rounded "
            />
            <label htmlFor="createAccount" className="font-semibold cursor-pointer select-none">
              Ship to a different address?
            </label>
          </div>
          <TextArea
            label="Order Notes (optional)"
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Notes about your order, e.g. special notes for delivery"
          />
        </form>
      </div>
      <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4">
        <h1 className="font-rubik font-medium text-xl mb-4">Your Order</h1>
        <OrderProducts products={OrderData} />
        <div className="bg-primary-light">
          <div className="border space-y-3">
            <div className="flex justify-between items-center font-semibold p-2 border-b border-secondary">
              <p>Subtotal</p>
              <p><span className="font-currency text-xl font-normal"></span>1,915</p>
            </div>
            <div className="p-2 space-y-2">
              <p>Shipping</p>
              <ul className="list-disc ml-5">
                <li className="font-semibold">Cost</li>
              </ul>
            </div>
            <div className="flex justify-between items-center font-medium text-xl p-2 border">
              <p>Total</p>
              <p><span className="font-currency text-2xl font-normal"></span>1,915</p>
            </div>
          </div>
        </div>
        <p>
          Your personal data will be used to process your order, support your experience throughout
          this website, and for other purposes described in our privacy policy.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="w-4 h-4 accent-primary cursor-pointer rounded "
          />
          <label htmlFor="terms" className="font-semibold cursor-pointer select-none">
            I have read and agree to the website{" "}
            <Link href="/terms-and-conditions" className="underline">
              terms and conditions
            </Link>
            <span className="text-red-500">*</span>
          </label>
        </div>
        <button className="w-full bg-primary rounded-lg py-3 font-semibold flex justify-center items-center gap-2">
          <FaLock size={20} /> PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
