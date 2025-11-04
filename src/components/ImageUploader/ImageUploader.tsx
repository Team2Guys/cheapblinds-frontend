"use client";

import React, { ChangeEvent, DragEvent, SetStateAction, useRef, useState } from "react";
import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";
import { ProductImage } from "@/types/prod";
import { uploadPhotosToBackend } from "@utils/fileUploadhandlers";
import { showToast } from "@components/Toaster/Toaster";

export interface ImagesProps {
  imageUrl: string;
  public_id: string;
  resource_type: string;
  imagesrc: string;
}

interface PROPS {
  setImagesUrl?: React.Dispatch<SetStateAction<ImagesProps[] | ProductImage[] | undefined>>;
  video?: boolean;
  multiple?: boolean;
  s3Flag?: boolean;
  Ispdf?: boolean;
}

const ImageUploader = ({ setImagesUrl, video, multiple, s3Flag, Ispdf }: PROPS) => {
  const [isDraggableArea, setIsDraggableArea] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length > 10) return showToast("error", `You Can Upload maximum 10 files at Once`);

    for (const file of files) {
      let SingleFile;
      try {
        if (!multiple) {
          SingleFile = e.dataTransfer.files[0];
        }
        const response = await uploadPhotosToBackend(SingleFile ? SingleFile : file, s3Flag, Ispdf);
        if (!response) continue;

        setImagesUrl?.((prev = []) => (multiple ? [...prev, response] : [response]));
      } catch (error) {
        throw error;
      } finally {
        setIsDraggableArea(false);
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 10) return showToast("error", `You Can Upload maximum 10 files at Once`);

    for (const file of files) {
      try {
        const response = await uploadPhotosToBackend(file, s3Flag, Ispdf);
        console.log(response, "response");
        if (!response) continue;
        setImagesUrl?.((prev = []) => (multiple ? [...prev, response] : [response]));
      } catch (error) {
        throw error;
      }
    }
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`m-4 cursor-pointer ${isDraggableArea ? "border border-sky-500" : "border border-stroke"}`}
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
          accept={
            video
              ? "image/*,video/*"
              : Ispdf
                ? ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                : "image/*"
          }
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
          ref={fileInputRef}
          multiple={multiple ? true : false}
        />
        {isDraggableArea ? (
          <BsCloudDownload className="inline-block mb-2 text-4xl text-black dark:text-white" />
        ) : (
          <BsCloudUpload className="inline-block mb-2 text-4xl text-black dark:text-white" />
        )}
        <p className="text-black dark:text-white">Drag & Drop or Click to Upload</p>
      </div>
    </div>
  );
};

export default ImageUploader;
