import Link from "next/link";
import React from "react";
import { IoStarSharp } from "react-icons/io5";

export const ReviewsSection = () => {
  return (
    <div className="bg-primary text-black py-2">
      <div className="container mx-auto flex max-sm:flex-wrap items-center justify-between px-2 max-sm:space-y-2">
        <div className="flex items-center sm:justify-center gap-2 text-sm mx-auto w-full">
          <span className="font-semibold text-base">Google Reviews</span>
          <div className="flex gap-1 items-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} data-testid="review-star">
                <IoStarSharp className="text-xl text-white" />
              </div>
            ))}
          </div>
          <span className="hidden sm:block text-sm">4.7 rating of 84,290 reviews</span>
        </div>

        <div className="flex gap-2 items-center justify-between max-sm:w-full">
          <div className="w-full block sm:hidden text-sm">4.7 rating of 84,290 reviews</div>
          <div>
            <Link
              href="https://www.google.com/maps/place/Agsons+Middle+East+Trading+LLC/@24.9875755,55.1228537,1970m/data=!3m1!1e3!4m18!1m9!3m8!1s0x3e5f136b6d69190b:0x1026582358119466!2sAgsons+Middle+East+Trading+LLC!8m2!3d24.9875755!4d55.1228537!9m1!1b1!16s%2Fg%2F11vx4g133z!3m7!1s0x3e5f136b6d69190b:0x1026582358119466!8m2!3d24.9875755!4d55.1228537!9m1!1b1!16s%2Fg%2F11vx4g133z?hl=en&entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              className="sm:bg-white px-2 py-1 font-semibold w-fit whitespace-nowrap max-sm:underline"
            >
              Write a reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
