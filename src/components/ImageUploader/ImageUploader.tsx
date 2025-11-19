"use client";
import React, { ChangeEvent, DragEvent, SetStateAction, useRef, useState } from "react";
import { BsCloudDownload, BsCloudUpload } from "react-icons/bs";
import { uploadPhotosToBackend } from "@utils/fileUploadhandlers";
import { Toaster } from "@components";
import { productImage } from "@/types/category";



interface PROPS {
  setImagesUrl?: React.Dispatch<SetStateAction<productImage[]  | undefined>>;
  video?: boolean;
  multiple?: boolean;
  Ispdf?: boolean;
}

const ImageUploader = ({ setImagesUrl, video, multiple, Ispdf }: PROPS) => {
  const [isDraggableArea, setIsDraggableArea] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length > 10) return Toaster("error", `You Can Upload maximum 10 files at Once`);

    for (const file of files) {
      let SingleFile;
      try {
        if (!multiple) {
          SingleFile = e.dataTransfer.files[0];
        }
        const response = await uploadPhotosToBackend(SingleFile ? SingleFile : file, Ispdf);
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
    if (files.length > 10) return Toaster("error", `You Can Upload maximum 10 files at Once`);

    for (const file of files) {
      try {
        const response = await uploadPhotosToBackend(file, Ispdf);
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