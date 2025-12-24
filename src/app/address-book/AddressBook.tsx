"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Testimonial, AddressBook } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { useAuth } from "@context/UserContext";
import { UserProps } from "@/types/category";
import { fetchUserById } from "@config/fetch";
import { AccountSidebar } from "@components/accounts/AccountSidebar";
import { GET_USER_FOR_ADDRESS_QUERY } from "@graphql";

const AddressBookPage = () => {
  const { user, isLoading } = useAuth();
  const [userList, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    const loadUser = async () => {
      try {
        const userResponse = await fetchUserById(user.id, GET_USER_FOR_ADDRESS_QUERY);
        setUser(userResponse || null);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUser();
  }, [user]);

  if (!user || !userList) return null;

  return (
    <div>
      <div className="container mx-auto px-2 flex flex-wrap md:flex-nowrap gap-4 my-10">
        <AccountSidebar />
        <div className="flex-1">
          <AddressBook userId={user.id} userList={userList} />
        </div>
      </div>

      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default AddressBookPage;
