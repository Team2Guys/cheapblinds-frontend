import { EDIT_CATEGORY, ISUBCATEGORY_EDIT } from "@/types/cat";
import { BlogStatus } from "@/types/general";
import { IProductValues } from "@/types/prod";

export const categoryInitialValues: EDIT_CATEGORY = {
  name: "", //done
  description: "", // done
  shortDescription: "",
  metaDescription: "", //done
  metaTitle: "", //done
  canonicalTag: "", //done
  customUrl: "", //done
  seoSchema: "",
  status: "DRAFT",
};

export const subcategoryInitialValues: ISUBCATEGORY_EDIT = {
  name: "",
  description: "",
  shortDescription: "",
  metaDescription: "",
  metaTitle: "",
  customUrl: "",
  category: "",
  canonicalTag: "",
  status: "DRAFT",
};

export const AddproductsinitialValues: IProductValues = {
  name: "",
  price: 0,
  description: "",
  shortDescription: "",
  stock: 0,
  discountPrice: 0,
  customUrl: "",
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
  customUrl: "",
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
