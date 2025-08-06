import React from 'react'
import MainPage from './MainPage'
import { fetchSocialLinks } from 'config/Sociallinks';

async function  Page() {
  const  SocialsLinks=await fetchSocialLinks()
  return (
    <MainPage reviews={SocialsLinks || []} />
  )
}

export default Page