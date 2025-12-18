export interface Shipping {
  icon?: string;
  name: string;
  description: string;
  shippingFee: number;
  otherEmiratesFee?: number;
  freeShippingFee?: number;
}

export interface SideBySideMagnifierProps {
  imageSrc: string;
  largeImageSrc: string;
  zoomScale?: number;
  inPlace?: boolean;
  alignTop?: boolean;
  altText?: string;
}

export interface PaymentMethodProps {
  showHeading?: boolean;
  installments: number;
  isCheckout?: boolean;
}
