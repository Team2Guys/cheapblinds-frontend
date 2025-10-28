import { ProductImage } from "./prod";

export interface GlobalCommontypes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  posterImageUrl: ProductImage;
  last_editedBy?: string;
  short_description?: string;
  custom_url: string;
  Banners?: ProductImage;
  breadCrum?: string;

  Canonical_Tag?: string;
  Meta_Description?: string;
  Meta_Title?: string;
  __typename?: string;
}

export interface ISEO_TAGS {
  posterImageUrl?: ProductImage;
  posterImage?: ProductImage;
  custom_url: string;
  Canonical_Tag?: string;
  Meta_Description?: string;
  Meta_Title?: string;
  category?: { custom_url: string } | string;

  subcategory?: {
    custom_url: true;
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
  params: Promise<{ subCategoryname: string; product: string; careersName?: string }>;
  searchParams: Promise<{ variant?: string; size?: string }>;
};
