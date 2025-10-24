
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface OrderSectionProps {
  reverse?: boolean; 
  image1: string; 
  image2: string; 
  btnText: string; 
  btnLink: string; 
  padding?: string;
  samplesection?: boolean;
}

const OrderSection: React.FC<OrderSectionProps> = ({
  reverse = false,
  image1,
  image2,
  btnText,
  btnLink,
  samplesection
}) => {
  return (
    <div
      className={`container mx-auto flex flex-col justify-center items-center mb-7 ${
        reverse ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      {/* Left/Right Image */}
      <div className="h-auto w-full">
        <Image
          className="bg-cover w-full h-[329px] lg:h-[502px]"
          src={image1}
          alt="order section main"
          width={800}
          height={800}
        />
      </div>

      {/* Content Section */}
      <div
        className={`flex flex-col justify-center items-center bg-primary space-y-5 lg:space-y-10 w-full h-[329px] lg:h-[502px]`}
      >
        <Image
          className="h-[164px] w-full lg:w-[440px] xl:w-[554px] xl:h-[287px]"
          src={image2}
          alt="order section secondary"
          width={800}
          height={800}
        />

        <Link
          href={btnLink}
          className={`${samplesection? "bg-white text-black": "bg-black text-white" } text-[21px] font-bold px-8 py-2 rounded-xl xl:py-4 xl:px-12`}
        >
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default OrderSection;
