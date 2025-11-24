import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST = gql`
  query GetProductList {
    getProductList {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        breadCrumb
        thumbnailUrl
        productImages
        lastEditedBy
        seoSchema
        price
        discountPrice
        stock
        status
        categoryId
        subcategoryId
        category {
          id
          name
          customUrl
        }
        subcategory {
          id
          name
          customUrl
        }
        additionalInfo
        measuringGuide
        updatedAt
        createdAt
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($input: GetProductByIdInput!) {
    getProductById(input: $input) {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        breadCrumb
        thumbnailUrl
        productImages
        lastEditedBy
        seoSchema
        price
        discountPrice
        stock
        status
        categoryId
        subcategoryId
        category {
          id
          name
          customUrl
        }
        subcategory {
          id
          name
          customUrl
        }
        additionalInfo
        measuringGuide
        updatedAt
        createdAt
      }
    }
  }
`;

export const GET_CARD_PRODUCT = gql`
  query GetProductList {
    getProductList {
      status
      message
      data {
        id
        name
        customUrl
        breadCrumb
        thumbnailUrl
        price
        discountPrice
        stock
        status
        category {
          id
          name
          customUrl
        }
        subcategory {
          id
          name
          customUrl
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_URLS = gql`
  query GetProductByUrls(
    $categoryCustomUrl: String!
    $subcategoryCustomUrl: String!
    $productCustomUrl: String!
  ) {
    getProductByUrls(
      input: {
        categoryCustomUrl: $categoryCustomUrl
        subcategoryCustomUrl: $subcategoryCustomUrl
        productCustomUrl: $productCustomUrl
      }
    ) {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        categoryId
        subcategoryId
        thumbnailUrl
        productImages
        price
        discountPrice
        stock
        metaTitle
        metaDescription
        canonicalTag
        breadCrumb
        seoSchema
        additionalInfo
        measuringGuide
        status
        lastEditedBy
      }
    }
  }
`;
