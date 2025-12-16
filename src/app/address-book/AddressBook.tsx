"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Testimonial, AddressBook } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { useAuth } from "@context/UserContext";
import { addressProps, UserProps } from "@/types/category";
import { fetchAddressListByUser, fetchUserById } from "@config/fetch";
import { AccountSidebar } from "@components/accounts/AccountSidebar";
import { GET_USER_FOR_ADDRESS_QUERY } from "@graphql";

const AddressBookPage = () => {
  const { user, isLoading } = useAuth();
  const [addressList, setAddresses] = useState<addressProps[]>([]);
  const [userList, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

 useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const [addressesResponse, userResponse] = await Promise.all([
          fetchAddressListByUser(user.id),
          fetchUserById(user.id, GET_USER_FOR_ADDRESS_QUERY),
        ]);

        setAddresses(addressesResponse || []);
        setUser(userResponse || null);
      } catch (error) {
        console.error("Failed to fetch addresses or user data:", error);
      }
    };

    loadData();
  }, [user]);

  if (!user) return null;
  
  return (
    <div>
      <div className="container mx-auto px-2 flex flex-wrap md:flex-nowrap gap-4 my-10">
        <AccountSidebar />
        <div className="flex-1">
          <AddressBook
            userId={user.id}
            addressList={addressList}   
            userList={userList}  
          />
        </div>
      </div>

      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default AddressBookPage;
