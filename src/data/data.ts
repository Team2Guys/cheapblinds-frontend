import { Shipping } from "types/prod";

export const excludedKeys = [
  'BannerText',
  'BannerHeading',
  'salesBannerImage',
  'categoryHeroImages',
  'categoryHeroToptext',
  'categoryHeroHeading',
  'categoryHeroText',
  'categoryFaqs',
  'right_side_Heading',
  'left_side_Text',
  'left_side_image',
  'Product_Section_heading',
  'bottomText',
  'explore_Heading',
  'explore_main_heading',
  'explore_description',
  'professionalServiceImage',
  'Innersubcategory',
  "createdAt",
  "updatedAt",
  "__typename"
];

export const excludedKeysFroProducts = [
  "__typename",
  "DescriptionBullets",
  "Additionalinformation",
  "Questions",
  "materialType",
  "colors",
  "sizes",
  "variant",
  "createdAt",
  "updatedAt",
  "salesBannerImage",
  "selectedShippingOption"

]

export const shippingOption: Shipping[] = [
  { icon: "https://res.cloudinary.com/dckxfl2yn/image/upload/v1744109358/delivery-location_ds2rrt.png", name: 'Standard Shipping', description: 'Within 3-4 days delivery after placing the order.', shippingFee: 0 },
  { icon: "https://res.cloudinary.com/dckxfl2yn/image/upload/v1744109277/delivery-truck_ahxlfz.png", name: 'Next-day Shipping', description: 'Next day delivery for orders placed before 1pm.', shippingFee: 100, otherEmiratesFee: 150, freeShippingFee: 1000 },
  { icon: "https://res.cloudinary.com/dckxfl2yn/image/upload/v1744109241/delivery-lighting_g34a3u.png", name: 'Lightning Shipping', description: 'Same day delivery for orders placed before 1pm.', shippingFee: 100, otherEmiratesFee: 150, freeShippingFee: 1000 }
]