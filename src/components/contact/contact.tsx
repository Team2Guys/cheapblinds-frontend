import React from "react";
import Email from "../svg/email";
import Call from "../svg/call";
import Calender from "../svg/calender";
import GoogleMap from "../userComponent/map/map";
import ContactForm from "./contactform";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <h1 className="font-rubik font-semibold text-[24px] lg:text-[36px] flex justify-center items-center my-3 text-black">
        Need Help?
      </h1>
      <div className="container mx-auto text-black flex flex-col md:flex-row w-full  mb-10">
        {/* Contact */}

        <div className="bg-secondary p-2 mx-2 md:w-[50%]">
          <h2 className="font-rubik font-semibold text-[36px] leading-[1.2]">
            Let us know how to contact you
          </h2>

          <p className="font-open_Sans text-[16px] mt-2">
            Call or send us an email, and a member of our Customer Service team will be happy to
            help.
          </p>
          <p className="font-open_Sans text-[16px] mt-2">
            Call or send us an email, and a member of our Customer Service team will be happy to
            help.
          </p>

          <div className="space-y-4 mt-6">
            <Link href="mailto:help@cheapblinds.ae" className="flex items-start gap-3">
              <Email />
              <span>help@cheapblinds.ae</span>
            </Link>
          <div className="space-y-4 mt-6">
            <Link href="mailto:help@cheapblinds.ae" className="flex items-start gap-3">
              <Email />
              <span>help@cheapblinds.ae</span>
            </Link>

            <Link href="tel:+971 50 597 4531" className="flex items-start gap-3">
              <Call />
              <span>+971 50 597 4531</span>
            </Link>
            <Link href="tel:+971 50 597 4531" className="flex items-start gap-3">
              <Call />
              <span>+971 50 597 4531</span>
            </Link>

            <div className="flex items-start gap-3">
              <Calender />
              <span>Mon–Sat: 8:30am–9:00pm</span>
            </div>
            <div className="flex items-start gap-3">
              <Calender />
              <span>Mon–Sat: 8:30am–9:00pm</span>
            </div>

            <p>Sunday: 10:00am–6:00pm</p>
            <p>Sunday: 10:00am–6:00pm</p>

            <h3 className="font-rubik font-medium text-[20px]">Opening Hours</h3>
            <h3 className="font-rubik font-medium text-[20px]">Opening Hours</h3>

            <div className="flex items-start gap-3">
              <Calender />
              <span>Mon–Sat: 8:30am–9:00pm</span>
            </div>
          </div>
            <div className="flex items-start gap-3">
              <Calender />
              <span>Mon–Sat: 8:30am–9:00pm</span>
            </div>
          </div>

          <div className="mt-4">
            <GoogleMap />
          </div>
        </div>
        <div className="hidden md:block w-[3px] md:h-[800px] lg:h-[780px] xl:h-[730px] bg-gray-400"></div>
          <div className="mt-4">
            <GoogleMap />
          </div>
      </div>
        <div className="hidden md:block w-[3px] md:h-[800px] lg:h-[780px] xl:h-[730px] bg-gray-400"></div>

        <div className="p-2 w-full md:w-[50%]">
          <ContactForm />
        </div>

    </>
  );
};

export default Contact;
