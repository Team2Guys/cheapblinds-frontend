import { UserProps, addressProps } from "@/types/category";
import Link from "next/link";
import React from "react";

interface MyAccountProps {
  userList: UserProps | null;
}

export const MyAccount: React.FC<MyAccountProps> = ({ userList }) => {
  if (!userList) return null;
  const defaultBillingAddress: addressProps | undefined = userList.addresses?.find(
    (a) => a.id === userList.defaultBillingAddressId,
  );

  const defaultShippingAddress: addressProps | undefined = userList.addresses?.find(
    (a) => a.id === userList.defaultShippingAddressId,
  );

  return (
    <div className="container mx-auto space-y-5">
      <h1 className="text-heading">My Account</h1>

      {/* Contact Info */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium font-rubik uppercase">DEFAULT ADDRESSES</h2>
        <hr className="border-b-2 border-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <p>
              {userList.firstName} {userList.lastName}
            </p>
            <p>{userList.email}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Newsletters</h3>
            <p>Edit your e-mail marketing consents</p>
            <Link
              href="/newsletter-subscriptions"
              className="underline text-primary cursor-pointer"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium font-rubik uppercase">Address Book</h2>
          <Link href="/address-book" className="text-primary cursor-pointer">
            Manage Addresses
          </Link>
        </div>
        <hr className="border-b-2 border-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Default Billing Address</h3>
            {defaultBillingAddress ? (
              <>
                <p>
                  {defaultBillingAddress.firstName} {defaultBillingAddress.lastName}
                </p>
                <p>
                  {defaultBillingAddress.address}, {defaultBillingAddress.city},{" "}
                  {defaultBillingAddress.country}
                </p>
                {defaultBillingAddress.phone && <p>Phone: {defaultBillingAddress.phone}</p>}
                <p>Email: {defaultBillingAddress.email}</p>
              </>
            ) : (
              <p>You have not set a default billing address</p>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Default Shipping Address</h3>
            {defaultShippingAddress ? (
              <>
                <p>
                  {defaultShippingAddress.firstName} {defaultShippingAddress.lastName}
                </p>
                <p>
                  {defaultShippingAddress.address}, {defaultShippingAddress.city},{" "}
                  {defaultShippingAddress.country}
                </p>
                {defaultShippingAddress.phone && <p>Phone: {defaultShippingAddress.phone}</p>}
                <p>Email: {defaultShippingAddress.email}</p>
              </>
            ) : (
              <p>You have not set a default shipping address</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
