"use client";
import React, { ChangeEvent, DragEvent, SetStateAction, useRef, useState } from "react";
import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";
import { ProductImage } from "types/prod";
import { uploadPhotosToBackend } from "utils/fileUploadhandlers";

export interface ImagesProps {
  imageUrl: string;
  public_id: string;
  resource_type: string;
  imagesrc: string;
}

interface PROPS {
  setImagesUrl?: React.Dispatch<SetStateAction<ImagesProps[] | ProductImage[] | undefined>>;
  setposterimageUrl?: React.Dispatch<SetStateAction<ImagesProps[] | ProductImage[] | undefined>>;
  sethoverImage?: React.Dispatch<SetStateAction<ImagesProps[] | ProductImage[] | undefined>>;
  video?: boolean
  multiple?: boolean
  s3Flag?:boolean
  Ispdf?: boolean
}



const ImageUploader = ({ setImagesUrl, setposterimageUrl, sethoverImage, video, multiple,s3Flag,Ispdf }: PROPS) => {
  const [isDraggableArea, setIsDraggableArea] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);




  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files) as File[];
    let file;
    if (setposterimageUrl || sethoverImage) {
      file = e.dataTransfer.files[0];
    }
    try {
      const response = await uploadPhotosToBackend(file ? [file] : files, s3Flag,Ispdf);

      if (!response) return
      setImagesUrl?.((prev = []) => [...prev, ...response]);
      setposterimageUrl?.(response);
      sethoverImage?.(response);
    } catch (error) {
      throw error;
    } finally {
      setIsDraggableArea(false);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files ? Array.from(e.target.files) : [];
    try {
      const response = await uploadPhotosToBackend(files,s3Flag,Ispdf);
      if (!response) return
      setImagesUrl?.((prev = []) => [...prev, ...response]);
      setposterimageUrl?.(response);
      sethoverImage?.(response);
    } catch (error) {
      throw error;
    }
  };


  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`m-4 cursor-pointer bg-primary ${isDraggableArea ? 'border border-sky-500' : 'border border-stroke'}`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggableArea(true);
      }}
      onDragEnter={() => {
        setIsDraggableArea(true);
      }}
      onDragLeave={() => {
        setIsDraggableArea(false);
      }}
      onClick={handleDivClick}
    >
      <div className="p-4 text-center text-black dark:text-white">
        <input
          type="file"
          accept={video ? "image/*,video/*" :  Ispdf
      ? ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "image/*"}
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
          ref={fileInputRef}
          multiple={multiple ? true : false}
        />
        {isDraggableArea ? (
          <BsCloudDownload className="inline-block mb-2 text-4xl  text-white" />
        ) : (
          <BsCloudUpload className="inline-block mb-2 text-4xl text-white" />
        )}
        <p className="text-black dark:text-white">
          Drag & Drop or Click to Upload
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
