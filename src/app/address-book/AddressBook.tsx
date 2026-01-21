"use client";

import React, { useCallback, useEffect, useState } from "react"; // Added useCallback
import { useRouter } from "next/navigation";
import { Testimonial, AddressBook } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { useAuth } from "@context/UserContext";
import { addressProps, UserProps } from "@/types/category";
import { queryData } from "@config/fetch";
import { AccountSidebar } from "@components/accounts/AccountSidebar";
import { ADDRESS_BY_USER_ID, USER_BY_ID } from "@graphql";

const AddressBookPage = () => {
  const { user, isLoading } = useAuth();
  const [userList, setUser] = useState<UserProps | null>(null);
  const [addressList, setAddress] = useState<addressProps[] | null>(null);
  const router = useRouter();

  const loadUser = useCallback(async () => {
    if (!user) return;
    try {
      const addressResponse: addressProps[] | null = await queryData<addressProps[] | null>(
        ADDRESS_BY_USER_ID,
        "addressListByUserId",
        { userId: user.id },
      );

      const userResponse: UserProps | null = await queryData<UserProps | null>(
        USER_BY_ID,
        "userById",
        { id: user.id },
      );
      setAddress(addressResponse || null);
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
    const fetchUser = async () => {
      await loadUser();
    };
    fetchUser();
  }, [loadUser]);

  if (!user || !userList) return null;

  return (
    <div>
      <div className="container mx-auto px-2 flex flex-wrap md:flex-nowrap gap-4 my-10">
        <AccountSidebar />
        <div className="flex-1">
          <AddressBook
            userId={user.id}
            addressList={addressList}
            userList={userList}
            onRefresh={loadUser}
          />
        </div>
      </div>
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default React.memo(AddressBookPage);
