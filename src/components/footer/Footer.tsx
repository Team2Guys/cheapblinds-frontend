import Image from "next/image";
import Link from "next/link";
import React from "react";
import SocialLink from "@components/Layout/Header/social";
import { footerSections } from "@data/footer";
import { Newsletter } from "./Newsletter";

const Footer = () => {
  return (
    <footer className="bg-primary text-black mt-10">
      <div className="container mx-auto px-2 pt-10 pb-6 relative">
        <Image
          unoptimized
          src="/assets/images/footer/footer-girl.png"
          alt="call support"
          width={500}
          height={500}
          className="opacity-80 absolute top-16 sm:top-0 left-0 w-full h-[250px] sm:w-2/5 sm:h-[360px] lg:h-full"
        />
        <div className="flex flex-col sm:flex-row gap-6 2xl:gap-10 items-start">
          <div className="w-full sm:w-1/3 flex flex-col items-start justify-between relative h-[360px]">
            <div className="flex items-center space-x-2 font-medium font-rubik text-lg border-b-2 border-black pb-1">
              <p>Order online ANYTIME, or give us a call.</p>
            </div>

            <div className="mt-4 space-y-3 text-sm z-0">
              <div className="flex items-start space-x-2">
                <Image
                  unoptimized
                  src="/assets/icons/calendar.png"
                  alt="phone"
                  width={44}
                  height={44}
                />
                <div className="leading-7">
                  <p>Mon-Sat: 8:30am-9:00pm</p>
                  <p>Sunday: 10:00am-6:00pm</p>
                </div>
              </div>

              <Link
                href="tel:+971505974531"
                className="flex items-center space-x-2 font-medium font-rubik text-xl"
              >
                <Image
                  unoptimized
                  src="/assets/icons/phone.png"
                  alt="phone"
                  width={24}
                  height={24}
                />
                <span>+971 50 597 4531</span>
              </Link>

              <div className="flex items-start space-x-2">
                <Image
                  unoptimized
                  src="/assets/icons/location.png"
                  alt="location"
                  width={20}
                  height={20}
                  className="mt-2 w-5"
                />
                <p className="w-[190px] leading-7">
                  Unit 43 22nd St – Al Quoz Industrial Area 4 – Dubai UAE
                </p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-2/3 h-full grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-x-10 lg:gap-y-12 items-start z-0">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold">{section.title}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:underline z-0">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:col-span-3 gap-6 lg:gap-1">
              <div className="lg:mt-10 flex flex-wrap flex-col gap-2">
                <p>Choose Your Payment Method</p>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex justify-center items-center rounded-md bg-white w-12 xs:w-14 h-8">
                    <Image
                      unoptimized
                      src="/assets/icons/visa.png"
                      alt="Visa"
                      width={32}
                      height={11}
                    />
                  </div>
                  <div className="flex justify-center items-center rounded-md bg-white w-12 xs:w-14 h-8">
                    <Image
                      unoptimized
                      src="/assets/icons/applePay.png"
                      alt="Apple Pay"
                      width={26}
                      height={12}
                    />
                  </div>
                  <div className="flex justify-center items-center rounded-md bg-white w-12 xs:w-14 h-8">
                    <Image
                      unoptimized
                      src="/assets/icons/tabby.png"
                      alt="Tabby"
                      width={37}
                      height={15}
                    />
                  </div>
                  <div className="flex justify-center items-center rounded-md bg-white w-12 xs:w-14 h-8">
                    <Image
                      unoptimized
                      src="/assets/icons/mastercard.png"
                      alt="Mastercard"
                      width={26}
                      height={16}
                    />
                  </div>
                  <div className="flex justify-center items-center rounded-md bg-white w-12 xs:w-14 h-8">
                    <Image
                      unoptimized
                      src="/assets/icons/gPay.png"
                      alt="GPay"
                      width={29}
                      height={12}
                    />
                  </div>
                  <div className="flex justify-center items-center rounded-md bg-white w-12 xs:w-14 h-8">
                    <Image
                      unoptimized
                      src="/assets/icons/tamara.png"
                      alt="Tamara"
                      width={36}
                      height={13}
                    />
                  </div>
                </div>
              </div>
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white text-sm">
        <div className="container mx-auto grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-0 px-2 py-4 space-y-3 lg:space-y-0">
          <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-center xl:justify-start">
            <Link href="/login">Sign In</Link>
            <Link href="/forgot-password">Forgot Password</Link>
            <Link href="/my-orders">Your Orders</Link>
            <Link href="/order-tracking">Order Tracking</Link>
          </div>

          <p className="text-center hidden md:block">
            © Cheap blinds {new Date().getFullYear()} All rights reserved
          </p>

          <div className="flex justify-center xl:justify-end items-center space-x-3">
            <p>Follow Us</p>
            <SocialLink />
          </div>
          <p className="text-center block md:hidden">
            © Cheap blinds {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
