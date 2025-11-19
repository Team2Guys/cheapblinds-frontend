import { gql } from "@apollo/client";

export const FETCH_GALLERY_CATEGORIES = gql`
  query Categories {
    categories {
      name
      id
      status
      products {
        id
        name
        posterImageUrl
        productImages
        customUrl
        status
      }
      subCategories {
        id
        name
        status
      }
    }
  }
`;

export const FETCH_ALL_CATEGORIES_HEADER = gql`
  query Categories {
    categories {
      id
      name
      customUrl
      status
      subCategories {
        id
        name
        status
        customUrl
        posterImageUrl
      }
    }
  }
`;

export const FETCH_ALL_CATEGORIES_HOME = gql`
  query Categories {
    categories {
      id
      name
      customUrl
      status
      posterImageUrl
    }
  }
`;

export const FETCH_ALL_APPOINTMENTS = gql`
  query Get_Appointments {
    Get_Appointments {
      id
      phoneNumber
      email
      name
      location
      whatsApp
      message
      subCategories
    }
  }
`;

export const FETCH_HEADER_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      customUrl
      RecallUrl
      price
      accessories {
        id
        name
        customUrl
        posterImageUrl
      }
      subcategories {
        id
        name
        customUrl
        posterImageUrl
        price
        sizes
      }
      products {
        id
        name
        price
        discountPrice
        stock
        posterImageUrl
      }
      recalledSubCats {
        id
        name
        customUrl
        posterImageUrl
        sizes
        price
        category {
          RecallUrl
        }
      }
    }
  }
`;
export const FETCHSUBCAT = gql`
  query SubCategories {
    subCategories {
      id
      name
      posterImageUrl
      customUrl
      price
      products {
        id
        name
      }
      category {
        id
        name
        customUrl
        RecallUrl
      }
    }
  }
`;

export const FIND_ONE_CATEGORY = gql`
  query GetCategory($customUrl: String!) {
    category(customUrl: $customUrl) {
      id
      name
      canonicalTag
      metaDescription
      metaTitle
      posterImageUrl
      customUrl
    }
  }
`;

export const FIND_ONE_MAIN_CATEGORY = gql`
  query GetCategory($customUrl: String!) {
    category(customUrl: $customUrl) {
      id
      name
      posterImageUrl
      customUrl
      Banners
      BannerText
      BannerHeading
      categoryHeroImages
      categoryHeroToptext
      categoryHeroHeading
      categoryHeroText
      categoryFaqs
      bodyHeading
      bodyMainHeading
      bodyText
      topHeading
      topDescription
      categoryText
      Product_Section_heading
      bottomText
      Heading
      paras
      explore_Heading
      explore_main_heading
      explore_description
      leftHeading
      status
      subCategories {
        id
        name
        customUrl
        posterImageUrl
        status
        products {
          id
          name
          posterImageUrl
          customUrl
          status
        }
      }
    }
  }
`;

export const FIND_FURNITURE_CATEGORY = gql`
  query GetCategory($customUrl: String!) {
    category(customUrl: $customUrl) {
      id
      name
      posterImageUrl
      customUrl
      Banners
      Bannercounter
      Bannerdiscount
      salesBannerHeading
      paraText
      salesBannerImage
      status
      subCategories {
        id
        name
        customUrl
        posterImageUrl
        Banners
        status
        products {
          id
          name
          posterImageUrl
          customUrl
          price
          discountPrice
          status
        }
      }
    }
  }
`;

export const FETCH_ALL_ECOMMERCE_PAGINATED_PRODUCTS = gql`
  mutation PaginatedPrducts($PaginatedPrducts: PaginatedPrducts!) {
    PaginatedPrducts(PaginatedPrducts: $PaginatedPrducts) {
      totalPages
      totalEcomereceProduct
      products {
        id
        name
        posterImageUrl
        customUrl
        price
        discountPrice
        stock
        materialType
        colors
        variant
        sizes
        productImages
        Additionalinformation
        shippingOptions
        createdAt
        category {
          name
          customUrl
        }
        subcategory {
          name
          customUrl
        }
      }
    }
  }
