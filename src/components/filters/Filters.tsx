'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import PriceSlider from './PriceSlider'

const Filters = () => {
    const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
    const [selectedComposition, setSelectedComposition] = useState<string[]>([]);
    const [selectedWidth, setSelectedWidth] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string[]>([]);

    const toggleSelection = <T,>(
        value: T,
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        state: T[]
    ) => {
        if (state.includes(value)) {
            setter(state.filter((item) => item !== value));
        } else {
            setter([...state, value]);
        }
    };
    const patternOptions = ["Flowers", "Geometric", "Plains & Textures"];
    const compositionOptions = ["Polyester", "Polyester Mix"];
    const widthOptions = [
        "Up To 200cm Wide (1554)",
        "Up To 250cm Wide (736)",
        "Up To 280cm Wide (624)",
    ];

    const typeOptions = ["Blackout", "Visible", "Dim-Out"];
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
            {/* ✅ Type */}
            <div>
                <div className="flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1">
                    <p className="font-semibold">Type</p>
                    <MdKeyboardArrowDown />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    {typeOptions.map((item) => (
                        <button
                            key={item}
                            onClick={() => toggleSelection(item, setSelectedType, selectedType)}
                            className="flex items-center gap-2"
                        >
                            <span
                                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedType.includes(item)
                                        ? "border-primary bg-primary text-white"
                                        : "border-black"
                                    }`}
                            >
                                {selectedType.includes(item) && <FaCheck />}
                            </span>

                            {/* images only for this block */}
                            <Image
                                src={`/assets/images/category/${item.replace(" ", "")}.png`}
                                alt={item}
                                width={32}
                                height={32}
                            />

                            <p>{item}</p>
                        </button>
                    ))}
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
            {/* ✅ Width Available */}
            <div>
                <div className="flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1">
                    <p className="font-semibold">Width Available</p>
                    <MdKeyboardArrowDown />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    {widthOptions.map((item) => (
                        <button
                            key={item}
                            onClick={() => toggleSelection(item, setSelectedWidth, selectedWidth)}
                            className="flex items-center gap-2"
                        >
                            <span
                                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedWidth.includes(item)
                                    ? "border-primary bg-primary text-white"
                                    : "border-black"
                                    }`}
                            >
                                {selectedWidth.includes(item) && <FaCheck />}
                            </span>
                            <p>{item}</p>
                        </button>
                    ))}
                </div>
            </div>
            {/* Pattern */}
            <div>
                <div className="flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1">
                    <p className="font-semibold">Pattern</p>
                    <MdKeyboardArrowDown />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    {patternOptions.map((item) => (
                        <button
                            key={item}
                            onClick={() => toggleSelection(item, setSelectedPattern, selectedPattern)}
                            className="flex items-center gap-2"
                        >
                            <span
                                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedPattern.includes(item)
                                    ? "border-primary bg-primary text-white"
                                    : "border-black"
                                    }`}
                            >
                                {selectedPattern.includes(item) && <FaCheck />}
                            </span>
                            <p>{item}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Composition */}
            <div>
                <div className="flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1">
                    <p className="font-semibold">Composition</p>
                    <MdKeyboardArrowDown />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    {compositionOptions.map((item) => (
                        <button
                            key={item}
                            onClick={() => toggleSelection(item, setSelectedComposition, selectedComposition)}
                            className="flex items-center gap-2"
                        >
                            <span
                                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedComposition.includes(item)
                                    ? "border-primary bg-primary text-white"
                                    : "border-black"
                                    }`}
                            >
                                {selectedComposition.includes(item) && <FaCheck />}
                            </span>
                            <p>{item}</p>
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div className='flex items-center w-full border-b border-[#0000003D] gap-4 justify-between px-2 pb-1'>
                    <p className='font-semibold'>Price Range</p>
                    <MdKeyboardArrowDown />
                </div>
                <div>
                    <PriceSlider />
                </div>
            </div>
        </div>
    )
}

export default Filters