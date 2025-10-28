import { EDIT_CATEGORY, ISUBCATEGORY_EDIT } from "./cat";
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
  resource_type?: string;
  location?: string;
  Material?: string;
  imagesrc?: string;
}

export interface Order {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  note: string;
  phone: string;
  emirate: string;
  orderId: string;
  transactionDate: string;
  shipmentFee: number;
  totalPrice: number;
  pay_methodType: string;
  paymethod_sub_type: string;
  cardLastDigits: number;
  checkout: boolean;
  paymentStatus: boolean;
  isRefund: boolean;
  success: boolean;
  pending: boolean;
  currency: string;
  is3DSecure: string;
  checkoutDate: string;
  products: orderProduct[];
  shippingMethod: Shipping;
  __typename: string;
}
export interface AdditionalInformation {
  name: string;
  detail?: string;
  price?: string;
  discountPrice?: string;
  stock?: number;
  code?: string;
  dimension?: string;
}

export interface ISizes {
  name?: string;
  variantName: string;
  price?: string;
  discountPrice?: string;
  stock?: string;
  dimension?: string;
}

interface CommonProductsTypes {
  id: number;
  name: string | undefined;
  price: number;
  short_description?: string;
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
  category: EDIT_CATEGORY;
  subcategory: ISUBCATEGORY_EDIT;
  categoryId?: number;
  subCategoryId?: number;
  __typename?: string;
}

export interface IProduct extends CommonProductsTypes {
  type?: "product";
  subcategory?: ISUBCATEGORY_EDIT;
  status?: BlogStatus;
}

export interface Shipping {
  icon: string;
  name: string;
  description: string;
  shippingFee: number;
  otherEmiratesFee?: number;
  freeShippingFee?: number;
}

export interface IProductValues
  extends Omit<CommonProductsTypes, "posterImageUrl" | "category" | "subcategory">,
    IProduct {
  hoverImageUrl?: ProductImage;
  productImages?: ProductImage[];
  createdAt?: Date;
  updatedAt?: Date;
  Banners?: ProductImage;
  category?: string | number;
  subcategory?: string | number;
  id?: number;
  posterImageUrl?: ProductImage;
  type?: string;
}

export interface IProductDetail {
  id?: string;
  name?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  description: string;
  DescriptionBullets: AdditionalInformation[];
  colors?: AdditionalInformation[];
  sizes: ISizes[];
  variant: AdditionalInformation[];
  images?: ProductImage[];
  AllproductData?: IEcomerece[];
  sizeParam?: string;
  filterParam?: string;
  posterImage: ProductImage;
  hoverImage?: ProductImage;
  Additionalinformation?: AdditionalInformation[];
  allSizes?: ISizes[];
  thumbnailHeight?: string;
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

export interface SideBySideMagnifierProps {
  imageSrc: string;
  largeImageSrc: string;
  zoomScale?: number;
  inPlace?: boolean;
  alignTop?: boolean;
  altText?: string;
}

export interface PaymentMethodProps {
  showheading?: boolean
  installments: number
}