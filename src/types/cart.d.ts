import { Shipping } from "./prod";

export interface ICart {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  colors: string;
  sizes: string;
  variant: string;
  quantity: number;
  stock: number;
  image?: PropsImage;
  totalPrice: number;
  dimension?: string[];
  selectedShipping?: Shipping;
  shippingOptions?: Shipping[];
}

export interface IWishlist extends ICart {
  sizeName?: string;
  colorName?: string;
}

interface PropsImage {
  imageUrl?: string;
  posterImageUrl?: { imageUrl: string };
  posterImageUrl?: string;
}

export interface SelectOptionProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  CartOptions: {
    id: string;
    title: string;
    features: string[];
    price: string;
  }[];
}
