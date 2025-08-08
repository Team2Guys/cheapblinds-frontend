
import axios from 'axios';
import React, { RefObject, SetStateAction } from 'react';
import { IEcomerece, IProductValues, ProductImage } from 'types/prod';
import { Category } from 'types/cat';
import { excludedKeys, excludedKeysFroProducts } from '../data/data';
import { FILE_DELETION_MUTATION, FILE_DELETION_MUTATION_S3 } from '../graphql/Fileupload';

export const ImageRemoveHandler = async (imagePublicId: string, setterFunction: React.Dispatch<React.SetStateAction<ProductImage[] | undefined>>,
  finalToken?: string
) => {
  try {
    const awsS3Flag = imagePublicId.includes("s3")

    await axios.post(process.env.NEXT_PUBLIC_BASE_URL || "",
      {
        query: awsS3Flag ? FILE_DELETION_MUTATION_S3 : FILE_DELETION_MUTATION,
        variables: {
          public_id: imagePublicId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${finalToken}`,
        },
        withCredentials: true,
      }
    );


    setterFunction((prev) => prev?.filter((item) => item.public_id !== imagePublicId));

  } catch (error) {
    throw error;
  }
};


export const handleImageAltText = (
  index: number,
  newImageIndex: string,
  setImagesUrlhandler: React.Dispatch<
    React.SetStateAction<ProductImage[] | undefined>
  >,
  variantType: string
) => {
  setImagesUrlhandler((prev: ProductImage[] | undefined) => {
    if (!prev) return [];

    const updatedImagesUrl = prev?.map((item: ProductImage, i: number) =>
      i === index ? { ...item, [variantType]: newImageIndex } : item
    );
    return updatedImagesUrl;
  });
};


export function getExpectedDeliveryDate(
  shippingMethod: "Standard Shipping" | "Next-day Shipping" | "Lightning Shipping",
  orderTime: Date
): string {
  const orderHour = orderTime.getHours();
  const baseDate  = new Date(orderTime);

  /* ───────── Lightning ───────── */
  if (shippingMethod === "Lightning Shipping") {
    const deliveryDate = addWorkingDays(baseDate, orderHour < 13 ? 0 : 1);
    return `Delivery within 1 day i.e. ${formatDate(deliveryDate)}`;
  }

  /* ───────── Next‑day ───────── */
  if (shippingMethod === "Next-day Shipping") {
    const deliveryDate = addWorkingDays(baseDate, orderHour < 13 ? 1 : 2);
    return `Delivery in 1 day i.e. ${formatDate(deliveryDate)}`;
  }

  if (shippingMethod === "Standard Shipping") {
    const fromDate = addWorkingDays(baseDate, 3);
    const toDate   = addWorkingDays(baseDate, 4);
    return `Delivery in 3–4 days i.e. ${formatDate(fromDate)} to ${formatDate(toDate)}`;
  }
  return "";
}





function addWorkingDays(date: Date, days: number): Date {
  const result = new Date(date);
  while (days > 0) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) { // Skip Sunday (0) and Saturday (6)
      days--;
    }
  }
  return result;
}

export function trackingOrder(
  shippingMethod: "Standard Shipping" | "Next-day Shipping" | "Lightning Shipping",
  orderTime: Date
): string {
  const orderHour = orderTime.getHours();
  const base = new Date(orderTime);

  switch (shippingMethod) {
    /* ───────── Lightning ───────── */
    case "Lightning Shipping": {
      const delivery = addWorkingDays(base, orderHour < 13 ? 0 : 1);
      return formatDate(delivery);
    }

    /* ───────── Next‑day ───────── */
    case "Next-day Shipping": {
      const delivery = addWorkingDays(base, orderHour < 13 ? 1 : 2);
      return formatDate(delivery);
    }

    /* ───────── Standard (3‑4 working‑day) ───────── */
    case "Standard Shipping": {
      const from = addWorkingDays(base, 3);
      const to   = addWorkingDays(base, 4);
      return `${formatDate(from)} to ${formatDate(to)}`;
    }

    /* ───────── Fallback (2‑3 *calendar* days) ───────── */
    default: {
      const from = new Date(base);
      from.setDate(from.getDate() + 2);

      const to = new Date(base);
      to.setDate(to.getDate() + 3);

      return `${formatDate(from)} to ${formatDate(to)}`;
    }
  }
}



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
  setImagesUrl: React.Dispatch<SetStateAction<ProductImage[] | undefined>>

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

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(parsedDate).toUpperCase();
};

export const getColSpanAndHeight = (index: number, total: number) => {
  const isLast = index === total - 1;
  const isSecondLast = index === total - 2;
  const remainder = total % 3;

  // If last 2 items and remainder is 2 → col-span-6
  if (remainder === 2 && (isSecondLast || isLast)) {
    return {
      colSpan: 'col-span-6',
      customHeight: 'h-[122px] sm:h-[350px] lg:h-[513px]',
    };
  }
  // Default: col-span-4 for 3-per-row layout and for a single remaining item
  return {
    colSpan: 'col-span-4',
    customHeight: 'h-[150px] sm:h-[250px] lg:h-[336px]',
  };
};


// eslint-disable-next-line
export const CategoriesSortingHanlder = (categories: (Category | any)[]) => {
  const desiredOrder = [
    "Home",
    "Window Coverings",
    "Flooring",
    "Wall Decor",
    "Vinyl Film Wrap",
    "Furniture",
    "About Us",
    "Contact US",
  ];

  const lowerCaseOrder = desiredOrder.map(name => name.toLowerCase());

  return categories.sort((a, b) => {
    const indexA = lowerCaseOrder.indexOf(a.name?.toLowerCase() || "");
    const indexB = lowerCaseOrder.indexOf(b.name?.toLowerCase() || "");

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
};




export const removedValuesHandler = (ChangedValue: IProductValues, ecomerece?: boolean) => {
  const modifiedProductValues = Object.fromEntries(Object.entries(ChangedValue).filter(([key]) => !(ecomerece ? excludedKeys : excludedKeysFroProducts).includes(key))
  ) as IProductValues;
  return modifiedProductValues
};
export const formatAED = (price: number | undefined | null): string => {
  if (!price || isNaN(price)) return "0";
  return price.toLocaleString("en-AE", {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
};

export const variationProducts = ({ products }: { products: IEcomerece[] }) => {
  return products?.flatMap((prod) => {
    const variations: IEcomerece[] = [];

    const hasSizes = (prod.sizes?.length ?? 0) > 0;
    const hasVariants = (prod.variant?.length ?? 0) > 0;

    // Case 1: Both size and variant exist
    if (hasSizes && hasVariants) {
      prod.sizes?.forEach((size) => {
        const variantName = size.variantName;
        const sizeName = size.name;
        const dimension =
          size.dimension?.toLowerCase() === 'all'
            ? prod.sizes
              ?.filter(s => s.dimension && s.dimension.toLowerCase() !== 'all')
              .map(s => `${s.name}: ${s.dimension}`) ?? []
            : size.dimension
              ? [size.dimension]
              : [];
        const matchImage = prod.productImages.filter(
          (img) =>
            img.size?.toLowerCase() === sizeName?.toLowerCase() &&
            img.variant?.toLowerCase() === variantName.toLowerCase()
        );
        variations.push({
          ...prod,
          name: prod.name,
          displayName: `${prod.name} - ${sizeName} (${variantName})`,
          sizeName,
          colorName: variantName,
          dimension: dimension,
          price: Number(size.price),
          discountPrice: Number(size.discountPrice),
          stock: size.stock ?? prod.stock,
          posterImageUrl: matchImage[0] || prod.posterImageUrl,
          hoverImageUrl: (matchImage[1] || matchImage[0]) || prod.hoverImageUrl,
        });
      });
    }

    // Case 2: Only color variants exist
    else if (!hasSizes && hasVariants) {
      prod.variant?.forEach((variant) => {
        const variantName = variant.name;
        const dimension = variant.dimension;
        const matchImage = prod.productImages.find(
          (img) => img.variant?.toLowerCase() === variantName.toLowerCase()
        );

        variations.push({
          ...prod,
          name: prod.name,
          displayName: `${prod.name} (${variantName})`,
          sizeName: undefined,
          colorName: variantName,
          dimension: [dimension],
          price: Number(variant.price),
          discountPrice: Number(variant.discountPrice),
          stock: variant.stock ?? prod.stock,
          posterImageUrl: matchImage || prod.posterImageUrl,
        });
      });
    }
    else if (hasSizes && !hasVariants) {
      prod.sizes?.forEach((size) => {
        const sizeName = size.name;
        const dimension =
          size.dimension?.toLowerCase() === 'all'
            ? prod.sizes
              ?.filter(s => s.dimension && s.dimension.toLowerCase() !== 'all')
              .map(s => `${s.name}: ${s.dimension}`) ?? []
            : size.dimension
              ? [size.dimension]
              : [];
        const matchImage = prod.productImages.find(
          (img) => img.size?.toLowerCase() === sizeName?.toLowerCase()
        );

        variations.push({
          ...prod,
          name: prod.name,
          displayName: `${prod.name} - ${sizeName}`,
          sizeName,
          dimension: dimension,
          colorName: undefined,
          price: Number(size.price),
          discountPrice: Number(size.discountPrice),
          stock: size.stock ?? prod.stock,
          posterImageUrl: matchImage || prod.posterImageUrl,
        });
      });
    }
    else {
       const filtered = prod.Additionalinformation?.filter(item => item.name?.toLowerCase().includes('dimensions') && item.detail);

      const dimensions = (filtered && filtered.length > 1)
        ? filtered.map(s => {
          const cleanedName = s.name
            .replace(/dimensions/i, '')     
            .replace(/[()]/g, '')           
            .trim();                        
          return `${cleanedName}: ${s.detail}`;
        })
        : filtered?.map(s => s.detail);
      variations.push({
        ...prod,
        name: prod.name,
        displayName: prod.name,
        sizeName: undefined,
        colorName: undefined,
        dimension: dimensions,
        posterImageUrl: prod.posterImageUrl,
      });
    }

    return variations;
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
