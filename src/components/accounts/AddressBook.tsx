"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { Modal, AddressForm, Toaster } from "@components";
import { addressProps, UserProps } from "@/types/category";
import { REMOVE_ADDRESS_BY_ID_MUTATION, UPDATE_USER_BY_ID_MUTATION } from "@graphql";

interface AddressBookProps {
  userId: string;
  userList: UserProps;
  setUserList?: (_user: UserProps) => void; // optional prop to update parent state
}

export const AddressBook: React.FC<AddressBookProps> = React.memo(
  ({ userId, userList, setUserList }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<addressProps | null>(null);

    const [removeAddressById] = useMutation(REMOVE_ADDRESS_BY_ID_MUTATION);
    const [updateUserById] = useMutation(UPDATE_USER_BY_ID_MUTATION);

    const { addresses } = userList;
    const [defaultBillingAddress, setDefaultBillingAddress] = useState<
      addressProps | null | undefined
    >(userList.defaultBillingAddress);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState<
      addressProps | null | undefined
    >(userList.defaultShippingAddress);

    // DELETE ADDRESS
    const handleDelete = (id: string) => async () => {
      try {
        const { data } = await removeAddressById({ variables: { id } });

        if (data?.removeAddressById?.id) {
          Toaster("success", "Address removed successfully!");
        }
      } catch (error) {
        console.error(error);
        Toaster("error", "Failed to delete address");
      }
    };

    const updateUserAddress = async (type: "BILLING" | "SHIPPING", addressId: string) => {
      try {
        const input =
          type === "BILLING"
            ? { defaultBillingAddressId: addressId }
            : { defaultShippingAddressId: addressId };

        const { data } = await updateUserById({
          variables: { id: userId, input },
        });

        if (data?.updateUserById?.id) {
          Toaster("success", `Default ${type.toLowerCase()} address updated!`);
          if (type === "BILLING") {
            const newBilling = addresses?.find((a) => a.id === addressId) ?? null;
            setDefaultBillingAddress(newBilling);
            if (setUserList) setUserList({ ...userList, defaultBillingAddress: newBilling });
          } else {
            const newShipping = addresses?.find((a) => a.id === addressId) ?? null;
            setDefaultShippingAddress(newShipping);
            if (setUserList) setUserList({ ...userList, defaultShippingAddress: newShipping });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <div className="container mx-auto space-y-5">
          <h2 className="text-heading">Address Book</h2>

          <div className="space-y-2">
            <h2 className="text-xl font-medium font-rubik uppercase">Account Information</h2>
            <hr className="border-b-2 border-secondary" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="space-y-2">
                <h3 className="font-semibold">Default Billing Address</h3>
                {defaultBillingAddress ? (
                  <div>
                    <p className="text-primary">
                      {defaultBillingAddress.firstName} {defaultBillingAddress.lastName}
                    </p>
                    <p className="text-sm">
                      {defaultBillingAddress.address}, {defaultBillingAddress.city},{" "}
                      {defaultBillingAddress.country}
                    </p>
                    {defaultBillingAddress.phone && (
                      <p className="text-sm">Phone: {defaultBillingAddress.phone}</p>
                    )}
                    <p className="text-sm">Email: {defaultBillingAddress.email}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    You have not set a default billing address.
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Default Shipping Address</h3>
                {defaultShippingAddress ? (
                  <div>
                    <p className="text-primary">
                      {defaultShippingAddress.firstName} {defaultShippingAddress.lastName}
                    </p>
                    <p className="text-sm">
                      {defaultShippingAddress.address}, {defaultShippingAddress.city},{" "}
                      {defaultShippingAddress.country}
                    </p>
                    {defaultShippingAddress.phone && (
                      <p className="text-sm">Phone: {defaultShippingAddress.phone}</p>
                    )}
                    <p className="text-sm">Email: {defaultShippingAddress.email}</p>
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
            <h2 className="text-xl font-medium font-rubik uppercase">Additional Address Entries</h2>
            <hr className="border-b-2 border-secondary" />

            {addresses && addresses.length === 0 ? (
              <p className="text-sm text-gray-500">You have no other address entries.</p>
            ) : (
              <div className="mt-3 max-h-96 overflow-y-auto space-y-2 pr-2">
                {addresses &&
                  addresses.map((item) => (
                    <div key={item.id} className="relative p-3 border rounded-lg bg-white">
                      <button
                        className="absolute top-2 right-2 text-red-500"
                        onClick={handleDelete(item.id!)}
                      >
                        <FaTrash />
                      </button>

                      <button
                        className="absolute top-2 right-10 text-primary"
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

                      {/* ACTION BUTTONS */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateUserAddress("BILLING", item.id!)}
                          className={`px-3 py-1 text-xs rounded border ${
                            defaultBillingAddress?.id === item.id
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          Billing Address
                        </button>

                        <button
                          onClick={() => updateUserAddress("SHIPPING", item.id!)}
                          className={`px-3 py-1 text-xs rounded border ${
                            defaultShippingAddress?.id === item.id
                              ? "bg-primary text-white border-primary"
                              : "border-gray-300"
                          }`}
                        >
                          Shipping Address
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* ADD NEW */}
            <button
              className="bg-primary text-white py-2 px-4 rounded mt-5"
              onClick={() => {
                setEditingAddress(null);
                setIsModalOpen(true);
              }}
            >
              Add New Address
            </button>
          </div>
        </div>

        {/* ================= MODAL ================= */}
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
            onAddressAdded={() => {
              // Refetch or optimistically update user addresses
            }}
          />
        </Modal>
      </>
    );
  },
);
