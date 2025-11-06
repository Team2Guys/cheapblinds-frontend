import { Breadcrumb, LoginForms, Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrumb title="Login" />
      <div className="container mx-auto px-2 my-10 md:my-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-5">
            <h1 className="text-heading">Registered Customers</h1>
            <p>If you have an account, sign in with your email address.</p>
            <LoginForms />
          </div>
          <div className="space-y-5">
            <h2 className="text-heading">New Customers</h2>
            <p>
              Creating an account has many benefits: check out faster, keep more than one address,
              track orders and more.
            </p>
            <Link
              href="/register"
              className="bg-primary font-semibold px-5 py-2 inline-block rounded-md"
            >
              Create an Account
            </Link>
          </div>
        </div>
        <Testimonial reviews={TestimonialReview} showPaymentInfo />
      </div>
    </>
  );
};

export default page;
