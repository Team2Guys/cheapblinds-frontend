import React from 'react'
import { fetchProductreviews } from 'config/generals'
import ProdReview from './ProdReview'

async function page() {
        const reviews  = await fetchProductreviews()
    
    return (
        <ProdReview reviews={reviews}/>
    )
}

export default page


