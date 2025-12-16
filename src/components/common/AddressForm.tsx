"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toaster } from "@components";
import { useMutation } from "@apollo/client";
import { CREATE_ADDRESS_MUTATION, UPDATE_ADDRESS_BY_ID_MUTATION } from "@graphql";
import { addressProps } from "@/types/category";
import { emirateCityMap, emirates } from "@/data/checkout";

const AddressSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

interface AddressFormProps {
  userId: string;
  closeModal: () => void;
  onAddressAdded: (_address: addressProps) => void;
  editingAddress?: addressProps | null;
}
export const AddressForm = ({
  userId,
  closeModal,
  onAddressAdded,
  editingAddress = null,
}: AddressFormProps) => {
  const [createAddress] = useMutation(CREATE_ADDRESS_MUTATION);
  const [updateAddressById] = useMutation(UPDATE_ADDRESS_BY_ID_MUTATION);
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const initialValues = {
    userId,
    firstName: editingAddress?.firstName || "",
    lastName: editingAddress?.lastName || "",
    email: editingAddress?.email || "",
    phone: editingAddress?.phone || "",
    country: editingAddress?.country || "United Arab Emirates",
    state: editingAddress?.state || "",
    city: editingAddress?.city || "",
    address: editingAddress?.address || "",
    addressType: editingAddress?.addressType || "HOME",
  };
  useEffect(() => {
    if (editingAddress?.state) {
      const cities = emirateCityMap[editingAddress.state] || [];
      const sortedCities = [...cities].sort((a, b) => a.label.localeCompare(b.label));
      sortedCities.push({ value: "Other", label: "Other" });
      setCityOptions(sortedCities);
      setShowOtherInput(
        !!(editingAddress.city && !cities.find((c) => c.value === editingAddress.city)),
      );
    }
  }, [editingAddress]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={AddressSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          let newAddress: addressProps | null = null;

          if (editingAddress?.id) {
            const { data } = await updateAddressById({
              variables: { id: editingAddress.id, input: values },
            });
            newAddress = data?.updateAddressById;
            Toaster("success", "Address updated successfully!");
          } else {
            const { data } = await createAddress({
              variables: { input: values },
            });
            newAddress = data?.createAddress;
            Toaster("success", "Address added successfully!");
          }

          if (newAddress) {
            onAddressAdded(newAddress);
            resetForm();
            closeModal();
          }
        } catch (error) {
          console.error("Failed to save address:", error);
          Toaster("error", "Failed to save address. Please try again.");
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-2 text-base font-medium">
                Address Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                {["HOME", "OFFICE", "OTHER"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFieldValue("addressType", type)}
                    className={`px-4 py-2 rounded-md border cursor-pointer ${
                      values.addressType === type
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">First Name *</label>
              <Field name="firstName" type="text" className="w-full border rounded-md p-2" />
              <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">Last Name *</label>
              <Field name="lastName" type="text" className="w-full border rounded-md p-2" />
              <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">Email *</label>
              <Field name="email" type="email" className="w-full border rounded-md p-2" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">Phone *</label>
              <Field name="phone" type="text" className="w-full border rounded-md p-2" />
              <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-base font-medium">Country *</label>
              <div className="w-full border rounded-md p-2 bg-gray-100">United Arab Emirates</div>
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">Emirates *</label>
              <Field
                as="select"
                name="state"
                className="w-full border rounded-md p-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selected = e.target.value;
                  setFieldValue("state", selected);
                  setFieldValue("city", "");

                  const cities = emirateCityMap[selected] || [];
                  const sortedCities = [...cities].sort((a, b) => a.label.localeCompare(b.label));
                  sortedCities.push({ value: "Other", label: "Other" });
                  setCityOptions(sortedCities);

                  setShowOtherInput(false);
                }}
              >
                <option value="">Select Emirates</option>
                {emirates.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="state" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">Area *</label>
              <Field
                as="select"
                name="city"
                className="w-full border rounded-md p-2"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selected = e.target.value;
                  setFieldValue("city", selected);
                  setShowOtherInput(selected === "Other");
                  if (selected !== "Other") setFieldValue("city", selected);
                  else setFieldValue("city", "");
                }}
              >
                <option value="">Select Area</option>
                {cityOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Field>

              {showOtherInput && (
                <Field
                  name="city"
                  type="text"
                  placeholder="Enter your area"
                  className="w-full border rounded-md p-2 mt-2"
                />
              )}

              <ErrorMessage name="city" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-base font-medium">Address *</label>
              <Field
                name="address"
                as="textarea"
                rows={3}
                placeholder="Enter your full address"
                className="w-full border rounded-md p-2"
              />
              <ErrorMessage name="address" component="p" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 cursor-pointer"
          >
            {editingAddress ? "Update Address" : "Save Address"}
          </button>
        </Form>
      )}
    </Formik>
  );
};
