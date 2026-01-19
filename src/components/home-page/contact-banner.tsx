import Phone from "@components/svg/phone";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactForm from "./contact-form";

export const ContactBanner = React.memo(() => {
  return (
    <div className="container mx-auto mt-10 md:mt-16">
      <div className="flex flex-col sm:flex-row justify-between text-black bg-primary-light bg-no-repeat sm:gap-4 sm:bg-bottom bg-fill sm:bg-[url('/assets/images/phonePerson.webp')] w-full px-5 md:py-20 pt-3">
        {/* left section */}
        <div className="flex flex-col w-full sm:w-[50%] lg:w-[78%] lg:p-10 mb-5">
          <p className="text-primary text-[51px] lg:text-[57px] font-rubik font-semibold leading-[0.7]">
            Ready <span className="font-medium text-[27px] text-black">to decide?</span>
            <br />
            <span className="font-medium text-[27px] text-black">Need some</span>{" "}
            <sub className="text-[51px] lg:text-[57px]">Help?</sub>
            <br />
            <span className="font-medium text-[27px] text-black">Let&apos;s set it up</span>
            <br/>
            <sub className="text-[51px] lg:text-[60px] ml-20">instantly</sub>
          </p>
          <Link href="tel:+971 50 597 4531" className="flex items-start gap-3 mt-10">
            <p>
              <Phone className="h-6 w-6 mt-2" />
            </p>
            <div className="flex flex-col text-[20px] font-rubik font-medium">
              <p>Call NOW!</p>
              <p>+971 50 597 4531</p>
            </div>
          </Link>
        </div>
        <div className="w-full sm:w-[50%] lg:w-[36%] lg:pl-15">
          <ContactForm />
        </div>
        <div className="flex justify-center items-center h-[200px] w-full sm:hidden mt-7">
          <Image
            unoptimized
            className="bg-cover w-[300px]"
            alt="callPerson"
            height={200}
            width={200}
            src="/assets/images/phoneNumber.webp"
          />
        </div>
      </div>
    </div>
  );
});
