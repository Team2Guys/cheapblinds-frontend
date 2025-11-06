import React from "react";

export const AddressBook = () => {
  return (
    <div className="container mx-auto space-y-5">
      <h2 className="text-heading">Address Book</h2>
      <div className="space-y-2">
        <h2 className="text-xl font-medium font-rubik uppercase">Account Information</h2>
        <hr className="border-b-2 border-secondary" />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
          <div className="space-y-2">
            <h3 className="font-semibold">Default Billing Address</h3>
            <p>You have not set a diefault billing address</p>
            <button className="underline text-primary cursor-pointer">Edit Address</button>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Default Shipping Address</h3>
            <p>You have not set a default shipping address</p>
            <button className="underline text-primary cursor-pointer">Edit Address</button>
          </div>
        </div>
      </div>

      {/* Address Book */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium font-rubik uppercase">ADDITIONAL ADDRESS ENTRIES</h2>

        <hr className="border-b-2 border-secondary" />
        <p>You have no other address entries in your address book</p>
        <button className="bg-primary hover:bg-primary/90 font-semibold py-2 px-4 rounded-md mt-5">
          Add New Address
        </button>
      </div>
    </div>
  );
};
