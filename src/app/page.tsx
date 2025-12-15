import React from "react";
import {
  InformationSection,
  ChildSafety,
  ContactBanner,
  OrderSection,
  ShopBySlider,
  RelatedProduct,
  JobDone,
  Herobanner,
  BlindFitting,
} from "@components";
import { fetchCategories, fetchProducts } from "@config/fetch";
import { chooseimage } from "@data/home";

const Home = async () => {
  const [productList, categoryList] = await Promise.all([fetchProducts(), fetchCategories()]);
  return (
    <>
      <Herobanner
        desktopImage="/assets/images/home/banner.webp"
        mobileImage="/assets/images/home/banner-mobile.webp"
        isHome
      />
      <InformationSection className="hidden md:grid" />
      <ChildSafety />
      <ShopBySlider CategoryList={categoryList} />
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
          mobileImage="/assets/images/home/free-order/freeorder-mobile-new.png"
          className="container mx-auto h-[400px] md:h-auto md:max-h-[500px]"
        />
        <Herobanner
          desktopImage="/assets/images/home/payment.jpg"
          className="container mx-auto h-auto  md:max-h-[500px] mt-10 md:mt-16"
        />
      </div>
      <RelatedProduct title="Browse Products" data={productList} />
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
      <JobDone
        title="Jobs Done"
        description="You can prevent the use of cookies by changing the settings in your web browser so that (i) it does not accept new cookies, (ii) it informs you about new cookies, or (iii) it deletes all already received cookies. By deleting or disabling future cookies, your user experience may "
        data={chooseimage}
      />
    </>
  );
};

export default Home;
