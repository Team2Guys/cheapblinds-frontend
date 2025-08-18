import { EDIT_CATEGORY, ISUBCATEGORY_EDIT } from "types/cat";
import { BlogStatus } from "types/general";
import { IProductValues } from "types/prod";

export const categoryInitialValues: EDIT_CATEGORY = {
  name: '', //done
  description: '', // done
  short_description: '',
  Meta_Description: '', //done
  Meta_Title: '', //done
  Canonical_Tag: '', //done
  custom_url: "", //done
  seoSchema: "",
  status: 'DRAFT',
};


export const subcategoryInitialValues: ISUBCATEGORY_EDIT = {

  name: '',
  description: '',
  short_description: '',
  Meta_Description: '',
  Meta_Title: '',
  custom_url: "",
  category: "",
  Canonical_Tag: "",
  status: 'DRAFT',
};




export const AddproductsinitialValues: IProductValues = {
  name: '',
  price: 0,
  description: '',
  short_description: '',
  stock: 0,
  discountPrice: 0,
  custom_url: '',
  Meta_Title: '',
  Canonical_Tag: '',
  Meta_Description: '',
  seoSchema: "",
  breadCrum: "",
  status: 'DRAFT',
  category: '',
  subcategory: ''
};

export const AddBlogInitialValues = {
    title: '',
    content: '',
    custom_url: '',
    category: '',
    status: 'DRAFT' as BlogStatus,
    isPublished: false,
    posterImage: undefined,
    last_editedBy: '',
    Canonical_Tag: '',
    Meta_Description: '',
    Meta_Title: '',
    redirectionUrl: '',
  }
