import { gql } from "@apollo/client";

export const FETCH_ALL_ECOMERECE = gql`
  query EComerece {
    eComerece {
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
      last_editedBy
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
      createdAt
      updatedAt
      shippingOptions
      status
      category {
        name
        id
        customUrl
      }
      subcategory {
        id
        name
        customUrl
      }
    }
  }
`;

export const FIND_ONE_Accessory = gql`
  query Product($customUrl: String!, $category: String!, $subCategory: String!) {
    single_product_ecomerece(
      customUrl: $customUrl
      category: $category
      subCategory: $subCategory
    ) {
      id
      name
      posterImageUrl
      hoverImageUrl
      productImages
      price
      description
      stock
      discountPrice
      shortDescription
      colors
      sizes
      variant
      DescriptionBullets
      Additionalinformation
      Banners
      shippingOptions
      status
      questions {
        id
        name
        email
        question
        status
        replies
        createdAt
      }
      reviews {
        id
        starRating
        name
        ReviewsDescription
        reviewDate
        posterImageUrl
        productsImage
        status
      }
      category {
        customUrl
      }
      subcategory {
        customUrl
      }
    }
  }
`;
