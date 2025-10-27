"use client"

import Instructions from 'components/common'
import Reviews from 'components/common/reviews'
import ContactBanner from 'components/Home/contactbanner'
import React from 'react'

const FittinInstructions : React.FC = () => {
  return (
    <>
    <Reviews/>
    <div className='container mx-auto px-2'>
    <Instructions/>
     <ContactBanner/>
    </div>
    </>
  )
}

export default FittinInstructions