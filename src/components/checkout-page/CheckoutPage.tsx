"use client";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrderProducts, Input, Toaster } from "@components";
import { useAuth } from "@context/UserContext";
import { Orders, UserProps } from "@/types/category";
import { queryData } from "@config/fetch";
import { useIndexedDb } from "@lib/useIndexedDb";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER_MUTATION, USER_BY_ID } from "@graphql";
import { CheckoutValidationSchema } from "@data/Validations";

export const CheckoutPage = React.memo(() => {
  const { user, isLoading } = useAuth();
  const { cart, clearCart } = useIndexedDb();
  const router = useRouter();
  const [userList, setUser] = useState<UserProps | null>(null);
  const [createOrder, { loading }] = useMutation(CREATE_ORDER_MUTATION);

  const termsRef = useRef<HTMLInputElement>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      try {
        const userResponse: UserProps | null = await queryData(USER_BY_ID, "userById", {
          id: user?.id || "",
        });
        setUser(userResponse || null);
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };
    loadData();
  }, [user]);

  const totalPrice = cart.reduce((total, item) => total + (item.finalPrice || 0), 0);
  const hasDifferentAddress =
    userList?.defaultBillingAddressId !== userList?.defaultShippingAddressId &&
    !!userList?.defaultShippingAddress;

  const initialValues: Orders = {
    userId: user?.id || "",
    billingAddress: {
      firstName: userList?.defaultBillingAddress?.firstName || userList?.firstName || "",
      lastName: userList?.defaultBillingAddress?.lastName || userList?.lastName || "",
      email: userList?.defaultBillingAddress?.email || userList?.email || "",
      phone: userList?.defaultBillingAddress?.phone || "",
      address: userList?.defaultBillingAddress?.address || "",
      city: userList?.defaultBillingAddress?.city || "",
      state: userList?.defaultBillingAddress?.state || "",
      country: "United Arab Emirates",
    },
    shippingAddress: {
      firstName: userList?.defaultShippingAddress?.firstName || "",
      lastName: userList?.defaultShippingAddress?.lastName || "",
      email: userList?.defaultShippingAddress?.email || "",
      phone: userList?.defaultShippingAddress?.phone || "",
      address: userList?.defaultShippingAddress?.address || "",
      city: userList?.defaultShippingAddress?.city || "",
      state: userList?.defaultShippingAddress?.state || "",
      country: "United Arab Emirates",
    },
    shipToDifferent: hasDifferentAddress,
    notes: "",
    totalAmount: totalPrice,
    shippingCost: 0,
    paymentStatus: "PENDING",
    orderStatus: "PENDING",
    orderItems: [],
  };

  const handleSubmit = async (
    values: Orders,
    { setSubmitting, resetForm }: FormikHelpers<Orders>,
  ) => {
    setSubmitAttempted(true);

    if (!termsRef.current?.checked) {
      setSubmitting(false);
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        blindTypeId: item.blindTypeId,
        fabricId: item.fabricId,
        sku: item.sku,
        name: item.name,
        newPath: item.newPath,
        posterImageUrl: item.posterImageUrl,
        quantity: item.quantity,
        options: item.options,
        isMotorized: item.isMotorized,
        finalPrice: item.finalPrice,
        price: item.price,
        motorPrice: item.motorPrice,
        subPrice: item.subPrice,
        recessType: item.recessType,
        color: item.color,
        drop: item.drop,
        unit: item.unit,
        width: item.width,
      }));

      const { shipToDifferent, ...rest } = values;
      const input = {
        ...rest,
        shippingAddress: shipToDifferent ? values.shippingAddress : values.billingAddress,
        billingAddress: values.billingAddress,
        orderItems,
        lastEditedBy: user?.name || "Customer",
      };

      const response = await createOrder({
        variables: { input },
      });

      if (response.data?.createOrder) {
        Toaster("success", "Order placed successfully!");
        await clearCart();
        resetForm();
        router.push(`/thank-you?id=${response.data.createOrder.id}`);
      }
    } catch (error) {
      console.error("Order Creation Error:", error);
      Toaster("error", "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CheckoutValidationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="container mx-auto px-2 grid grid-cols-12 gap-4 my-10">
          <div className="col-span-12">
            <Link className="font-rubik underline text-primary" href="/address-book/">
              Change Address
            </Link>
          </div>
          {/* Billing Details */}
          <div className="col-span-12 md:col-span-6 lg:col-span-8 space-y-4">
            <h1 className="font-rubik font-medium text-xl mb-4">Billing Details</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name*" name="billingAddress.firstName" />
              <Input label="Last Name*" name="billingAddress.lastName" />
            </div>

            <div className="space-y-1">
              <p>
                Country / Region<span className="text-red-500">*</span>
              </p>
              <p className="font-semibold">United Arab Emirates</p>
            </div>

            <Input label="Street Address*" name="billingAddress.address" />
            <Input label="Town / City*" name="billingAddress.city" />
            <Input label="State / County*" name="billingAddress.state" />
            <Input label="Phone*" name="billingAddress.phone" type="tel" />
            <Input label="Email Address*" name="billingAddress.email" type="email" />

            <div className="flex items-center gap-2 pt-4 border-t">
              <Field
                type="checkbox"
                id="shipToDifferent"
                name="shipToDifferent"
                className="w-4 h-4 accent-primary cursor-pointer rounded"
              />
              <label htmlFor="shipToDifferent" className="font-semibold cursor-pointer select-none">
                Ship to a different address?
              </label>
            </div>

            {values.shipToDifferent && (
              <div className="space-y-4 pt-4 border-l-4 border-primary/20 pl-4">
                <h1 className="font-rubik font-medium text-xl mb-4">Shipping Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name*" name="shippingAddress.firstName" />
                  <Input label="Last Name*" name="shippingAddress.lastName" />
                </div>
                <Input label="Street Address*" name="shippingAddress.address" />
                <Input label="Town / City*" name="shippingAddress.city" />
                <Input label="State / County*" name="shippingAddress.state" />
                <Input label="Phone*" name="shippingAddress.phone" type="tel" />
                <Input label="Email Address*" name="shippingAddress.email" type="email" />
              </div>
            )}

            <Input
              label="Order Notes (optional)"
              name="notes"
              as="textarea"
              rows={5}
              placeholder="Notes about your order, e.g. special notes for delivery"
            />
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4">
            <h1 className="font-rubik font-medium text-xl mb-4">Your Order</h1>
            <OrderProducts products={cart} />
            <div className="bg-primary-light">
              <div className="border space-y-3">
                <div className="flex justify-between items-center font-semibold p-2 border-b border-secondary">
                  <p>Subtotal</p>
                  <p>
                    <span className="font-currency text-xl lg:text-xl font-normal"></span>
                    {totalPrice.toFixed(2)}
                  </p>
                </div>
                <div className="p-2 space-y-2">
                  <p>Shipping</p>
                  <ul className="list-disc ml-5">
                    <li className="font-semibold">Free Shipping</li>
                  </ul>
                </div>
                <div className="flex justify-between items-center font-medium text-xl p-2 border">
                  <p>Total</p>
                  <p>
                    <span className="font-currency text-xl lg:text-2xl font-normal"></span>
                    {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  ref={termsRef}
                  className="w-4 h-4 accent-primary cursor-pointer rounded"
                />
                <label htmlFor="terms" className="font-semibold cursor-pointer select-none text-sm">
                  I have read and agree to the website{" "}
                  <Link href="/terms-and-conditions" className="underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
              {submitAttempted && !termsRef.current?.checked && (
                <span className="text-red-500 text-xs">
                  You must accept the terms and conditions
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-primary rounded-lg py-3 font-semibold flex justify-center items-center gap-2 cursor-pointer hover:bg-primary/90 transition-colors disabled:bg-gray-400"
            >
              <FaLock size={20} /> {loading ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
