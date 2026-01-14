import { gql } from "@apollo/client";

export const CATEGORY_LIST = gql`
  query CategoryList {
    categoryList {
      id
      name
      description
      shortDescription
      breadcrumb
      seoSchema
      status
      newPath
      metaTitle
      metaDescription
      canonicalUrl
      posterImageUrl
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY_BY_ID_QUERY = gql`
  query CategoryById($id: ID!) {
    categoryById(id: $id) {
      id
      name
      description
      shortDescription
      newPath
      metaTitle
      metaDescription
      canonicalUrl
      posterImageUrl
      createdAt
      updatedAt
      seoSchema
      breadcrumb
      status
      lastEditedBy
    }
  }
`;

export const CARD_CATEGORY = gql`
  query GetCategoryList {
    categoryList {
      id
      name
      status
      newPath
      posterImageUrl
      createdAt
      updatedAt
    }
  }
`;

export const CATEGORY_BY_PATH = gql`
  query CategoryByPath($path: String!) {
    categoryByPath(input: { path: $path }) {
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
      createdAt
      updatedAt

      subcategories {
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
        createdAt
        updatedAt

        products {
          id
          name
          newPath
          blindTypeId
          fabricId
          sku
          newPath
          posterImageUrl
          price
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
  }
`;
