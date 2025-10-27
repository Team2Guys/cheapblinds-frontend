
import Herobanner from 'components/common/hero-banner'
import Reviews from 'components/common/reviews'

import Contact from 'components/contact/contact'
import React from 'react'

const page = () => {
  return (
    <>
    <Reviews/>
    <Herobanner
        desktopImage="/assets/images/callbanner.webp"
        mobileImage="/assets/images/callbannermobile.webp"
        className='h-[300px] md:h-[350px]'
    />
    <Contact/>
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
    </>
  )
}

export default page