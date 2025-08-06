import { EDIT_CATEGORY, INNERSUBCATEGORY, ISUBCATEGORY_EDIT } from "./cat";
import { BlogStatus } from "./general";
import { AdditionalInformation } from "./type";


export interface ProductImage {
  imageUrl: string;
  public_id: string;
  altText?: string;
  imageIndex?: number;
  Title?: string;
  Index?: string;
  size?: string;
  variant?: string;
  color?: string | number;
  colorName?: string;
  plankWidth?: string;
  plankHeight?: string;
  isBlurred?: boolean;
  colorCode?: string;
  resource_type?: string
  location?: string
  Material?: string
  imagesrc?: string
}

export interface Order {
  firstName: string,
  lastName: string,
  email: string,
  country: string,
  city: string,
  address: string,
  note: string,
  phone: string,
  emirate: string,
  orderId: string,
  transactionDate: string,
  shipmentFee: number,
  totalPrice: number,
  pay_methodType: string,
  paymethod_sub_type: string,
  cardLastDigits: number,
  checkout: boolean,
  paymentStatus: boolean,
  isRefund: boolean,
  success: boolean,
  pending: boolean,
  currency: string,
  is3DSecure: string,
  checkoutDate: string,
  products: orderProduct[],
  shippingMethod: Shipping,
  __typename: string
}
export interface AdditionalInformation {
  name: string,
  detail?: string
  price?: string;
  discountPrice?: string;
  stock?: number;
  code?: string
  dimension?: string
}

export interface ISizes {
  name?: string;
  variantName: string;
  price?: string;
  discountPrice?: string;
  stock?: string;
  dimension?: string
}

interface CommonProductsTypes {
  id: number;
  name: string | undefined;
  price: number;
  description: string;
  stock: number;
  discountPrice?: number;
  posterImageUrl: ProductImage;
  hoverImageUrl?: ProductImage;
  productImages: ProductImage[];
  createdAt?: Date;
  updatedAt?: Date;
  Canonical_Tag?: string;
  Meta_Description?: string;
  Meta_Title?: string;
  last_editedBy?: string;
  custom_url: string;
  breadCrum?: string;
  Banners?: ProductImage;
  // 
  seoSchema?: string;
  category: EDIT_CATEGORY
  subcategory: ISUBCATEGORY_EDIT
  categoryId?: number;
  subCategoryId?: number;
}


export interface IProduct extends CommonProductsTypes {
  type: 'product';
  innersubCategoryId?: number
  // Banners
  BannerText?: string;
  BannerHeading?: string;
  salesBannerImage?: ProductImage;
  altText?: string;
  // After hero sections
  categoryHeroImages: ProductImage[];
  categoryHeroToptext?: string;
  categoryHeroHeading?: string;
  categoryHeroText: AdditionalInformation[];
  categoryFaqs: AdditionalInformation[];

  // Right side text
  right_side_Heading?: string;
  left_side_Text: AdditionalInformation[];
  left_side_image?: ProductImage;

  // Product section
  Product_Section_heading?: string;
  bottomText?: string;

  // Capabilities section
  explore_Heading?: string;
  explore_main_heading?: string;
  explore_description?: string;
  professionalServiceImage?: ProductImage;
  stock?: string;
  // Schema

  Innersubcategory?: INNERSUBCATEGORY
  subcategory?: ISUBCATEGORY_EDIT
  displayName?: string
  colorName?: string
  sizeName?: string
  status?:BlogStatus
}


export interface Shipping {
  icon: string;
  name: string;
  description: string;
  shippingFee: number;
  otherEmiratesFee?: number;
  freeShippingFee?: number;
}

export interface IEcomerece extends CommonProductsTypes {
  type: 'ecommerce';
  DescriptionBullets?: AdditionalInformation[]
  Additionalinformation?: AdditionalInformation[]
  Questions?: AdditionalInformation[]
  materialType?: AdditionalInformation[]
  colors?: AdditionalInformation[]
  sizes?: ISizes[]
  variant?: AdditionalInformation[]
  stock: string;
  posterImageUrl: ProductImage;
  displayName?: string;
  sizeName?: string;
  colorName?: string;
  dimension?: string[];
  shippingOptions?:Shipping
  status?:BlogStatus
}




export interface IProductValues extends Omit<CommonProductsTypes, 'posterImageUrl' | 'category' | 'subcategory' | 'Innersubcategory'>, IEcomerece, IProduct {
  hoverImageUrl?: ProductImage,
  productImages?: ProductImage[],
  createdAt?: Date;
  updatedAt?: Date;
  Banners?: ProductImage;
  categoryHeroImages?: ProductImage;
  left_side_image?: ProductImage;
  category?: string | number
  subcategory?: string | number
  Innersubcategory?: string | number
  id?: number
  posterImageUrl?: ProductImage;
  type?: string
}


export interface IProductDetail {
  id?: string;
  name?: string,
  price: number,
  discountPrice?: number,
  stock: number,
  description: string,
  DescriptionBullets: AdditionalInformation[],
  colors?: AdditionalInformation[],
  sizes: ISizes[],
  variant: AdditionalInformation[]
  images?: ProductImage[];
  AllproductData?: IEcomerece[]
  sizeParam?: string;
  filterParam?: string
  posterImage: ProductImage;
  hoverImage?: ProductImage;
  Additionalinformation?: AdditionalInformation[];
  allSizes?: ISizes[]
  thumbnailHeight?: string
  shippingOptions?: Shipping[];
  selectedShipping?: Shipping;
}

export interface Shipping {
    icon?: string;
    name: string;
    description: string;
    shippingFee: number;
    otherEmiratesFee?: number;
    freeShippingFee?: number;
  }
