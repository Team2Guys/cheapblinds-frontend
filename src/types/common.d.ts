export interface HerobannerProps {
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
  samplesection?: boolean;
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
  data: RelatedProductItem[];
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
