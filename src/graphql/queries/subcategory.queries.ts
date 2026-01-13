import { gql } from "@apollo/client";

export const GET_SUBCATEGORY_LIST_QUERY = gql`
  query GetSubcategoryList {
    subcategoryList {
      id
      name
      categoryId
      description
      shortDescription
      newPath
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      posterImageUrl
      createdAt
      updatedAt
      lastEditedBy
      seoSchema
      status
    }
  }
`;

export const GET_SUBCATEGORY_BY_ID_QUERY = gql`
  query GetSubcategoryById($id: ID!) {
    subcategoryById(id: $id) {
      id
      name
      categoryId
      description
      shortDescription
      newPath
      metaTitle
      metaDescription
      canonicalUrl
      posterImageUrl
      breadcrumb
      seoSchema
      status
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;

export const SUBCATEGORY_BY_PATH = gql`
  query SubcategoryByPath($path: String!) {
    subcategoryByPath(input: { path: $path }) {
      id
      name
      description
      shortDescription
      newPath
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      posterImageUrl
      lastEditedBy
      seoSchema
      status
      products {
        id
        name
        fabricId
        blindTypeId
        sku
        newPath
        price
        posterImageUrl
        minDrop
        maxDrop
        minWidth
        maxWidth
        color
        pattern
        material
        isMotorized
        motorPrice
        status
      }
    }
  }
`;
