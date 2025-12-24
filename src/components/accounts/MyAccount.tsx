import { UserProps } from '@/types/category';
import Link from 'next/link';
import React from 'react';

interface MyAccountProps {
  userList: UserProps | null;
}

const AddressDisplay: React.FC<{
  title: string;
  address?:
    | UserProps['defaultBillingAddress']
    | UserProps['defaultShippingAddress'];
}> = ({ title, address }) => (
  <div className="space-y-2">
    <h3 className="font-semibold">{title}</h3>
    {address ? (
      <>
        <p>
          {address.firstName} {address.lastName}
        </p>
        <p>
          {address.address}, {address.city}, {address.country}
        </p>
        {address.phone && <p>Phone: {address.phone}</p>}
        <p>Email: {address.email}</p>
      </>
    ) : (
      <p>You have not set a {title.toLowerCase()}</p>
    )}
  </div>
);

export const MyAccount: React.FC<MyAccountProps> = ({ userList }) => {
  if (!userList) return null;

  const { defaultBillingAddress, defaultShippingAddress } = userList;

  return (
    <div className="container mx-auto space-y-5">
      <h1 className="text-heading">My Account</h1>

      {/* Contact Info */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium font-alethia uppercase">
          DEFAULT ADDRESSES
        </h2>
        <hr className="border-b-2 border-black" />
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
              className="underline text-black cursor-pointer"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium font-alethia uppercase">
            Address Book
          </h2>
          <Link href="/address-book" className="cursor-pointer">
            Manage Addresses
          </Link>
        </div>
        <hr className="border-b-2 border-black" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
          <AddressDisplay
            title="Default Billing Address"
            address={defaultBillingAddress}
          />
          <AddressDisplay
            title="Default Shipping Address"
            address={defaultShippingAddress}
          />
        </div>
      </div>
    </div>
  );
};