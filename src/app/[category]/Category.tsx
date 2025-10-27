import Filters from 'components/filters/Filters'
import SortDropdown from 'components/ui/SortDropdown'
import { categoryFeatures } from 'data/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaChevronDown } from 'react-icons/fa'

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
                <div className='flex justify-between gap-2 pt-6'>
                    {categoryFeatures.map((item, index) => (
                        <div className='flex flex-col items-center gap-2' key={index}>
                            <Image src={item.imageUrl} alt='image' width={80} height={80} />
                            <button className='bg-primary font-semibold px-4 py-1 rounded-md w-fit'>{item.name}</button>
                        </div>
                    ))}

                </div>
                <div className="flex items-center justify-between bg-white w-full py-2 gap-4 mt-6">

                    {/* Left Section */}
                    <div className="flex items-center gap-4 grow">

                        {/* Measuring Card */}
                        <div className="flex items-center justify-between bg-[#FEE7AC] border cursor-pointer w-1/2">
                            <div className='flex items-center gap-3 px-3 py-2'>
                                <Image src="/assets/images/category/measuring.png" width={28} height={28} alt="measure" />
                                <div className="leading-tight">
                                    <p className="font-semibold text-sm">How to Measuring</p>
                                    <p className="text-xs">How to Measure</p>
                                </div>
                            </div>
                            <Link
                                href="/assets/pdf/how-to-measure.pdf"
                                download
                                className="bg-[#FFB800] h-[60px] w-32 flex justify-center text-center items-center font-semibold px-2 text-black"
                            >
                                Download Now
                            </Link>
                        </div>

                        {/* Fitting Card */}
                        <div className="flex items-center justify-between bg-[#FEE7AC] border cursor-pointer w-1/2">
                            <div className='flex items-center gap-3 px-3 py-2'>
                                <Image src="/assets/images/category/fetting.png" width={28} height={28} alt="Fitting" />
                                <div className="leading-tight">
                                    <p className="font-semibold text-sm">How to Fitting</p>
                                    <p className="text-xs">How to Measure</p>
                                </div>
                            </div>
                            <Link
                                href="/assets/pdf/how-to-measure.pdf"
                                download
                                className="bg-[#FFB800] h-[60px] w-32 flex justify-center text-center items-center font-semibold px-2 text-black"
                            >
                                Download Now
                            </Link>
                        </div>

                    </div>

                    {/* Sort Dropdown */}
                    <SortDropdown />

                </div>

            </div>
        </div>
    )
}

export default Category