export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Category {
  id?: string | number;
  name: string;
  description?: string;
  shortDescription?: string;
  customUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadCrumb?: string;
  thumbnailUrl?: string;
  seoSchema?: string;
  status?: ContentStatus;
  lastEditedBy?: string;
  createdAt?: string | Date; // use string only
  updatedAt?: string | Date; // use string only
  subcategories?: Subcategory[];
  products?: Product[];
}

export interface Subcategory {
  id?: string | number;
  name: string;
  description?: string;
  shortDescription?: string;
  customUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadCrumb?: string;
  thumbnailUrl?: string;
  lastEditedBy?: string;
  seoSchema?: string;
  categoryId?: string;
  status?: ContentStatus;
  createdAt?: string | Date; // string only
  updatedAt?: string | Date; // string only
  products?: Product[];
}

export interface Product {
  id?: string | number;
  name: string;
  description?: string;
  Breadcrumb?:string;
  shortDescription?: string;
  customUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadCrumb?: string;
  thumbnailUrl?: string;
  productImages?: string[];
  lastEditedBy?: string | null;
  seoSchema?: string;
  price?: number;
  discountPrice?: number;
  stock?: number;
  additionalInfo?: Array<{ name: string; detail: string }>;
  measuringGuide?: Array<{ name: string; detail: string }>;
  categoryId?: string;
  subcategoryId?: string;
  category?: Category;
  subcategory?: Subcategory;
  status?: ContentStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date; 
}

export interface productImage {
  imagesrc: string
  altText: string;
  publicId: string;
}

export interface Category_Page {
  id?: string | number;
  name?: string;
  description?: string;
  customUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
  breadCrumb?: string;
  seoSchema?: string;
  status?: ContentStatus;
  products?: IProduct[];
  subcategories?: ISubcategory[];
}
export interface ISubcategory {
  id?: string | number;
  name?: string;
  customUrl?: string;
  status?: ContentStatus;

}

export interface IProduct {
  id?: string | number;
  name?: string;
  customUrl?: string;
  status?: ContentStatus;

}
