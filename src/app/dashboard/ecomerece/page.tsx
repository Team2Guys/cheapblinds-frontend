import { fetchCategories, fetchEcomereceProducts} from 'config/fetch';
import dynamic from 'next/dynamic';
import React from 'react'
const Product = dynamic(() => import('../products/Products'));
async function page() {
  const [categories, ecomereceProducts] = await Promise.all([
    fetchCategories(),
    fetchEcomereceProducts()

  ]);
  return (
    <Product categories={categories} ecomereceProducts={ecomereceProducts} />
  )
}

export default page