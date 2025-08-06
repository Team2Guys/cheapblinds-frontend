import { GlobalCommontypes } from "./CommonTypes";
import { BlogStatus } from "./general";
import { AdditionalInformation, IProduct, ProductImage } from "./prod";

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

interface CommonTypes extends GlobalCommontypes {
  //  CategorySections
  categoryHeroImages?: ProductImage[];
  categoryHeroToptext?: string;
  categoryHeroHeading?: string; //flooring
  categoryHeroText?: AdditionalInformation[];
  categoryFaqs?: AdditionalInformation[]; //window covering
  leftHeading?: string;               //wall Decor
  categoryText?: AdditionalInformation[]; //flooring + wall Decor 
  // explor flooring Options
  explore_Heading?: string
  explore_main_heading?: string
  explore_description?:string
  // Installation Section
  bodyHeading?: string;
  bodyMainHeading?: string;
  bodyText?: string;
}


export interface Category extends CommonTypes {
  RecallUrl?: string;
  // ToHeading
  topHeading?: string;
  topDescription?: string;
  seoSchema?: string;
  status?:BlogStatus;
  //
  leftHeading?: string;               //wall Decor
  categoryText?: AdditionalInformation[]; //flooring + wall Decor      
  // After Body
  Heading?: string; //flooring
  paras?: AdditionalInformation[]; //flooring 
  bottomText?: string,
  // Banner 
  Bannerdiscount?: string;
  salesBannerHeading?: string;
  paraText?: string;
  Bannercounter?: string;
  // on Procuts Main Heading
  bottomText?: string
  Product_Section_heading?: string
  salesBannerImage?: ProductImage[]
  subCategories?: ISUBCATEGORY[];
}


export interface EDIT_CATEGORY extends Category {
  id?: number | string
  RecallUrl?: string
  posterImageUrl?: ProductImage
  subcategory?: ISUBCATEGORY_EDIT;
  categoryHeroImages?: ProductImage
  salesBannerImage?: ProductImage
  status?:BlogStatus;

}

export interface ISUBCATEGORY extends CommonTypes {
  // Collection Section
  collectionHeading?: string;
  collectionMainHeading?: string;
  status?:BlogStatus;

  // Quality Sections
  QualityHeadings?: AdditionalInformation[];
  QualityText?: AdditionalInformation[];
  QualityImages: ProductImage[];


  // Custom Made Section
  CustomHeading?: AdditionalInformation[];
  CustomText?: AdditionalInformation[];

  // Product Main Section
  Product_Section_heading?: string;
  bottomText?: string;
  // Professional Services
  ProfessionalServiceImage?: ProductImage
  Category?: Category
  products?: IProduct[]
  category?: Category
  InnersubCategories?: INNERSUBCATEGORY[]
  subcategory?: ISUBCATEGORY_EDIT
  displayName?: string
  price?: number
  discountPrice?: number
  colorName?: string
  sizeName?: string
}


export interface ISUBCATEGORY_EDIT extends ISUBCATEGORY {
  id?: number | string
  category?: number | string,
  products?: IProduct[]
  posterImageUrl?: ProductImage;
  createdAt?: Date;
  updatedAt?: Date;
  custom_url?: string;
  QualityImages?:ProductImage[]

  
}

export interface INNERSUBCATEGORY {
  id?: number | string,
  name:          string
  custom_url:    string
  subCategoryId?: number | string
  subCategory?:   ISUBCATEGORY
  createdAt?: Date;
  updatedAt?: Date;
  last_editedBy?: string
  products?: IProduct[]
  catalogue?:ProductImage
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
  salesBannerImage?: ProductImage[]
}