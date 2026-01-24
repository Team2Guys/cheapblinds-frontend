export const CATEGORY_FEATURES_MAP: Record<
  string,
  {
    imageUrl: string;
    name: string;
  }[]
> = {
  "roller-blinds": [
    { imageUrl: "/assets/images/category/Blackout.png", name: "Blackout" },
    { imageUrl: "/assets/images/category/Dimout.png", name: "Dimout" },
    { imageUrl: "/assets/images/category/Visible.png", name: "Visible" },
    { imageUrl: "/assets/images/category/Waterproof.png", name: "Waterproof" },
    { imageUrl: "/assets/images/category/Motorised.png", name: "Motorised" },
    { imageUrl: "/assets/images/category/Express.png", name: "Express delivery" },
  ],

  "roman-blinds": [
    { imageUrl: "/assets/images/category/Blackout.png", name: "Blackout" },
    { imageUrl: "/assets/images/category/Dimout.png", name: "Dimout" },
    { imageUrl: "/assets/images/category/Visible.png", name: "Visible" },
    { imageUrl: "/assets/images/category/Motorised.png", name: "Motorised" },
    { imageUrl: "/assets/images/category/Express.png", name: "Express delivery" },
  ],

  "zebra-blinds": [
    { imageUrl: "/assets/images/category/Dimout.png", name: "Dimout" },
    { imageUrl: "/assets/images/category/Visible.png", name: "Light Filtering" },
    { imageUrl: "/assets/images/category/Motorised.png", name: "Motorised" },
    { imageUrl: "/assets/images/category/Express.png", name: "Express delivery" },
  ],

  "vertical-blinds": [
    { imageUrl: "/assets/images/category/Blackout.png", name: "Blackout" },
    { imageUrl: "/assets/images/category/Dimout.png", name: "Dimout" },
    { imageUrl: "/assets/images/category/Motorised.png", name: "Motorised" },
    { imageUrl: "/assets/images/category/Express.png", name: "Express delivery" },
  ],
};

export const CATEGORY_PDF_MAP: Record<string, { measuring: string; fitting: string }> = {
  "roller-blinds": {
    measuring: "/assets/pdf/roller-measuring.pdf",
    fitting: "/assets/pdf/roller-fitting.pdf",
  },
  "roman-blinds": {
    measuring: "/assets/pdf/roman-measuring.pdf",
    fitting: "/assets/pdf/roman-fitting.pdf",
  },
  "zebra-blinds": {
    measuring: "/assets/pdf/zebra-measuring.pdf",
    fitting: "/assets/pdf/zebra-fitting.pdf",
  },
  "vertical-blinds": {
    measuring: "/assets/pdf/vertical-measuring.pdf",
    fitting: "/assets/pdf/vertical-fitting.pdf",
  },
};
