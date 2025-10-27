
import Phone from "components/svg/phone";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ContactForm from "./contactform";

const ContactBanner = () => {
  return (
    <div className="container mx-auto mt-10 md:mt-16">
      <div className="flex flex-col sm:flex-row text-black bg-primary-light bg-no-repeat sm:gap-4 sm:bg-center bg-fill sm:bg-[url('/assets/images/phnperson.webp')] w-full px-5 pt-10 sm:pb-3">
        {/* left section */}
        <div className="flex flex-col w-full lg:w-[50%] xl:w-[60%] lg:p-10 mb-5">
          <p className="text-primary text-[51px] lg:text-[57px] font-rubik font-semibold leading-[0.7]">
            Ready{" "}
            <span className="font-medium text-[27px] text-black">
              to Decide? <br />
              Let&lsquo;s Set It Up{" "}
            </span>
            <br />
            <span className="ml-8 block mt-5"> Instantly!</span>
          </p>
          <Link
            href="tel:+971 50 597 4531"
            className="flex items-start gap-3 mt-10"
          >
            <p>
              <Phone className="h-6 w-6 mt-2" />
            </p>
            <div className="flex flex-col text-[20px] font-rubik font-medium">
              <p>Call NOW!</p>
              <p>+971 50 597 4531</p>
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50%] xl:w-[40%] lg:pl-15">
          <ContactForm variant="noLabel" />
        </div>
        <div className="flex justify-center items-center h-[200px] w-full sm:hidden mt-7">
          <Image
            className="bg-cover w-[300px]"
            alt="callperson"
            height={200}
            width={200}
            src="/assets/images/phnmbl.webp"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