`;

export const FIND_ONE_MAIN_CATEGORY_SEO = gql`
  query GetCategory($customUrl: String!) {
    category(customUrl: $customUrl) {
      posterImageUrl
      customUrl
      metaTitle
      canonicalTag

      metaDescription
    }
  }
`;

export const FIND_ONE_SUB_CATEGORY = gql`
  query SubCategory($customUrl: String!, $category: String!) {
    find_one_subcategory(customUrl: $customUrl, category: $category) {
      canonicalTag
      metaDescription
      metaTitle
      customUrl
      Banners
      BannerText
      BannerHeading
      categoryHeroImages
      categoryHeroToptext
      categoryHeroHeading
      categoryHeroText
      categoryFaqs
      leftHeading
      explore_Heading
      explore_main_heading
      explore_description
      bodyHeading
      bodyMainHeading
      bodyText
      collectionMainHeading
      collectionHeading
      QualityHeadings
      QualityText
      QualityImages
      CustomText
      Product_Section_heading
      bottomText
      categoryText
      status
      category {
        customUrl
      }
      products {
        id
        name
        posterImageUrl
        productImages
        customUrl
        status
      }
      InnersubCategories {
        name
        customUrl
        catalogue
        products {
          name
          posterImageUrl
          customUrl
          productImages
          status
        }
      }
    }
  }
`;

export const FIND_ONE_ECOMMERCE_SUB_CATEGORY = gql`
  query SubCategory($customUrl: String!, $category: String!) {
    find_one_subcategory(customUrl: $customUrl, category: $category) {
      Banners
      status
      EcomereceProducts {
        id
        name
        price
        description
        stock
        discountPrice
        shortDescription
        posterImageUrl
        hoverImageUrl
        productImages
        customUrl
        breadCrumb
        Banners
        DescriptionBullets
        Additionalinformation
        Questions
        materialType
        colors
        sizes
        variant
        canonicalTag
        metaDescription
        metaTitle
        shippingOptions
        status
        category {
          name
          customUrl
          status
        }
        subcategory {
          name
          customUrl
          status
        }
      }
    }
  }
`;

export const FIND_ONE_SUB_CATEGORY_SEO = gql`
  query SubCategory($customUrl: String!, $category: String!) {
    find_one_subcategory(customUrl: $customUrl, category: $category) {
      id
      name
      canonicalTag
      metaDescription
      metaTitle
      posterImageUrl
      customUrl
    }
  }
`;

export const FIND_ONE_PRODUCT_DETAIL = gql`
  query Product($customUrl: String!, $category: String!, $subCategory: String!) {
    single_product(customUrl: $customUrl, category: $category, subCategory: $subCategory) {
      id
      name
      price
      description
      stock
      posterImageUrl
      discountPrice
      breadCrumb
      customUrl
      Banners
      BannerText
      BannerHeading
      categoryHeroImages
      categoryHeroToptext
      categoryHeroHeading
      categoryHeroText
      categoryFaqs
      explore_Heading
      explore_main_heading
      explore_description
      Product_Section_heading
      productImages
      bottomText
      status
      category {
        customUrl
      }
      subcategory {
        customUrl
      }
    }
  }
`;
export const FIND_ONE_PRODUCT = gql`
  query Product($customUrl: String!, $category: String!, $subCategory: String!) {
    single_product(customUrl: $customUrl, category: $category, subCategory: $subCategory) {
      id
      name
      posterImageUrl
      metaTitle
      metaDescription
      canonicalTag
      customUrl
      Banners
      BannerText
      BannerHeading
      categoryHeroImages
      explore_Heading
      explore_main_heading
      explore_description
      categoryHeroToptext
      categoryHeroHeading
      categoryHeroText
      left_side_image
      left_side_Text
      categoryFaqs
      productImages
      status
      category {
        customUrl
      }
      subcategory {
        customUrl
      }
    }
  }
