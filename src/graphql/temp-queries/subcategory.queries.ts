import { gql } from "@apollo/client";

export const GET_SUBCATEGORY_LIST = gql`
  query GetSubcategoryList {
    getSubcategoryList {
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
`;


export const GET_SUBCATEGORY_BY_ID = gql`
  query GetSubcategoryById($id: ID!) {
    getSubcategoryById(id: $id) {
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
      breadCrumb
      seoSchema
      status
      lastEditedBy
    }
  }
`;



export const GET_SUBCATEGORY_BY_URLS = gql`
  query GetSubcategoryByUrls(
    $subcategoryCustomUrl: String!
    $categoryCustomUrl: String!
  ) {
    getSubcategoryByUrls(
      input: {
        subcategoryCustomUrl: $subcategoryCustomUrl
        categoryCustomUrl: $categoryCustomUrl
      }
    ) {
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
`;
