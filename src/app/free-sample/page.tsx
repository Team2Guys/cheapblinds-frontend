import { Banner, Breadcrumb, AllSample, SampleCheckout } from "@components";
import { FreeSample } from "@data/bin";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrumb title="Free Sample" />
      <div className="container mx-auto px-2 my-10 space-y-10">
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-8/12 2xl:w-6/12">
            <Banner />
          </div>
          <div className="w-full md:w-4/12 2xl:w-6/12"></div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-8/12 2xl:w-6/12 space-y-4">
            <div className="bg-primary p-2 rounded-md">
              <p className="font-semibold">Unlimited Sample - Free Charge</p>
            </div>
            <AllSample samples={FreeSample} />
          </div>
          <div className="w-full md:w-4/12 2xl:w-6/12">
            <SampleCheckout />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
