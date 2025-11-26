import { gql } from "@apollo/client";

// Get all categories
export const GET_CATEGORY_LIST = gql`
  query GetCategoryList {
    getCategoryList {
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
`;


export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      id
      name
      description
      shortDescription
      customUrl
      metaTitle
      metaDescription
      canonicalTag
      thumbnailUrl
      createdAt
      updatedAt
      seoSchema
      breadCrumb
      status
      lastEditedBy
    }
  }
`;


export const GET_CARD_CATEGORY = gql`
  query GetCategoryList {
    getCategoryList {
      id
      name
      status
      customUrl
      thumbnailUrl
    }
  }
`;

export const GET_CATEGORY_BY_CUSTOM_URL = gql`
  query GetCategoryByCustomUrl($customUrl: String!) {
    getCategoryByUrl(input: { customUrl: $customUrl }) {
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
`;
