import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OrderSectionProps } from "types/common";

const OrderSection = ({
  reverse,
  image1,
  image2,
  btnText,
  btnLink,
  samplesection,
  className,
}: OrderSectionProps) => {
  return (
    <div
      className={`container mx-auto flex flex-col justify-center items-center mb-7 px-2 ${className} ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className="h-auto w-full">
        <Image
          className="bg-cover w-full h-[329px] lg:h-[502px]"
          src={image1}
          alt="order section main"
          width={800}
          height={800}
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-primary space-y-5 lg:space-y-10 w-full h-[329px] lg:h-[502px]">
        <Image
          className="h-[164px] w-full lg:w-[440px] xl:w-[554px] xl:h-[287px]"
          src={image2}
          alt="order section secondary"
          width={800}
          height={800}
        />

        <Link
          href={btnLink}
          className={`${
            samplesection ? "bg-white text-black" : "bg-black text-white"
          } text-[21px] font-bold px-8 py-2 rounded-xl xl:py-4 xl:px-12`}
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default OrderSection;
