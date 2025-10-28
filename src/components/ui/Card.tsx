'use'
import Image from 'next/image';
import React from 'react'
import { FaRegHeart } from 'react-icons/fa';
import { ProductImage } from 'types/prod';

interface Product {
    category: {
        name: string;
        custom_url: string;
    };
    name: string;
    custom_Url?: string;
    delivery: string;
    order_by: string;
    deliveryImageUrl: ProductImage;
    price: string;
    posterImageUrl: ProductImage;
    colorCode: string;
    windowImage: ProductImage
};


const Card = ({ card }: { card: Product }) => {
    return (
        <div className='card-wrapper relative p-2 rounded-md'>
            <div className='relative h-40 md:h-80 xl:h-72'>
                <Image src={card.posterImageUrl.imageUrl} alt={card.posterImageUrl.altText || card.name} fill />
                <div className='absolute bottom-2 left-2'>
                    <div className='relative h-9 md:h-16 w-7 md:w-14'>
                        <Image src={card.deliveryImageUrl.imageUrl} alt={card.deliveryImageUrl.altText || 'image'} fill className='ms-1 md:ms-2' />
                    </div>
                    <p className="text-[9px] md:text-base font-semibold text-primary [text-shadow:_-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,-2px_1px_0_#000,2px_1px_0_#000,-2px_-1px_0_#000,2px_-1px_0_#000,-1px_2px_0_#000,1px_2px_0_#000,-1px_-2px_0_#000,1px_-2px_0_#000] md:[text-shadow:_-4px_-4px_0_#000,4px_-4px_0_#000,-4px_4px_0_#000,4px_4px_0_#000,0_4px_0_#000,4px_0_0_#000,0_-4px_0_#000,-4px_0_0_#000,-4px_2px_0_#000,4px_2px_0_#000,-4px_-2px_0_#000,4px_-2px_0_#000,-2px_4px_0_#000,2px_4px_0_#000,-2px_-4px_0_#000,2px_-4px_0_#000]">
                        Order by{" "}
                        <span className="text-sm md:text-2xl text-primary font-semibold [text-shadow:_-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,-2px_1px_0_#000,2px_1px_0_#000,-2px_-1px_0_#000,2px_-1px_0_#000,-1px_2px_0_#000,1px_2px_0_#000,-1px_-2px_0_#000,1px_-2px_0_#000] md:[text-shadow:_-4px_-4px_0_#000,4px_-4px_0_#000,-4px_4px_0_#000,4px_4px_0_#000,0_4px_0_#000,4px_0_0_#000,0_-4px_0_#000,-4px_0_0_#000,-4px_2px_0_#000,4px_2px_0_#000,-4px_-2px_0_#000,4px_-2px_0_#000,-2px_4px_0_#000,2px_4px_0_#000,-2px_-4px_0_#000,2px_-4px_0_#000]">
                            {card.order_by}
                        </span>
                        <br />
                        {card.delivery}
                    </p>
                </div>
            </div>
            <div className='pt-3 space-y-4'>
                <div className='flex justify-between md:items-center gap-1 md:gap-2'>
                    <div className='space-y-1'>
                        <p className='text-xs md:text-base'>{card.category.name}</p>
                        <h2 className='font-medium text-base md:text-xl font-rubik md:underline h-10 xs:h-auto'>{card.name}</h2>
                    </div>
                    <div className='relative w-6 md:w-10 h-6 md:h-10'>
                        <Image src={card.windowImage.imageUrl} alt={card.windowImage.altText || 'image'} fill />
                    </div>
                </div>
                <div className='flex justify-between items-center gap-1 md:gap-2'>
                    <button className='bg-primary w-28 md:w-44 h-6 md:h-10 text-[10px] md:text-base flex justify-center items-center rounded-md font-semibold'>Free Sample</button>
                    <span className="jagged-shape w-6 md:w-10 h-6 md:h-10" style={{ background: `#${card.colorCode}` }}></span>
                </div>
                <div className='flex justify-between items-center gap-1 md:gap-2'>
                    <p className='flex items-center gap-1 text-xs md:text-base'>From: <span className="font-currency text-base md:text-[22px] font-normal"></span><span className='font-semibold'>{card.price}</span></p>
                    <button className="w-6 md:w-10 h-6 md:h-10 border rounded-md border-black flex justify-center items-center">
                        <FaRegHeart className='text-xs md:text-xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card