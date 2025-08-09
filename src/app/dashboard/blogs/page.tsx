import React from 'react'
import Mainpage from './Mainpage'
import { fetchAllBlogs } from 'config/generals'
import { fetchSubCategories } from 'config/fetch'

const Blogs = async() => {
  const [blogs, subCategories] = await Promise.all([fetchAllBlogs(),fetchSubCategories()]);

console.log(blogs,'blogs')
  return (
    <Mainpage blogs={blogs} subCategories={subCategories}/>
  )
}

export default Blogs