import BlindFitting from "components/common/blind-fitting";
import Herobanner from "components/common/hero-banner";
import RelatedProduct from "components/common/related-product";
import Reviews from "components/common/reviews";
import ChildSafety from "components/Home/child-safety";
import ContactBanner from "components/Home/contactbanner";
import Information from "components/Home/information";
import OrderSection from "components/Home/ordersample";
import ShopSlider from "components/Home/shop-slider";
import { chooseblinds, chooseimage, productData } from "data/home";
import React from "react";

export default function Home() {
  return (
    <>
      <Reviews />
      <Herobanner
        desktopImage="/assets/images/home/banner.webp"
        mobileImage="/assets/images/home/banner-mobile.webp"
        isHome
      />
      <Information />
      <ChildSafety />
      <ShopSlider productData={productData} />
      <OrderSection
        reverse={false}
        image1="/assets/images/home/blindimg.webp"
        image2="/assets/images/home/zebraimg.webp"
        btnText="Explore More"
        btnLink="/category"
      />
      <div className="px-2">
        <Herobanner
          desktopImage="/assets/images/home/free-order/freeorder.webp"
          mobileImage="/assets/images/home/free-order/freeorder-mobile.webp"
          className="container mx-auto h-[395px] md:h-[468px]"
        />
        <Herobanner
          desktopImage="/assets/images/home/payment.webp"
          className="container mx-auto h-[202px] md:h-[455px] mt-10 md:mt-16"
        />
      </div>
      <RelatedProduct title="Browse Products" data={chooseblinds} />
      <OrderSection
        className="mt-10 md:mt-16"
        reverse
        image1="/assets/images/home/cheap.webp"
        image2="/assets/images/home/sample.webp"
        btnText="Order Free Samples"
        btnLink="/sample"
        samplesection
      />
      <BlindFitting />
      <ContactBanner />
      <RelatedProduct
        title="Jobs Done"
        description="You can prevent the use of cookies by changing the settings in your web browser so that (i) it does not accept new cookies, (ii) it informs you about new cookies, or (iii) it deletes all already received cookies. By deleting or disabling future cookies, your user experience may "
        data={chooseimage}
      />
    </>
  );
}
