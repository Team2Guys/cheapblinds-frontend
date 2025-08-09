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
              custom_url
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
        custom_url
        status
           subCategories {
            id
            name
            status
              custom_url
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
        custom_url
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
      custom_url
      RecallUrl
      price
        accessories {
      id
      name
      custom_url 
      posterImageUrl
      }
      subcategories {
        id
        name
        custom_url
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
            custom_url
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
      custom_url
      price
      products {
        id
        name
      }
      category {
        id
        name
        custom_url
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
         Canonical_Tag
        Meta_Description
        Meta_Title
            posterImageUrl
            custom_url
  }}

`

export const FIND_ONE_MAIN_CATEGORY = gql`
query GetCategory($customUrl: String!) {
  category(customUrl: $customUrl) {
    id
    name
        posterImageUrl
        custom_url
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
            custom_url
            posterImageUrl
            status
            products {
              id
              name
              posterImageUrl
              custom_url
              status
        }}
  }}

`

export const FIND_FURNITURE_CATEGORY = gql`
query GetCategory($customUrl: String!) {
  category(customUrl: $customUrl) {
    id
    name
        posterImageUrl
        custom_url
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
            custom_url
            posterImageUrl
            Banners
            status
            products {
              id
              name
              posterImageUrl
              custom_url
              price
              discountPrice
              status
        }
      }
  }}

`

export const FETCH_ALL_ECOMMERCE_PAGINATED_PRODUCTS = gql`
mutation PaginatedPrducts($PaginatedPrducts: PaginatedPrducts!) {
    PaginatedPrducts(PaginatedPrducts: $PaginatedPrducts) {
      totalPages
      totalEcomereceProduct
      products {
        id
        name
        posterImageUrl
        custom_url
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
          custom_url
        }
        subcategory {
          name
          custom_url
        }
      }
    }
  }
`;

export const FIND_ONE_MAIN_CATEGORY_SEO = gql`
query GetCategory($customUrl: String!) {
  category(customUrl: $customUrl) {

        posterImageUrl
        custom_url
                Meta_Title
        Canonical_Tag
        
        Meta_Description
   
  }}

`




export const FIND_ONE_SUB_CATEGORY = gql`
query SubCategory($custom_url: String!, $category: String!) {
  find_one_subcategory(custom_url: $custom_url, category: $category) {
      Canonical_Tag
        Meta_Description
        Meta_Title
        custom_url
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
          custom_url
          }
        products {
          id
          name
          posterImageUrl
          productImages
          custom_url
          status
          }  
        InnersubCategories {
          name
          custom_url
          catalogue
          products {
            name
            posterImageUrl
            custom_url
            productImages
            status
            }
          }

  }}
`

export const FIND_ONE_ECOMMERCE_SUB_CATEGORY = gql`
query SubCategory($custom_url: String!, $category: String!) {
  find_one_subcategory(custom_url: $custom_url, category: $category) {
        Banners
        status
        EcomereceProducts {
        id
        name
        price
        description
        stock
        discountPrice
        short_description
        posterImageUrl
        hoverImageUrl
        productImages
        custom_url
        breadCrum
        Banners
        DescriptionBullets
        Additionalinformation
        Questions
        materialType
        colors
        sizes
        variant
        Canonical_Tag
        Meta_Description
        Meta_Title
        shippingOptions
        status
        category {
            name
            custom_url
            status
          }
        subcategory {
            name
            custom_url
            status
          }
        }  
  }}
`


export const FIND_ONE_SUB_CATEGORY_SEO = gql`
query SubCategory($custom_url: String!, $category: String!) {
  find_one_subcategory(custom_url: $custom_url, category: $category) {
        id
    name
         Canonical_Tag
        Meta_Description
        Meta_Title
            posterImageUrl
            custom_url
  }}

`


export const FIND_ONE_PRODUCT_DETAIL = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!) {
  single_product(custom_url: $custom_url, category:$category,subCategory:$subCategory) {
       id
        name
        price
        description
        stock
        posterImageUrl
        discountPrice
        breadCrum
        custom_url
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
            custom_url
          }
        subcategory {
            custom_url
          }
  }}

`
export const FIND_ONE_PRODUCT = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!) {
  single_product(custom_url: $custom_url, category:$category,subCategory:$subCategory) {
    id
    name
        posterImageUrl
        Meta_Title
        Meta_Description
        Canonical_Tag
        custom_url
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
            custom_url
        }
        subcategory {
            custom_url
        }
  }}

`

export const FIND_PRODUCT_META = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!) {
  single_product(custom_url: $custom_url, category:$category,subCategory:$subCategory) {
      Meta_Title
      Meta_Description
      Canonical_Tag
      custom_url
      posterImageUrl
      category {
          custom_url
      }
      subcategory {
          custom_url
      }
  }}

`

export const FIND_ONE_PRODUCT_META = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!) {
  single_product_ecomerece(custom_url: $custom_url, category:$category,subCategory:$subCategory) {
        Meta_Title
        Meta_Description
        Canonical_Tag
        custom_url
        posterImageUrl
        category {
            custom_url
        }
        subcategory {
            custom_url
        }
  }}

`


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
        totalAccessories
        totalorders
        appointments
        ecomereceProducts
        redirecturls
        blogs
        blogs_comments
        jobs
        jobApplication
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
        custom_url
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



// Admins
export const GET_ALL_ADMINS = gql`
  query Admins {
    admins {
      id
      fullname
      email
      password
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
`