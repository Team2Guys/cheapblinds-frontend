import { BlogStatus } from "@/types/general";
import { IProductValues } from "@/types/prod";

export const AddproductsinitialValues: IProductValues = {
  name: "",
  price: 0,
  description: "",
  shortDescription: "",
  stock: 0,
  discountPrice: 0,
  slug: "",
  metaTitle: "",
  canonicalTag: "",
  metaDescription: "",
  seoSchema: "",
  breadCrumb: "",
  status: "DRAFT",
  category: "",
  subcategory: "",
};

export const AddBlogInitialValues = {
  title: "",
  content: "",
  slug: "",
  category: "",
  status: "DRAFT" as BlogStatus,
  isPublished: false,
  posterImage: undefined,
  last_editedBy: "",
  canonicalTag: "",
  metaDescription: "",
  metaTitle: "",
  redirectionUrl: "",
};

export const initialRedirctUlrsValues = {
  url: "",
  redirectedUrl: "",
};
