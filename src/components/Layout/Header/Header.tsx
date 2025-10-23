import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='container mx-auto border grid grid-cols-12'>
        <div>
            <Image src="/assets/images/navbar/logo.png"  fill sizes='150px' alt='logo'/>
        </div>
    </div>
  )
}

export default Header