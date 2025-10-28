"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import SearchBar from './Search'
import UserIcons from './user-icons'
import Navbar from './Navbar'
import SocialLink from './social'
import { FaBars } from 'react-icons/fa6'
import Drawer from 'components/ui/Drawer'
import Link from 'next/link'
import MobileMenu from 'components/ui/mobilemenu'

const Header = () => {
  const [open, setOpen] = useState(false);
   const onClose = () => setOpen(false);
  return (
    <>
    <div className='flex md:hidden justify-between items-center py-2 border-b border-[#0000001F] px-2 container mx-auto'>
      <SocialLink/>
      <UserIcons/>
    </div>
    <div className='container mx-auto flex items-center justify-between w-full py-2 px-2'>
      <div>
        <Link href="/">
        <Image className='h-auto hidden md:block' src="/assets/images/navbar/logo.png" priority height={100} width={150} alt='logo'/>
        </Link>
        <div className="block md:hidden">
          <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={onClose}
            title={ <FaBars className='block md:hidden' size={20} />}
            content={
              <MobileMenu />
        
            }
          />
        </div>
      </div>
      <div className='md:w-4/12 lg:w-6/12 '>
        <SearchBar className='hidden md:flex'/>
        <Link href="/">
        <Image className='h-auto block md:hidden' src="/assets/images/navbar/logo.png" priority height={100} width={150} alt='logo'/>
        </Link>
      </div>
      <div>
        <UserIcons className='hidden md:flex'/>
        <SearchBar className='md:hidden'/>
      </div>
    </div>
    <div className='py-2 bg-black text-white hidden md:block'>
      <div className='container mx-auto flex items-center justify-between px-2'>
        <div className='mx-auto'>
        <Navbar />
        </div>
        <SocialLink/>
      </div>
    </div>
    </>
  )
}

export default Header