import React from 'react'
import Mainpage from './Mainpage'
import { fetchJobsApplication } from 'config/generals'

const JobApplication = async () => {
      const  JobApplication =await fetchJobsApplication()
  return (
    <Mainpage applications={JobApplication || []}/>
  )
}

export default JobApplication