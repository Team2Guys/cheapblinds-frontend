import React from 'react'
import MainPage from './MainPage'

import { fetchReview } from 'config/generals';

async function  Page() {
  const  reviews=await fetchReview()
  return (
    <MainPage reviews={reviews || []} />
  )
}

export default Page