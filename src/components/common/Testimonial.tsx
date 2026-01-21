"use client";
import React, { useState } from "react";
import { MdStarRate } from "react-icons/md";
import { TestimonialProps } from "@/types/common";
import { Modal, SwiperSlider } from "@components";
import { SwiperSlide } from "swiper/react";
import { TestimonialBreakpoints } from "@data/Slider-breakpoints";
import Image from "next/image";
import {
  tabbyFeature,
  tabbyHowItWork,
  tabbyPayIcon,
  tamaraFeature,
  tamaraList,
  tamaraWhy,
} from "@data/product-detail";

export const Testimonial = React.memo(({ reviews, showPaymentInfo = false }: TestimonialProps) => {
  const [tabbyOpen, setTabbyOpen] = useState(false);
  const [tamaraOpen, setTamaraOpen] = useState(false);
  return (
    <div className="px-2 container mx-auto">
      {showPaymentInfo && (
        <div className="bg-primary rounded-lg p-2 px-4 flex flex-wrap md:flex-nowrap gap-4 my-10 max-md:justify-center items-center">
          <p className="md:text-[30px] font-semibold font-rubik text-center md:text-left">
            Pay in 4 interest-free payments with
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <div className="cursor-pointer" onClick={() => setTabbyOpen(true)}>
              <Image
                unoptimized
                src="/assets/images/cart/tabby.png"
                className="w-20 h-9 md:w-28 md:h-11 rounded-xl object-contain"
                alt="Tabby"
                width={200}
                height={200}
              />
            </div>
            <div className="cursor-pointer" onClick={() => setTamaraOpen(true)}>
              <Image
                unoptimized
                src="/assets/images/cart/tamara.png"
                className="w-20 h-9 md:w-28 md:h-11 rounded-xl object-contain"
                alt="Tamara"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------- TESTIMONIAL SECTION ---------- */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="bg-primary-light p-4 text-center h-full py-6 flex flex-col justify-center">
            <p className="font-medium mb-2">Excellent</p>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <MdStarRate size={30} key={i} className="bg-primary text-white p-1 mx-0.5" />
              ))}
            </div>
            <p className="text-sm">
              Based on <span className="underline font-medium">456 reviews</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              <MdStarRate size={25} className="text-primary mr-1" />
              <span className="font-medium">TrustPilot</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <SwiperSlider navigation loop spaceBetween={10} breakpoints={TestimonialBreakpoints}>
            {reviews.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-primary-light p-4 flex flex-col justify-between min-h-[200px] h-full">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex">
                        {[...Array(item.rating)].map((_, i) => (
                          <MdStarRate key={i} className="bg-primary text-white mx-0.5" />
                        ))}
                      </div>
                      <p className="text-xs">{item.date}</p>
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm">{item.text}</p>
                  </div>
                  <div>
                    <hr className="w-14 my-2" />
                    <p className="font-medium">{item.author}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperSlider>
        </div>
      </div>
      <Modal isOpen={tabbyOpen} onClose={() => setTabbyOpen(false)} paymentModal>
        <h2 className="text-2xl font-bold py-2">Easy Monthly Installments</h2>
        <div className="py-5 ps-5 xs:ps-10 md:ps-20 pe-4 me-4 xs:me-7">
          <Image height={130} width={130} src="/assets/images/icon-payment/tabby.webp" alt="logo" />
          <h2 className="text-xl xs:text-2xl sm:text-lg md:text-xl font-bold mt-5 leading-10 xs:leading-tight">
            <span className="rounded-full bg-[#3BFFC1] px-4 py-0 text-nowrap">Shop now,</span>
            <br />
            <span className="text-[#3BFFC1] text-outline-border  tracking-wider">
              pay over time.
            </span>
          </h2>
          <ul className='mt-5 font-bold text-lg xs:text-2xl sm:text-xl md:text-xl list-["–"] list-inside leading-normal md:leading-normal'>
            {tabbyFeature.map((item) => (
              <li key={item.id}>{item.para}</li>
            ))}
          </ul>
          <div className="mt-5">
            <h3 className="font-bold text-2xl sm:text-3xl">How it works</h3>
            <ul className="font-medium text-lg xs:text-xl mt-3 md:leading-relaxed">
              {tabbyHowItWork.map((item) => (
                <li className="flex items-center gap-2 space-y-1" key={item.id}>
                  <span className="rounded-full bg-primary-light min-w-8 h-8 flex items-center justify-center">
                    {item.id}
                  </span>
                  <span className="w-full">{item.para}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-2 mt-5 px-6">
            {tabbyPayIcon.map((item, index) => (
              <Image
                src={item.imageUrl}
                alt="master"
                className="sm:w-20 w-14 sm:h-20 object-contain"
                key={index}
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* Tamara Modal */}
      <Modal isOpen={tamaraOpen} onClose={() => setTamaraOpen(false)} paymentModal>
        <h2 className="text-2xl font-bold text-center">Pay easier with Tamara</h2>
        <div className="py-8 px-5 xs:px-10 md:px-20 me-4 xs:me-7">
          <div className="text-center">
            <Image
              height={130}
              width={130}
              src="/assets/images/icon-payment/tamara.webp"
              alt="logo"
              className="mx-auto"
            />
          </div>
          <h2 className="text-center font-bold text-2xl mt-5">Pay easier with Tamara</h2>
          <div className="px-4 py-2 bg-linear-to-r from-orange-300 via-blue-300 to-pink-300 mt-4 rounded-[70px]">
            <div className="bg-linear-to-r from-orange-100 via-blue-100 to-pink-100 pb-6 pt-1 px-8 rounded-[70px] flex flex-col gap-2">
              <div className="w-10/12 mx-auto">
                {tamaraFeature.map((item) => (
                  <div className="flex justify-baseline items-center py-2" key={item.id}>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-md font-light mt-1">{item.para}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 px-5 xs:px-10 2xl:px-20">
            <h3 className="font-bold text-2xl">Why Tamara?</h3>
            <div className="flex items-center flex-wrap 2xl:flex-nowrap 2xl:justify-between gap-4 pt-4">
              {tamaraWhy.map((item) => (
                <div
                  className="w-auto px-2 h-9 rounded-2xl bg-primary text-white flex items-center text-20 font-semibold"
                  key={item.id}
                >
                  {item.para}
                </div>
              ))}
            </div>
            <div className="mt-5">
              <ul className="font-20 font-normal">
                {tamaraList.map((item) => (
                  <li className="flex items-center gap-2" key={item.id}>
                    <span>({item.id})</span>
                    <span>{item.para}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});
