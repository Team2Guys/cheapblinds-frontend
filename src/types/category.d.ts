export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Category {
  id?: string | number;
  name: string;
  description?: string;
  shortDescription?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
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
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
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
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalTag?: string;
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
  parentSubcategoryUrl?: string;
  pattern?: string;
  composition?: string;
  color?: string;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  isMotorized?: boolean;
  motorPrice?: number;
  url?: string;
  categoryUrl?: string;
  subcategoryUrl?: string;
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
  slug?: string;
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
  slug?: string;
  status?: ContentStatus;
}

export interface IProduct {
  id?: string | number;
  name?: string;
  slug?: string;
  status?: ContentStatus;
}

export interface CategoryPageProps {
  categoryName: string;
  categoryUrl: string;
  description: string;
  ProductList: Subcategory | Subcategory[];
}

export interface Orders {
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
  totalAmount: number;
  shippingCost: number;
  notes?: string;
  items: Product[];
  lastEditedBy?: string;
  paymentStatus?: string;
  orderStatus?: string;
  createdAt?: string;
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