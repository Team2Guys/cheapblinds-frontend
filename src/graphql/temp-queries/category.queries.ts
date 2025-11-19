import { gql } from "@apollo/client";

// Get all categories
export const GET_CATEGORY_LIST = gql`
  query GetCategoryList {
    getCategoryList {
      status
      message
      data {
        id
        name
        description
        shortDescription
        breadCrumb
        seoSchema
        status
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        lastEditedBy
        createdAt
        updatedAt
      }
    }
  }
`;

// Get single category by ID
export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($input: GetCategoryByIdInput!) {
    getCategoryById(input: $input) {
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
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CARD_CATEGORY = gql`
  query GetCategoryList {
    getCategoryList {
      status
      message
      data {
        id
        name
        status
        customUrl
        thumbnailUrl
      }
    }
  }
`;

export const GET_CATEGORY_BY_CUSTOM_URL = gql`
  query GetCategoryByCustomUrl($customUrl: String!) {
    getCategoryByCustomUrl(input: { customUrl: $customUrl }) {
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
        seoSchema
        status
        subcategories {
          id
          name
          customUrl
            products {
              id
              name
              customUrl
              price
              discountPrice
            }
        }
      }
    }
  }
`;
