import { Category, EDIT_CATEGORY, ISUBCATEGORY } from "./cat";
import { ProductReviews } from "./general";
import { IEcomerece, IProduct } from "./prod";





export interface DASHBOARD_ADD_SUBCATEGORIES_PROPS extends DASHBOARD_VIEW_SUBCATEGORIES_PROPS {
  categoriesList: Category[];
}

export interface ReviewProps {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  editReview?: ProductReviews;
  setEditReview?: React.Dispatch<React.SetStateAction<ProductReviews | undefined>>;
}







export interface BreadcrumbProps {
  title?: string;
  slug?: string;
  subcategory?: string;
}

export interface productCardProps {
  product: IProduct | EDIT_CATEGORY;
  isSoldOut?: boolean;
  isAccessories?: boolean;
  sldier?: boolean;
  features: Feature[];
  categoryData?: ICategory;
  subCategoryFlag?: boolean;
}
