import { Category, EDIT_CATEGORY, INNERSUBCATEGORY, ISUBCATEGORY } from "./cat";
import { ProductReviews } from "./general";
import { IEcomerece, IProduct } from "./prod";

export interface SubCategoryComponentProps_dashboard {
    subCategories: ISUBCATEGORY[];
    cetagories: Category[];
  }

export interface DASHBOARD_VIEW_SUBCATEGORIES_PROPS {
    setMenuType: React.Dispatch<SetStateAction<string>>;
    seteditCategory?: React.Dispatch<SetStateAction<ISUBCATEGORY | undefined | null>>;
    editCategory?: ISUBCATEGORY | undefined | null;
    subCategories?: ISUBCATEGORY[];
  }

  export interface DASHBOARD_ADD_SUBCATEGORIES_PROPS extends DASHBOARD_VIEW_SUBCATEGORIES_PROPS {
    categoriesList: Category[];

  }

  export interface ReviewProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  editReview?: ProductReviews;
  setEditReview?: React.Dispatch<React.SetStateAction<ProductReviews | undefined>>;
}

  export interface DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS {
    setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
    editProduct?: IProduct | IEcomerece | undefined
    EditProductValue?: EDIT_PRODUCT_PROPS | null | undefined;
    setEditProduct?: React.Dispatch<React.SetStateAction<IProduct | IEcomerece | undefined>>;
    subCategories?: ISUBCATEGORY[];
    categoriesList?: ICategory[];
    products?:IProduct[]
    ecomerece?:boolean
  }


  export interface DASHBOARD_MAINPAGE_PROPS {
    categories: ICategory[], 
    productsData?: IProduct[],
    ecomereceProducts?:IEcomerece[]
    ecomerece?:boolean
  }


  export interface DASHBOARD_MAIN_PRODUCT_PROPS {
    products:(IProduct | IEcomerece)[];
    setProducts: React.Dispatch<SetStateAction<IProduct | IEcomerece[]>>;
    setselecteMenu: React.Dispatch<SetStateAction<string>>;
    setEditProduct: React.Dispatch<SetStateAction<| IEcomerece | undefined>>;
    ecomerece?:boolean
  
  }
  



  export interface BreadcrumbProps  {
    title?: string;
    image?: string;
    slug?: string;
    subcategory?: string;
    altText?:string
    isImagetext?: boolean;
    imageClass?:string
    showTitle?:boolean
    careersName?: string;
    
  };


  export interface productCardProps {
    product: IProduct | EDIT_CATEGORY
    isSoldOut?: boolean;
    isAccessories?: boolean;
    sldier?: boolean;
    features: Feature[];
    categoryData?: ICategory;
    subCategoryFlag?: boolean;
  }

  export interface DASHBOARD_ADD_INNERSUBCATEGORY_PROPS {
    setMenuType: React.Dispatch<SetStateAction<string>>;
    seteditCategory?: React.Dispatch<SetStateAction<INNERSUBCATEGORY | undefined | null>>;
    editCategory?: INNERSUBCATEGORY | undefined | null;
    subCategories?: ISUBCATEGORY[];
    Innersubcategory?: INNERSUBCATEGORY[]
  }