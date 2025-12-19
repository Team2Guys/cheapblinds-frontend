import { Breadcrumb, MotorisedBanner, ControlCard, ImageGrid, RelatedProduct } from "@components";
import { fetchCategories } from "@config/fetch";
import { controlOptions, controlOptions1 } from "@data/motorised";
import { GET_CARD_CATEGORY_QUERY } from "@graphql";
import { Category } from "@/types/category";
import React from "react";

import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.motorised_blinds);

const page = async () => {
  const categoryList = await fetchCategories(GET_CARD_CATEGORY_QUERY);
  const publishedCategory = categoryList?.filter((item: Category) => item?.status === "PUBLISHED");
  return (
    <>
      <Breadcrumb title="Motorised Blinds" />
      <MotorisedBanner />
      <ControlCard heading="Control Options" CardData={controlOptions} />
      <ImageGrid
        leftImage="/assets/images/motorised/zebra-image.webp"
        rightImage="/assets/images/motorised/right-image.webp"
      />
      <ControlCard CardData={controlOptions1} />
      <ImageGrid
        leftImage="/assets/images/motorised/zebra-image.webp"
        rightImage="/assets/images/motorised/right-image.webp"
      />
      <RelatedProduct title="Browse Products" data={publishedCategory || []} />
    </>
  );
};

export default page;
