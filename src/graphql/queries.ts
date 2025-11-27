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
        slug
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
      slug
      status
      subCategories {
        id
        name
        status
        slug
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
      slug
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
      slug
      RecallUrl
      price
      accessories {
        id
        name
        slug
        posterImageUrl
      }
      subcategories {
        id
        name
        slug
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
        slug
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
      slug
      price
      products {
        id
        name
      }
      category {
        id
        name
        slug
        RecallUrl
      }
    }
  }
`;

export const FIND_ONE_CATEGORY = gql`
  query GetCategory($slug: String!) {
    category(slug: $slug) {
      id
      name
      canonicalTag
      metaDescription
      metaTitle
      posterImageUrl
      slug
    }
  }
`;

export const FIND_ONE_MAIN_CATEGORY = gql`
  query GetCategory($slug: String!) {
    category(slug: $slug) {
      id
      name
      posterImageUrl
      slug
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
        slug
        posterImageUrl
        status
        products {
          id
          name
          posterImageUrl
          slug
          status
        }
      }
    }
  }
`;

export const FIND_FURNITURE_CATEGORY = gql`
  query GetCategory($slug: String!) {
    category(slug: $slug) {
      id
      name
      posterImageUrl
      slug
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
        slug
        posterImageUrl
        Banners
        status
        products {
          id
          name
          posterImageUrl
          slug
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
        slug
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
          slug
        }
        subcategory {
          name
          slug
        }
      }
    }
  }
`;

export const FIND_ONE_MAIN_CATEGORY_SEO = gql`
  query GetCategory($slug: String!) {
    category(slug: $slug) {
      posterImageUrl
      slug
      metaTitle
      canonicalTag

      metaDescription
    }
  }
`;

export const FIND_ONE_SUB_CATEGORY = gql`
  query SubCategory($slug: String!, $category: String!) {
    find_one_subcategory(slug: $slug, category: $category) {
      canonicalTag
      metaDescription
      metaTitle
      slug
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
        slug
      }
      products {
        id
        name
        posterImageUrl
        productImages
        slug
        status
      }
      InnersubCategories {
        name
        slug
        catalogue
        products {
          name
          posterImageUrl
          slug
          productImages
          status
        }
      }
    }
  }
`;

export const FIND_ONE_ECOMMERCE_SUB_CATEGORY = gql`
  query SubCategory($slug: String!, $category: String!) {
    find_one_subcategory(slug: $slug, category: $category) {
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
        slug
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
          slug
          status
        }
        subcategory {
          name
          slug
          status
        }
      }
    }
  }
`;

export const FIND_ONE_SUB_CATEGORY_SEO = gql`
  query SubCategory($slug: String!, $category: String!) {
    find_one_subcategory(slug: $slug, category: $category) {
      id
      name
      canonicalTag
      metaDescription
      metaTitle
      posterImageUrl
      slug
    }
  }
`;

export const FIND_ONE_PRODUCT_DETAIL = gql`
  query Product($slug: String!, $category: String!, $subCategory: String!) {
    single_product(slug: $slug, category: $category, subCategory: $subCategory) {
      id
      name
      price
      description
      stock
      posterImageUrl
      discountPrice
      breadCrumb
      slug
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
        slug
      }
      subcategory {
        slug
      }
    }
  }
`;
export const FIND_ONE_PRODUCT = gql`
  query Product($slug: String!, $category: String!, $subCategory: String!) {
    single_product(slug: $slug, category: $category, subCategory: $subCategory) {
      id
      name
      posterImageUrl
      metaTitle
      metaDescription
      canonicalTag
      slug
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
        slug
      }
      subcategory {
        slug
      }
    }
  }
`;

export const FIND_PRODUCT_META = gql`
  query Product($slug: String!, $category: String!, $subCategory: String!) {
    single_product(slug: $slug, category: $category, subCategory: $subCategory) {
      metaTitle
      metaDescription
      canonicalTag
      slug
      posterImageUrl
      category {
        slug
      }
      subcategory {
        slug
      }
    }
  }
`;

export const FIND_ONE_PRODUCT_META = gql`
  query Product($slug: String!, $category: String!, $subCategory: String!) {
    single_product_ecomerece(slug: $slug, category: $category, subCategory: $subCategory) {
      metaTitle
      metaDescription
      canonicalTag
      slug
      posterImageUrl
      category {
        slug
      }
      subcategory {
        slug
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
      slug
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
