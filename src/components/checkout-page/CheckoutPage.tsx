"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { OrderProducts, Input } from "@components";
import { useAuth } from "@context/UserContext";
import { UserProps } from "@/types/category";
import { fetchUserById } from "@config/fetch";
import { useIndexedDb } from "@lib/useIndexedDb";

export const CheckoutPage = React.memo(() => {
  const { user } = useAuth();
  const { cart } = useIndexedDb();
  const [userList, setUser] = useState<UserProps | null>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const cleanedItems = cart.map((item) => ({
    productId: item.id,
    fabricId: item.fabricId,
    blindTypeId: item.blindTypeId,
    sku: item.sku,
    name: item.name,
    posterImageUrl: item.posterImageUrl,
    productUrl: item.productUrl,
    price: item.price,
    finalPrice: item.finalPrice,
    quantity: item.quantity,
    unit: item.unit,
    width: item.width,
    drop: item.drop,
    isMotorized: item.isMotorized,
    motorPrice: item.motorPrice,
    subPrice: item.subPrice,
    options: item.options,
    recessType: item.recessType,
  }));

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const userResponse = await fetchUserById(user.id);
        setUser(userResponse || null);
      } catch (error) {
        console.error("Failed to fetch addresses or user data:", error);
      }
    };

    loadData();
  }, [user]);

  console.log(userList, "userList");

  const totalPrice = cart.reduce((total, item) => total + (item.finalPrice || 0), 0);

  return (
    <Formik
      initialValues={{
        userId: user?.id || "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "United Arab Emirates",
        totalAmount: totalPrice,
        shippingCost: 0,
        notes: "",
        orderItems: cleanedItems,
        paymentStatus: "FREE",
        orderStatus: "PENDING",
        lastEditedBy: user?.name || "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        address: Yup.string().required("Street address is required"),
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        state: Yup.string().required("State is required"),
      })}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        setSubmitAttempted(true);
        if (!termsRef.current?.checked) {
          setSubmitting(false);
          return;
        }
        console.log("Form Submitted:", values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="container mx-auto px-2 grid grid-cols-12 gap-4 my-10">
          {/* Billing Details */}
          <div className="col-span-12 md:col-span-6 lg:col-span-8 space-y-2">
            <h1 className="font-rubik font-medium text-xl mb-4">Billing Details</h1>

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
              <Field
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
          </div>

          {/* Order Summary */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4">
            <h1 className="font-rubik font-medium text-xl mb-4">Your Order</h1>
            <OrderProducts products={cart} />
            <div className="bg-primary-light">
              <div className="border space-y-3">
                <div className="flex justify-between items-center font-semibold p-2 border-b border-secondary">
                  <p>Subtotal</p>
                  <p>
                    <span className="font-currency text-xl font-normal"></span>
                    {totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="p-2 space-y-2">
                  <p>Shipping</p>
                  <ul className="list-disc ml-5">
                    <li className="font-semibold">Cost</li>
                  </ul>
                </div>
                <div className="flex justify-between items-center font-medium text-xl p-2 border">
                  <p>Total</p>
                  <p>
                    <span className="font-currency text-2xl font-normal"></span>
                    {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <p>
              Your personal data will be used to process your order, support your experience
              throughout this website, and for other purposes described in our privacy policy.
            </p>

            {/* Terms Checkbox inside Formik */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  ref={termsRef} // ✅ ref for validation
                  className="w-4 h-4 accent-primary cursor-pointer rounded"
                />
                <label htmlFor="terms" className="font-semibold cursor-pointer select-none">
                  I have read and agree to the website{" "}
                  <Link href="/terms-and-conditions" className="underline">
                    terms and conditions
                  </Link>
                  <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Show error only if user tried to submit without checking */}
              {submitAttempted && !termsRef.current?.checked && (
                <span className="text-red-500 text-sm mt-1">
                  You must accept the terms and conditions
                </span>
              )}
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary rounded-lg py-3 font-semibold flex justify-center items-center gap-2 cursor-pointer"
            >
              <FaLock size={20} /> PLACE ORDER
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
