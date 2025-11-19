import { GlobalCommontypes } from "./CommonTypes";
import { BlogStatus } from "./general";
import { IProduct, ProductImage } from "./prod";

export interface CategoryHeroImage {
  imageUrl: string;
  alt: string;
}

export interface CategoryHeroText {
  text: string;
  style?: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryText {
  content: string;
}

export interface Paragraph {
  text: string;
}

export interface Category extends GlobalCommontypes {
  seoSchema?: string;
  status?: BlogStatus;
  subCategories?: ISUBCATEGORY[];
}

export interface EDIT_CATEGORY extends Category {
  id?: number | string;
  thumbnailUrl?: string;
  subcategory?: ISUBCATEGORY_EDIT;
  status?: BlogStatus;
  Products?: IProduct[];
}

export interface ISUBCATEGORY extends GlobalCommontypes {
  status?: BlogStatus;

  Category?: Category;
  products?: IProduct[];
  category?: Category;
  subcategory?: ISUBCATEGORY_EDIT;
  displayName?: string;
  price?: number;
  discountPrice?: number;
  seoSchema?: string;
}

export interface ISUBCATEGORY_EDIT extends ISUBCATEGORY {
  id?: number | string;
  category?: number | string;
  products?: IProduct[];
  posterImageUrl?: ProductImage;
  createdAt?: Date;
  updatedAt?: Date;
  customUrl?: string;
  QualityImages?: ProductImage[];
}

export interface SUBNCATEGORIES_PAGES_PROPS {
  catgories: Category[];
  categoryData: Category;
  subCategoryData?: ISUBCATEGORY;
  isSubCategory: boolean;
  mainCategory?: mainCategory;
  slug: string;
  subcategory?: string;
  subdescription?: ICategory;
}

export interface ISaleBanner {
  Bannerdiscount?: string;
  salesBannerHeading?: string;
  paraText?: string;
  Bannercounter?: string;
  salesBannerImage?: ProductImage[];
}
