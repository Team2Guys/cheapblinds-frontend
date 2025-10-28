
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

export const checkboxAdminData = [
  { name: 'canAddProduct', label: 'Can Add Product' },
  { name: 'canEditProduct', label: 'Can Edit Product' },
  { name: 'canDeleteProduct', label: 'Can Delete Product' },
  { name: 'canVeiwTotalproducts', label: 'Can View Products' },

  { name: 'canAddCategory', label: 'Can Add Category' },
  { name: 'canDeleteCategory', label: 'Can Delete Category' },
  { name: 'canEditCategory', label: 'Can Edit Category' },
  { name: 'canVeiwTotalCategories', label: 'Can View Categories' },

  { name: 'canAddSubCategory', label: 'Can Add Sub Category' },
  { name: 'canDeleteSubCategory', label: 'Can Delete Sub Category' },
  { name: 'canEditSubCategory', label: 'Can Edit Sub Category' },
  { name: 'canVeiwTotalSubCategories', label: 'Can View Sub Categories' },

  { name: 'canAddBlog', label: 'Can Add Blog' },
  { name: 'canDeleteBlog', label: 'Can Delete Blog' },
  { name: 'canEditBlog', label: 'Can Edit Blog' },
  { name: 'canVeiwTotalBlog', label: 'Can View Blogs' },

  { name: 'canAddRedirecturls', label: 'Can Add Redirect URLs' },
  { name: 'canDeleteRedirecturls', label: 'Can Delete Redirect URLs' },
  { name: 'canEditRedirecturls', label: 'Can Edit Redirect URLs' },
  { name: 'canVeiwTotalRedirecturls', label: 'Can View Redirect URLs' },

  { name: 'canCheckProfit', label: 'Can Check Profit' },
  { name: 'canCheckRevenue', label: 'Can Check Revenue' },
  { name: 'canCheckVisitors', label: 'Can Check Visitors' },

  { name: 'canViewUsers', label: 'Can View Users' },
  { name: 'canViewSales', label: 'Can View Sales' },
  { name: 'canVeiwAdmins', label: 'Can View Admins' },

  { name: 'canViewAppointments', label: 'Can View Appointments' },
];


export const categoryFeatures = [
  {
    imageUrl: '/assets/images/category/Blackout.png',
    name: 'Blackout'
  },
  {
    imageUrl: '/assets/images/category/Dimout.png',
    name: 'Dimout'
  },
  {
    imageUrl: '/assets/images/category/Visible.png',
    name: 'Visible'
  },
  {
    imageUrl: '/assets/images/category/Waterproof.png',
    name: 'Waterproof'
  },
  {
    imageUrl: '/assets/images/category/Motorised.png',
    name: 'Motorised'
  },
  {
    imageUrl: '/assets/images/category/Express.png',
    name: 'Express delivery'
  },
]

export const products = [
  {
    category: {
      name: "Roller Blinds",
      custom_url: "rollar-blinds"
    },
    name: "Blackout Roller Blinds",
    custom_Url: 'blackout',
    delivery: "Same Day Express Delivery",
    order_by: "3pm",
    deliveryImageUrl: {
      imageUrl: "/assets/images/category/filter-lighting.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
    price: "299.25",
    posterImageUrl: {
      imageUrl: "/assets/images/product/blackout.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
    colorCode: "E0D5C6",
    windowImage: {
      imageUrl: "/assets/images/product/blackour-window.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
  },
  {
    category: {
      name: "Roller Blinds",
      custom_url: "rollar-blinds"
    },
    name: "Sheer",
    delivery: "Same Day Express Delivery",
    order_by: "3pm",
    deliveryImageUrl: {
      imageUrl: "/assets/images/category/filter-lighting.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
    price: "299.25",
    posterImageUrl: {
      imageUrl: "/assets/images/product/sheer.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
    colorCode: "E0D5C6",
    windowImage: {
      imageUrl: "/assets/images/product/sheer-window.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
  },
  {
    category: {
      name: "Roller Blinds",
      custom_url: "rollar-blinds"
    },
    name: "Dim-Out",
    delivery: "Same Day Express Delivery",
    order_by: "3pm",
    deliveryImageUrl: {
      imageUrl: "/assets/images/category/filter-lighting.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
    price: "299.25",
    posterImageUrl: {
      imageUrl: "/assets/images/product/dim-out.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
    colorCode: "E0D5C6",
    windowImage: {
      imageUrl: "/assets/images/product/dim-window.png",
      public_id: "ydsgigas",
      altText: "poster image",
    },
  }
]