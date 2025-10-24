import Herobanner from 'components/common/hero-banner';
import Reviews from 'components/common/reviews';
import ChildSafety from 'components/Home/child-safety';
import Information from 'components/Home/information';
import React from 'react';
export default function Home() {
  return (
  <>
  <Reviews/>
  <Herobanner  
    desktopImage="/assets/images/home/banner.webp"
    mobileImage="/assets/images/home/banner-mobile.webp"
    isHome />
  <Information/>
  <ChildSafety/>
  
  </>
  );
}




