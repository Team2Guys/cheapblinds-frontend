import { gql } from "@apollo/client";

// Get all subcategories
export const GET_SUBCATEGORY_LIST = gql`
  query GetSubcategoryList {
    getSubcategoryList {
      status
      message
      data {
        id
        name
        categoryId
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        createdAt
        updatedAt
        lastEditedBy
        breadCrumb
        seoSchema
        status
      }
    }
  }
`;

// Get single subcategory by ID
export const GET_SUBCATEGORY_BY_ID = gql`
  query GetSubcategoryById($input: GetSubcategoryByIdInput!) {
    getSubcategoryById(input: $input) {
      status
      message
      data {
        id
        name
        categoryId
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;


export const GET_SUBCATEGORY_BY_URLS = gql`
  query GetSubcategoryByUrls($input: GetSubcategoryByUrlsInput!) {
    getSubcategoryByUrls(input: $input) {
      status
      message
      data {
        id
        name
        description
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        breadCrumb
        thumbnailUrl
        lastEditedBy
        seoSchema
        status
        products {
          id
          name
          customUrl
          price
          discountPrice
          thumbnailUrl
        }
      }
    }
  }
`;