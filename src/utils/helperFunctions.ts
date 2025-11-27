import axios from "axios";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import { ProductImage } from "@/types/prod";
import { FILE_DELETION_MUTATION, FILE_DELETION_MUTATION_S3 } from "@graphql/Fileupload";
import { uploadPhotosToBackend } from "./fileUploadhandlers";
import { Crop } from "react-image-crop";
import { centerAspectCrop } from "@/types/product-crop";
import { Toaster } from "@components";

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  accessToken?: string,
) => {
  try {
    const awsS3Flag = imagePublicId.includes("s3");

    await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL || "",
      {
        query: awsS3Flag ? FILE_DELETION_MUTATION_S3 : FILE_DELETION_MUTATION,
        variables: {
          public_id: imagePublicId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
        withCredentials: true,
      },
    );

    setterFunction((prev) => prev?.filter((item) => item.public_id !== imagePublicId));
  } catch (error) {
    throw error;
  }
};

export const handleImageAltText = (
  index: number,
  newImageIndex: string,
  setImagesUrlhandler: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  variantType: string,
) => {
  setImagesUrlhandler((prev: ProductImage[] | undefined) => {
    if (!prev) return [];

    const updatedImagesUrl = prev?.map((item: ProductImage, i: number) =>
      i === index ? { ...item, [variantType]: newImageIndex } : item,
    );
    return updatedImagesUrl;
  });
};

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function handleSort(
  imagesUrl: ProductImage[] | undefined,
  dragImage: RefObject<number | null>,
  draggedOverImage: RefObject<number | null>,
  setImagesUrl: React.Dispatch<SetStateAction<ProductImage[] | undefined>>,
) {
  if (dragImage.current === null || draggedOverImage.current === null) return;

  const imagesClone = imagesUrl && imagesUrl.length > 0 ? [...imagesUrl] : [];

  const temp = imagesClone[dragImage.current];
  imagesClone[dragImage.current] = imagesClone[draggedOverImage.current];
  imagesClone[draggedOverImage.current] = temp;

  setImagesUrl(imagesClone);
}

export const DateFormatHandler = (input: Date | string) => {
  if (!input) return "Not available";

  const parsedDate = typeof input === "string" ? new Date(input) : input;

  if (isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(parsedDate)
    .toUpperCase();
};

export const formatAED = (price: number | undefined | null): string => {
  if (!price || isNaN(price)) return "0";
  return price.toLocaleString("en-AE", {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
};

export const formatblogDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const handleCropModalOk = async (
  croppedImage: string | null,
  imageSrc: string | null,
  setIsCropModalVisible: Dispatch<SetStateAction<boolean>>,
  setCroppedImage: Dispatch<SetStateAction<string | null>>,
  setposterimageUrl: Dispatch<SetStateAction<ProductImage[] | undefined>>,
  setBannerImageUrl?: Dispatch<SetStateAction<ProductImage[] | undefined>>,
  setImagesUrl?: Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
) => {
  console.log(croppedImage, "imageSrc");

  if (croppedImage && imageSrc) {
    console.log(imageSrc, "imageSrc");
    try {
      // Convert the cropped image (base64) to a File
      const file = base64ToFile(croppedImage, `cropped_${Date.now()}.jpg`);

      // Upload the cropped image to your backend or Cloudinary
      const response = await uploadPhotosToBackend(file);
      if (!response) return;
      // Use the base URL from your environment variables
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const uploadedImageUrl = response.imageUrl;
      // Append the base URL if needed
      const newImageUrl = uploadedImageUrl.startsWith("http")
        ? uploadedImageUrl
        : `${baseUrl}${uploadedImageUrl}`;

      const newImage = { imageUrl: newImageUrl, public_id: response.public_id };

      // First close the modal and reset croppedImage
      setIsCropModalVisible(false);
      setCroppedImage(null);

      // Use a timeout to update states after the modal has closed
      setTimeout(() => {
        setposterimageUrl((prevImages) =>
          prevImages?.map((img) => (img.imageUrl === imageSrc ? { ...img, ...newImage } : img)),
        );
        if (setBannerImageUrl) {
          setBannerImageUrl((prevImages) =>
            prevImages?.map((img) => (img.imageUrl === imageSrc ? { ...img, ...newImage } : img)),
          );
        }
        if (setImagesUrl) {
          setImagesUrl((prevImages) =>
            prevImages?.map((img) => (img.imageUrl === imageSrc ? { ...img, ...newImage } : img)),
          );
        }
      }, 0);
    } catch (error) {
      console.log(error);
      Toaster("error", "Failed to upload cropped image");
      return error;
    }
  }
};

export const handleCropModalCancel = (
  setIsCropModalVisible: Dispatch<SetStateAction<boolean>>,
  setCroppedImage: Dispatch<SetStateAction<string | null>>,
) => {
  setIsCropModalVisible(false);
  setCroppedImage(null);
};

export const handleCropClick = (
  imageUrl: string,
  setImageSrc: Dispatch<SetStateAction<string | null>>,
  setIsCropModalVisible: Dispatch<SetStateAction<boolean>>,
) => {
  setImageSrc(imageUrl);
  setIsCropModalVisible(true);
};

export const onImageLoad = (
  e: React.SyntheticEvent<HTMLImageElement>,
  setCrop: Dispatch<SetStateAction<Crop | undefined>>,
) => {
  const { width, height } = e.currentTarget;
  const newCrop = centerAspectCrop(width, height, 16 / 9);
  setCrop(newCrop);
};

export const onCropComplete = (
  crop: Crop | undefined,
  imgRef: React.RefObject<HTMLImageElement | null>,
  setCroppedImage: Dispatch<SetStateAction<string | null>>,
) => {
  if (!crop) return;
  const image = imgRef.current;
  if (!image || !crop.width || !crop.height) return;

  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas?.getContext("2d");

  canvas.width = crop?.width;
  canvas.height = crop?.height;

  if (ctx) {
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }

  const base64Image = canvas?.toDataURL("image/jpeg");
  setCroppedImage(base64Image);
};

export const formatPermission = (perm: string) => {
  return perm
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
