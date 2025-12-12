import { Breadcrumb, MotorisedBanner, ControlCard, ImageGrid, RelatedProduct } from "@components";
import { fetchCategories } from "@config/fetch";
import { controlOptions, controlOptions1 } from "@data/motorised";
import { GET_CARD_CATEGORY } from "@graphql";
import React from "react";

const page = async () => {
  const categoryList = await fetchCategories(GET_CARD_CATEGORY);
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
      <RelatedProduct title="Browse Products" data={categoryList} />
    </>
  );
};

export default page;
