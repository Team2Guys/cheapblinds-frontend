import { Product } from "./category";

export interface HeroProps {
  desktopImage: string;
  mobileImage?: string;
  isHome?: boolean;
  className?: string;
  alt?: string;
}

export interface OrderSectionProps {
  reverse?: boolean;
  image1: string;
  image2: string;
  btnText: string;
  btnLink: string;
  className?: string;
  buttonCenter?: boolean;
  sampleSection?: boolean;
}

export interface RelatedProductItem {
  title: string;
  description?: string;
  price?: string;
  image: string;
}

export interface RelatedProductProps {
  title: string;
  description?: string;
  data: Product[];
  category?: string;
  subCategory?: string;
  titleStart?: boolean;
}

export interface SlickSliderProps {
  children: ReactNode;
  slidesToShow?: number;
  responsive?: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
      [key: string]: string | number | boolean | undefined;
    };
  }[];
}

export interface Review {
  rating: number;
  date: string;
  title: string;
  text: string;
  author: string;
}

export interface TestimonialProps {
  reviews: Review[];
  showPaymentInfo?: boolean;
}
