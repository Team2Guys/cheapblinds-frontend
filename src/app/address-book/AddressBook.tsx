"use client";

import React, { useEffect, useState, useCallback } from "react"; // Added useCallback
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

  const loadUser = useCallback(async () => {
    if (!user) return;
    try {
      const userResponse = await fetchUserById(user.id, GET_USER_FOR_ADDRESS_QUERY);

      if (userResponse?.addresses?.length) {
        userResponse.addresses = [...userResponse.addresses].sort(
          (a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime(),
        );
      }
      setUser(userResponse || null);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!user || !userList) return null;

  return (
    <div>
      <div className="container mx-auto px-2 flex flex-wrap md:flex-nowrap gap-4 my-10">
        <AccountSidebar />
        <div className="flex-1">
          {/* 2. Pass the loadUser function as onRefresh */}
          <AddressBook userId={user.id} userList={userList} onRefresh={loadUser} />
        </div>
      </div>
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default React.memo(AddressBookPage);
