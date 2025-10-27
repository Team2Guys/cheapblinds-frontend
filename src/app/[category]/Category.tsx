import Filters from 'components/filters/Filters'
import React from 'react'

const Category = () => {
    return (
        <div className='container mx-auto px-2 flex gap-6 lg:gap-10 mt-10'>
            <div className='hidden md:block md:w-[30%] lg:w-[25%]'>
                <Filters />
            </div>
            <div className='w-full md:w-[70%] lg:w-[75%]'>
                <div className='space-y-3'>
                    <h1 className='font-rubik font-semibold text-4xl'>Roller Blinds</h1>
                    <p className='leading-7'>Elevate your home with the timeless elegance of our Roman blinds, seamlessly blending classic style, practical light control, and effortless functionality. Made from premium fabrics, these blinds showcase soft, graceful folds that exude sophistication whether raised or lowered. With an array of colors, textures, and patterns to choose from, they perfectly complement both traditional and contemporary interiors. Designed for durability and long-lasting beauty, their foldable structure adds a touch of refinement to any window. Plus, Roman blinds are energy-efficient, offering insulation to help regulate room temperature. Redefine your space with Roman blinds that bring charm, practicality, and lasting style to your home.</p>
                </div>
            </div>
        </div>
    )
}

export default Category