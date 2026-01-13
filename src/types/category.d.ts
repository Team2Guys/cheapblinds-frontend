import { Product } from "./category.d";
export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Category {
  id?: string | number;
  name: string;
  description?: string;
  shortDescription?: string;
  newPath?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  breadCrumb?: string;
  posterImageUrl?: string;
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
  newPath?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  breadCrumb?: string;
  posterImageUrl?: string;
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
  fabricId?: string;
  blindTypeId?: string;
  sku?: string;
  description?: string;
  shortDescription?: string;
  newPath?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  breadcrumb?: string;
  posterImageUrl?: string;
  productImages?: string[];
  lastEditedBy?: string | null;
  seoSchema?: string;
  price?: number;
  additionalInfo?: string;
  measuringGuide?: string;
  categoryId?: string;
  subcategoryId?: string;
  category?: Category;
  subcategory?: Subcategory;
  status?: ContentStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  subcategoryName?: string;
  pattern?: string;
  material?: string;
  color?: string;
  minDrop?: number;
  maxDrop?: number;
  minWidth?: number;
  maxWidth?: number;
  isMotorized?: boolean;
  motorPrice?: number;
  url?: string;
  options?: ProductOptions;
}

export interface productImage {
  imagesrc: string;
  altText: string;
  publicId: string;
}

export interface Category_Page {
  id?: string | number;
  name?: string;
  description?: string;
  newPath?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  breadCrumb?: string;
  seoSchema?: string;
  status?: ContentStatus;
  products?: IProduct[];
  subcategories?: ISubcategory[];
}
export interface ISubcategory {
  id?: string | number;
  name?: string;
  newPath?: string;
  status?: ContentStatus;
}

export interface IProduct {
  id?: string | number;
  name?: string;
  newPath?: string;
  status?: ContentStatus;
}

export interface CategoryPageProps {
  categoryName: string;
  description: string;
  ProductList: Subcategory | Subcategory[];
}

export interface addressProps {
  id?: string;
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string | null;
  city?: string;
  address?: string;
  addressType?: string;
  orderStatus?: string;
  createdAt?: string;
}

export interface NewsletterProps {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __typename?: string;
}

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  role: string;
  addresses?: addressProps[] | null | undefined;
  defaultBillingAddressId?: string | null | undefined;
  defaultShippingAddressId?: string | null | undefined;
  defaultBillingAddress?: addressProps | null | undefined;
  defaultShippingAddress?: addressProps | null | undefined;
  addresses?: addressProps[];
  createdAt: string;
  updatedAt: string;
}

export interface GetPricingInput {
  drop: number;
  width: number;
  fabricId: number;
  blindTypeId: number;
}

interface FabricPrice {
  UID: string;
  FabricID: string;
  SellPrice: number;
  Tax_amount: number;
  TotalSalesAmt: number;
  TradeType: string;
  TaxPercentage: number;
}

export interface OptionsPrice {
  UID: string;
  Blindtypeid: string;
  BlindTypeDescription: string;
  OptionGroup_ID: string;
  OptionGroup: string;
  ChoiceCode: string;
  ChoiceDescription?: string | null;
  ChoiceID: string;
  SalesPrice: number;
}

export interface Orders {
  id?: string;
  userId: string;
  shippingAddress: shipAddress;
  billingAddress: shipAddress;
  shipToDifferent: boolean;
  totalAmount: number;
  shippingCost: number;
  notes?: string;
  orderItems: WishlistItems[] | CartItems[];
  lastEditedBy?: string;
  paymentStatus?: string;
  orderStatus?: string;
  createdAt?: string;
}

export interface shipAddress {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string | null;
  city?: string;
  address?: string;
}

export interface WishlistItems {
  id?: string | number;
  name: string;
  fabricId?: string;
  blindTypeId?: string;
  sku?: string;
  newPath?: string;
  posterImageUrl?: string;
  price?: number;
  status?: ContentStatus;
  color?: string;
  isMotorized?: boolean;
  motorPrice?: number;
}

export interface CartItemOptions {
  headrailType?: string;
  stackingStyle?: string;
  lining?: string;
  chainControl?: string;
  chainSide?: string;
}

export interface CartItems {
  id?: string | number;
  name: string;

  fabricId?: string;
  blindTypeId?: string;
  sku?: string;
  newPath?: string;
  posterImageUrl?: string;

  price?: number;
  subPrice?: number;
  finalPrice?: number;
  status?: ContentStatus;

  color?: string;

  isMotorized?: boolean;
  motorPrice?: number;
  width?: string;
  drop?: string;
  unit?: string;
  recessType?: string;

  options?: CartItemOptions;

  quantity?: number; // NEW: quantity for merged items
}
