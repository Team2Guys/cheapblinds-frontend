import React from 'react'
import OrderSection from './ordersample'

const Order = () => {
  return (
    <>
       <OrderSection
        reverse={false} 
        image1="/assets/Home/blindimg.webp"
        image2="/assets/Home/zebraimg.webp"
        btnText="Explore More"
        btnLink="/category"
        samplesection={false}
      />
     <OrderSection
        reverse
        image1="/assets/Home/cheap.webp"
        image2="/assets/Home/sample.webp"
        btnText="Order Free Samples"
        btnLink="/sample"
        samplesection
      />
      </>
  )
}

export default Order