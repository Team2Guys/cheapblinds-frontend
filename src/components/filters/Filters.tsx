import Image from 'next/image'
import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoIosCheckmark } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'

const Filters = () => {
    return (
        <div className='flex flex-col gap-6 pb-8'>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 px-2'>
                    <Image src='/assets/images/category/filter-lighting.png' alt='image' width={39} height={48} />
                    <p>Express delivery</p>
                </div>
                <h2 className='font-rubik font-medium text-xl py-3'>Active filters</h2>
                <div className='flex flex-wrap items-center gap-3'>
                    <div className='relative'>
                        <span className='w-4 h-4 flex justify-center items-center bg-primary rounded-full text-white absolute -top-2 -right-2 text-xs'><RxCross2 /></span>
                        <button className='border border-primary w-36 h-10 flex justify-center items-center rounded-xs font-semibold text-base'>Light Filtering</button>
                    </div>
                    <div className='relative'>
                        <span className='w-4 h-4 flex justify-center items-center bg-primary rounded-full text-white absolute -top-2 -right-2 text-xs'><RxCross2 /></span>
                        <button className='border border-primary w-36 h-10 flex justify-center items-center rounded-xs font-semibold text-base'>Light Filtering</button>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Type</p>
                    <MdKeyboardArrowDown />
                </div>
                <div className='flex flex-col gap-4 pt-4'>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <Image src='/assets/images/category/Blackout.png' alt='image' width={32} height={32} />
                        <p>Blackout</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-primary text-white bg-primary flex justify-center items-center text-[10px]'><FaCheck /></span>
                        <Image src='/assets/images/category/Visible-filter.png' alt='image' width={32} height={32} />
                        <p>Visible</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <Image src='/assets/images/category/Dim-Out.png' alt='image' width={32} height={32} />
                        <p>Dim-Out</p>
                    </button>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Colour</p>
                    <MdKeyboardArrowDown />
                </div>
                <div className='flex flex-col gap-4 pt-4'>
                    <button className='flex items-center gap-2'>
                        <span className='jagged-shape w-8 h-8' style={{ background: '#FFFDD0' }}></span>
                        <p>Cream  (1554)</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='jagged-shape w-8 h-8' style={{ background: '#808080' }}></span>
                        <p>Grey  (1554)</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='jagged-shape w-8 h-8' style={{ background: '#E0D5C6' }}></span>
                        <p>Natural (624)</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='jagged-shape w-8 h-8' style={{ background: '#FFFF00' }}></span>
                        <p>Yellow (195)</p>
                    </button>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Width Available</p>
                    <MdKeyboardArrowDown />
                </div>
                <div className='flex flex-col gap-4 pt-4'>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <p>Up To 200cm Wide (1554)</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-primary text-white bg-primary flex justify-center items-center text-[10px]'><FaCheck /></span>
                        <p>Up To 250cm Wide (736)</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <p>Up To 280cm Wide (624)</p>
                    </button>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Pattern</p>
                    <MdKeyboardArrowDown />
                </div>
                <div className='flex flex-col gap-4 pt-4'>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <p>Flowers</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-primary text-white bg-primary flex justify-center items-center text-[10px]'><FaCheck /></span>
                        <p>Geometric</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <p>Plains & Textures</p>
                    </button>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Composition</p>
                    <MdKeyboardArrowDown />
                </div>
                <div className='flex flex-col gap-4 pt-4'>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-black'></span>
                        <p>Polyester</p>
                    </button>
                    <button className='flex items-center gap-2'>
                        <span className='border rounded-sm w-4 h-4 border-primary text-white bg-primary flex justify-center items-center text-[10px]'><FaCheck /></span>
                        <p>Polyester Mix</p>
                    </button>
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Price Range</p>
                    <MdKeyboardArrowDown />
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Filters