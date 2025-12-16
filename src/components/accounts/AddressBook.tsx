"use client";

import { Modal, AddressForm, Toaster } from "@components";
import { addressProps, UserProps } from "@/types/category";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useMutation } from "@apollo/client";

import { REMOVE_ADDRESS_BY_ID_MUTATION, UPDATE_USER_BY_ID_MUTATION } from "@graphql";

interface AddressBookProps {
  userId: string;
  addressList: addressProps[];
  userList: UserProps | null;
}

export const AddressBook: React.FC<AddressBookProps> = ({ userId, addressList, userList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<addressProps | null>(null);

  const [billingAddressId, setBillingAddressId] = useState<string | null>(null);
  const [shippingAddressId, setShippingAddressId] = useState<string | null>(null);

  const [addresses, setAddresses] = useState<addressProps[]>(addressList);

  const [removeAddressById] = useMutation(REMOVE_ADDRESS_BY_ID_MUTATION);
  const [updateUserById] = useMutation(UPDATE_USER_BY_ID_MUTATION);

  useEffect(() => {
    setAddresses(addressList);
  }, [addressList]);

  // Delete address
  const handleDelete = (id: string) => async () => {
    try {
      const { data } = await removeAddressById({ variables: { id } });
      if (data?.removeAddressById?.id) {
        Toaster("success", "Address removed successfully!");

        setAddresses((prev) => prev.filter((a) => a.id !== id));

        if (billingAddressId === id) setBillingAddressId(null);
        if (shippingAddressId === id) setShippingAddressId(null);
      }
    } catch (error) {
      console.error("Failed to remove address:", error);
      Toaster("error", "Failed to delete address. Please try again.");
    }
  };

  // UPDATE USER DEFAULT BILLING / SHIPPING
  const updateUserAddress = async (type: "BILLING" | "SHIPPING", addressId: string | null) => {
    try {
      const input =
        type === "BILLING"
          ? { defaultBillingAddressId: addressId }
          : { defaultShippingAddressId: addressId };

      const { data } = await updateUserById({
        variables: {
          id: userId,
          input,
        },
      });

      if (data?.updateUserById?.id) {
        Toaster("success", `Default ${type.toLowerCase()} address updated!`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (userList) {
      setBillingAddressId(userList.defaultBillingAddressId || null);
      setShippingAddressId(userList.defaultShippingAddressId || null);
    }
  }, [userList]);
  const defaultBillingAddress = addresses.find((a) => a.id === billingAddressId);
  const defaultShippingAddress = addresses.find((a) => a.id === shippingAddressId);

  return (
    <>
      <div className="container mx-auto space-y-5">
        <h2 className="text-heading">Address Book</h2>

        {/* ACCOUNT INFO */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium font-rubik uppercase">Account Information</h2>
          <hr className="border-b-2 border-secondary" />

          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Default Billing Address</h3>
              {defaultBillingAddress ? (
                <div>
                  <p className="text-primary">
                    {defaultBillingAddress?.firstName} {defaultBillingAddress?.lastName}
                  </p>
                  <p className="text-sm">
                    {defaultBillingAddress?.address}, {defaultBillingAddress?.city},{" "}
                    {defaultBillingAddress?.country}
                  </p>
                  {defaultBillingAddress?.phone && (
                    <p className="text-sm">Phone: {defaultBillingAddress?.phone}</p>
                  )}
                  <p className="text-sm">Email: {defaultBillingAddress?.email}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">You have not set a default billing address.</p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Default Shipping Address</h3>
              {defaultShippingAddress && defaultShippingAddress ? (
                <div>
                  <p className="text-primary">
                    {defaultShippingAddress?.firstName} {defaultShippingAddress?.lastName}
                  </p>
                  <p className="text-sm">
                    {defaultShippingAddress?.address}, {defaultShippingAddress?.city},{" "}
                    {defaultShippingAddress?.country}
                  </p>
                  {defaultShippingAddress?.phone && (
                    <p className="text-sm">Phone: {defaultShippingAddress?.phone}</p>
                  )}
                  <p className="text-sm">Email: {defaultShippingAddress?.email}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  You have not set a default shipping address.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-medium font-rubik uppercase">ADDITIONAL ADDRESS ENTRIES</h2>
          <hr className="border-b-2 border-secondary" />

          {addresses.length === 0 ? (
            <p className="text-sm text-gray-500">
              You have no other address entries in your address book
            </p>
          ) : (
            <div className="mt-3 max-h-96 overflow-y-auto space-y-2 pr-2">
              {addresses.map((item) => (
                <div
                  key={item.id}
                  className="relative p-2 border rounded-lg bg-white border-gray-300"
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={handleDelete(item.id as string)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="absolute top-2 right-10 text-primary hover:text-primary-dark cursor-pointer"
                    onClick={() => {
                      setEditingAddress(item);
                      setIsModalOpen(true);
                    }}
                  >
                    <FiEdit />
                  </button>
                  <div className="space-y-1">
                    <p className="font-bold text-primary">
                      {item.firstName} {item.lastName}
                    </p>
                    <p className="text-xs">
                      {item.address}, {item.city}, {item.country}
                    </p>
                    {item.phone && <p className="text-xs">Phone: {item.phone}</p>}
                    <p className="text-xs">Email: {item.email}</p>
                  </div>

                  {/* BILLING & SHIPPING BUTTONS */}
                  <div className="flex gap-2 mt-3">
                    {/* BILLING */}
                    <button
                      type="button"
                      onClick={() => {
                        const newId = billingAddressId === item.id ? null : item.id;
                        setBillingAddressId(newId as string);
                        updateUserAddress("BILLING", newId as string);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-medium border cursor-pointer ${
                        billingAddressId === item.id
                          ? "bg-primary text-white border-primary"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Billing Address
                    </button>

                    {/* SHIPPING */}
                    <button
                      type="button"
                      onClick={() => {
                        const newId = shippingAddressId === item.id ? null : item.id;
                        setShippingAddressId(newId as string);
                        updateUserAddress("SHIPPING", newId as string);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-medium border cursor-pointer ${
                        shippingAddressId === item.id
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Shipping Address
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD NEW ADDRESS */}
          <button
            className="bg-primary text-white font-semibold py-2 px-4 rounded-md mt-5 hover:bg-primary/90 cursor-pointer"
            onClick={() => {
              setEditingAddress(null);
              setIsModalOpen(true);
            }}
          >
            Add New Address
          </button>
        </div>
      </div>

      {/* MODAL FOR ADD/EDIT */}
      <Modal
        isOpen={isModalOpen}
        title={editingAddress ? "Edit Address" : "Add Address"}
        onClose={() => setIsModalOpen(false)}
      >
        <AddressForm
          userId={userId}
          editingAddress={editingAddress}
          closeModal={() => {
            setIsModalOpen(false);
            setEditingAddress(null);
          }}
          onAddressAdded={(newAddress) => {
            setAddresses((prev) => {
              if (editingAddress) {
                return prev.map((a) => (a.id === editingAddress.id ? newAddress : a));
              }
              return [...prev, newAddress];
            });
          }}
        />
      </Modal>
    </>
  );
};
