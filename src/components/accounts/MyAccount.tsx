import React from "react";

export const MyAccount = () => {
  return (
    <div className="container mx-auto space-y-5">
      <h1 className="text-heading">My Account</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-medium font-rubik uppercase">DEFAULT ADDRESSES</h2>
        <hr className="border-b-2 border-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <p>Your Name</p>
            <p>youremail@gmail.com</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Newsletters</h3>
            <p>Edit your e-mail marketing consents</p>
            <button className="underline text-primary cursor-pointer">Edit</button>
          </div>
        </div>
      </div>

      {/* Address Book */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium font-rubik uppercase">Address Book</h2>
          <button className="text-primary cursor-pointer">Manage Addresses</button>
        </div>
        <hr className="border-b-2 border-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          <div className="space-y-2">
            <h3 className="font-semibold">Default Billing Address</h3>
            <p>You have not set a default billing address</p>
            <button className="underline text-primary cursor-pointer">Edit Address</button>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Default Shipping Address</h3>
            <p>You have not set a default shipping address</p>
            <button className="underline text-primary cursor-pointer">Edit Address</button>
          </div>
        </div>
      </div>
    </div>
  );
};
