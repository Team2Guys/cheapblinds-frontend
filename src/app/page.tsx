'use client'
import React from "react";
import ImageUploader from "../components/ImageUploader/ImageUploader";
import Image from "next/image";
import { useState } from "react";
import { ProductImage } from "types/prod";
import { ImageRemoveHandler } from "../utils/helperFunctions";


export default function Home() {
  const [images, setimages] = useState<ProductImage[] | undefined>([])
  console.log(images, 'images')
  return (
    <>
    <div className="testing flex gap-2 border border-gray-500">
      {images?.map((val)=>
        <Image className="border border-gray-500" key={val.public_id} src={val.imageUrl} alt="text" height={100} width={100} onClick={()=>ImageRemoveHandler(val.public_id, setimages)}/>
      
      )}
      testing
    </div>
      <ImageUploader setImagesUrl={setimages} multiple/>
    </>
  );
}




