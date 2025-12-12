"use client";

import { Input } from "@components/ui/Input";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";
import { Orders, Product } from "@/types/category";
import { useAuth } from "@context/UserContext";
import { CREATE_ORDER } from "@graphql";
import { useMutation } from "@apollo/client";
import { Toaster } from "@components/ui";
import { useIndexedDb } from "@lib/useIndexedDb";
import { useRouter } from "next/navigation";

export const SampleCheckout = ({ freeSamplesList }: { freeSamplesList: Product[] }) => {
  const { user } = useAuth();
  const [createOrder, { loading }] = useMutation(CREATE_ORDER);
  const { clearFreeSamples } = useIndexedDb();
  const router = useRouter();
  const TotalPrice = freeSamplesList.reduce((total, item) => total + Number(item.price || 0), 0);

  const cleanedItems = freeSamplesList.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    posterImageUrl: item.posterImageUrl,
    color: item.color,
    slug: item.slug,
    categoryUrl: item.categoryUrl,
    subcategoryUrl: item.subcategoryUrl || "",
  }));

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    address: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const initialValues: Orders = {
    userId: user?.id || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United Arab Emirates",
    state: "",
    city: "",
    address: "",
    totalAmount: TotalPrice,
    shippingCost: 0,
    notes: "",
    items: cleanedItems,
    paymentStatus: "FREE",
    orderStatus: "PENDING",
    lastEditedBy: user?.name || "",
  };
  const handleSubmit = async (values: Orders, { resetForm }: FormikHelpers<Orders>) => {
    try {
     const response = await createOrder({
        variables: {
          input: {
            ...values,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/graphql-response+json",
          },
        },
      });
      const orderId = response.data.createOrder.id;
      await clearFreeSamples();
      resetForm();
      router.push(`/thank-you?id=${orderId}`);
      Toaster("success", "Order placed successfully!");
    } catch (error) {
      console.error("Order error:", error);
      Toaster("error", "Failed to place order.");
    }
  };
  return (
    <div className="bg-primary-light p-2 rounded-md space-y-4">
      <h1 className="font-rubik font-medium text-xl mt-2 text-center">Shipping Address</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name*" name="firstName" />
              <Input label="Last Name*" name="lastName" />
            </div>
            <div className="space-y-1">
              <p>
                Country / Region<span className="text-red-500">*</span>
              </p>
              <p className="font-semibold">United Arab Emirates</p>
            </div>

            <Input label="Street Address*" name="address" />
            <Input label="Town / City*" name="city" />
            <Input label="State / County (optional)" name="state" />
            <Input label="Phone*" name="phone" type="tel" />
            <Input label="Email Address*" name="email" type="email" />

            <Input
              label="Order Notes (optional)"
              name="notes"
              as="textarea"
              rows={5}
              placeholder="Notes about your order"
            />

            <button
              type="submit"
              className="w-full bg-primary font-semibold py-2 px-4 rounded-md hover:bg-primary/90 cursor-pointer"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
