import { EDIT_CATEGORY, INNERSUBCATEGORY, ISUBCATEGORY_EDIT } from "types/cat";
import { IProductValues } from "types/prod";

export const categoryInitialValues: EDIT_CATEGORY = {
  name: '', //done
  description: '', // done
  Meta_Description: '', //done
  Meta_Title: '', //done
  Canonical_Tag: '', //done
  custom_url: "", //done
  topHeading: "", //done
  categoryHeroText: [],
  categoryFaqs: [],
  categoryText: [],
  paras: [],
  categoryHeroToptext: "", //done
  categoryHeroHeading: "",
  leftHeading: "",
  Heading: "",
  bottomText: "",
  bodyHeading: "",
  bodyMainHeading: "",
  Bannerdiscount: "",
  salesBannerHeading: "",
  bodyText: "",
  paraText: "",
  explore_Heading: "",
  explore_main_heading: "",
  explore_description: "",
  seoSchema: "",
  Bannercounter: '',
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
  categoryHeroHeading: '',

  categoryHeroText: [],
  categoryFaqs: [],
  categoryHeroImages: [],
  categoryText: [],

};

export const innerSubcategoryInitialValues: INNERSUBCATEGORY = {

  name: '',
  custom_url: "",
};



export const AddproductsinitialValues: IProductValues = {
  name: '',
  price: 0,
  description: '',
  stock: 0,
  discountPrice: 0,
  custom_url: '',
  Meta_Title: '',
  Canonical_Tag: '',
  Meta_Description: '',
  seoSchema: "",
  explore_description: "",
  explore_main_heading: "",
  explore_Heading: "",
  bottomText: "",
  Product_Section_heading: "",
  left_side_Text: [],
  right_side_Heading: "",
  categoryFaqs: [],
  categoryHeroText: [],
  categoryHeroHeading: "",
  BannerHeading: "",
  categoryHeroToptext: "",
  BannerText: "",
  breadCrum: "",
  DescriptionBullets: [],
  Additionalinformation: [],
  Questions: [],
  materialType: [],
  colors: [],
  sizes: [],
  variant:[],
};