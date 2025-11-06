import {
  Breadcrumb,
  MotorisedBanner,
  ControlCard,
  ImageGrid,
  CompatibleProducts,
} from "@components";
import { controlOptions, controlOptions1 } from "@data/motorised";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrumb title="Motorised Blinds" />
      <MotorisedBanner />
      <ControlCard heading="Control Options" CardData={controlOptions} />
      <ImageGrid
        leftImage="/assets/images/motorised/zebraimg.webp"
        rightImage="/assets/images/motorised/rightimage.webp"
      />
      <ControlCard CardData={controlOptions1} />
      <ImageGrid
        leftImage="/assets/images/motorised/zebraimg.webp"
        rightImage="/assets/images/motorised/rightimage.webp"
      />
      <CompatibleProducts />
    </>
  );
};

export default page;
