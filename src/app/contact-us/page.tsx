
import Contact from 'components/contact/contact'
import ContactBanner from 'components/Home/contactbanner'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='bg-primary-light'>
    <ContactBanner/>
    </div>
    <Contact/>
    </>
  )
}

export default page