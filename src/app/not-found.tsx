"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center sm:h-[90vh]">
      <div className="flex flex-col items-center gap-4 relative">
        <video
          className="w-full h-full sm:w-96 sm:h-96 object-contain"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/404.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className="text-2xl xsm:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black -mt-10">
          There&apos;s <span className="uppercase">Nothing</span> here ...
        </h2>
        <p className="text-center px-2 xsm:px-0 text-[10px] xsm:text-xs sm:text-base md:text-lg lg:text-xl">
          ...maybe the page you are looking for is not found or never existed.
        </p>
        <div className="flex items-center gap-4 justify-center">
          <Link
            className="w-35 sm:w-40 h-10 sm:h-12 text-sm max-md:px-4 sm:text-base flex justify-center items-center rounded-full bg-primary text-white hover:bg-white border border-primary hover:text-primary transition"
            href="/"
          >
            Back to Home
          </Link>
          <Link
            className="w-35 sm:w-40 h-10 sm:h-12 text-sm max-md:px-4 flex justify-center items-center rounded-full bg-transparent text-primary hover:bg-primary border border-primary hover:border-primary hover:text-white transition"
            href="/contact-us"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