`;

export const FIND_PRODUCT_META = gql`
  query Product($customUrl: String!, $category: String!, $subCategory: String!) {
    single_product(customUrl: $customUrl, category: $category, subCategory: $subCategory) {
      metaTitle
      metaDescription
      canonicalTag
      customUrl
      posterImageUrl
      category {
        customUrl
      }
      subcategory {
        customUrl
      }
    }
  }
`;

export const FIND_ONE_PRODUCT_META = gql`
  query Product($customUrl: String!, $category: String!, $subCategory: String!) {
    single_product_ecomerece(
      customUrl: $customUrl
      category: $category
      subCategory: $subCategory
    ) {
      metaTitle
      metaDescription
      canonicalTag
      customUrl
      posterImageUrl
      category {
        customUrl
      }
      subcategory {
        customUrl
      }
    }
  }
`;

export const GET_ADMIN_DATA = gql`
  query Admin {
    admin {
      id
      fullname
      email
      canAddProduct
      canEditProduct
      canDeleteProduct
      canAddCategory
      canDeleteCategory
      canEditCategory
      canCheckProfit
      canCheckRevenue
      canCheckVisitors
      canViewUsers
      canViewSales
      canVeiwAdmins
      canVeiwTotalproducts
      canVeiwTotalCategories
      posterImageUrl
      role
    }
  }
`;

export const GET_ALL_RECORDS = gql`
  query GET_ALL_RECORDS {
    GET_ALL_RECORDS {
      totalSubCategories
      totalProducts
      totalCategories
      totalAdmins
      totalUsers
      Total_abandant_order
      totalorders
      appointments
      redirecturls
      blogs
      blogs_comments
    }
  }
`;

export const FIND_ONE_USER_ORDER = gql`
  query UsersOrders($email: String!) {
    usersOrders(email: $email) {
      firstName
      lastName
      email
      country
      city
      address
      note
      phone
      emirate
      orderId
      transactionDate
      shipmentFee
      totalPrice
      pay_methodType
      paymethod_sub_type
      cardLastDigits
      checkout
      paymentStatus
      isRefund
      success
      pending
      isfreesample
      currency
      is3DSecure
      checkoutDate
      shippingMethod
      products {
        id
        name
        price
        discountPrice
        colors
        sizes
        variant
        stock
        quantity
        totalPrice
        image
        dimension
      }
    }
  }
`;

export const ORDER_QUERY = gql`
  query Order($orderId: String!) {
    Order(orderId: $orderId) {
      firstName
      lastName
      email
      country
      city
      address
      phone
      orderId
      totalPrice
      paymentStatus
      shipmentFee
      products {
        id
        name
        price
        discountPrice
        colors
        sizes
        variant
        stock
        quantity
        totalPrice
        image
        dimension
      }
      totalPrice
      shippingMethod
      transactionDate
      checkoutDate
      address
      currency
      pay_methodType
      paymethod_sub_type
      cardLastDigits
    }
  }
`;

export const GET_REVIEWS = gql`
  query get_All_Reviews {
    get_All_Reviews {
      id
      name
      posterImageUrl

      starRating
      ReviewsDescription
      reviewDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_Redirecturls = gql`
  query findAllRedirecturls {
    findAllRedirecturls {
      id
      url
      redirectedUrl
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_ALL_INNER_SUB_CATEGORIES = gql`
  query Innersubcategories {
    Innersubcategories {
      name
      customUrl
      subCategoryId
      id
      createdAt
      updatedAt
      catalogue

      subCategory {
        id
        name
      }
    }
  }
`;

export const FETCH_ALL_ORDERS = gql`
  query AllOrders {
    AllOrders {
      firstName
      lastName
      email
      country
      city
      address
      note
      phone
      emirate
      orderId
      transactionDate
      shipmentFee
      totalPrice
      checkout
      paymentStatus
      isRefund
      success
      pending
      currency
      is3DSecure
      checkoutDate
      shippingMethod
      pay_methodType
      products {
        id
        name
        price
        discountPrice
        colors
        sizes
        variant
        stock
        quantity
        totalPrice
        image
        dimension
      }
    }
  }
`;

