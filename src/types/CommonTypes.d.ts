import { ProductImage } from "./prod";

export interface GlobalCommontypes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  thunbnailUrl: ProductImage;
  lastEditedBy?: string;
  shortDescription?: string;
  customUrl: string;
  Banners?: ProductImage;
  breadCrumb?: string;

  canonicalTag?: string;
  metaDescription?: string;
  metaTitle?: string;
  __typename?: string;
}

export interface ISEO_TAGS {
  posterImageUrl?: ProductImage;
  posterImage?: ProductImage;
  customUrl: string;
  canonicalTag?: string;
  metaDescription?: string;
  metaTitle?: string;
  category?: { customUrl: string } | string;

  subcategory?: {
    customUrl: true;
  };
}

export interface SEARCH_PARAMS {
  variant?: string;
  size?: string;
}

export type meta_props = {
  params: Promise<{ subCategoryname: string; careersName?: string }>;
};

export type IPRODUCT_META = {
  params: Promise<{
    subCategoryname: string;
    product: string;
    careersName?: string;
  }>;
  searchParams: Promise<{ variant?: string; size?: string }>;
};
