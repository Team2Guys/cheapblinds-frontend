import Image from 'next/image'
import React from 'react'

const OrderSample = () => {
  return (
    <div className='container mx-auto flex flex-col sm:flex-row justify-center items-center w-full'>
        <div className='w-full flex justify-center items-center'><Image className='' src="/assets/Home/sample.webp" alt='sample' width={200} height={200}/></div>
        <div className='w-full'><Image className='bg-cover w-full h-[502px]' src="/assets/Home/cheap.webp" alt='cheapblinds' width={200} height={200}/></div>
       
    </div>
  )
}

export default OrderSample