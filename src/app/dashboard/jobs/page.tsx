import React from 'react'
import MainPage from './MainPage'

import { fetchJobs} from 'config/generals';

async function  Page() {
  const  Jobs=await fetchJobs()
  console.log(Jobs, "Jobs")
  return (
    <MainPage Jobs={Jobs} />
  )
}

export default Page