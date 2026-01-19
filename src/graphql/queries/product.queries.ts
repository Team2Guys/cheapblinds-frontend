import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST_QUERY = gql`
  query ProductList {
    productList {
      id
      categoryId
      subcategoryId
      fabricId
      blindTypeId
      sku
      name
      newPath
      shortDescription
      description
      posterImageUrl
      productImages
      price
      motorPrice
      minDrop
      maxDrop
      minWidth
      maxWidth
      color
      pattern
      material
      isMotorized
      additionalInfo
      measuringGuide
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      seoSchema
      status
      category {
        id
        name
        newPath
      }
      subcategory {
        id
        name
        newPath
      }
      updatedAt
      createdAt
    }
  }
`;

export const CARD_PRODUCT = gql`
  query GetProductList {
    productList {
      id
      name
      newPath
      breadcrumb
      posterImageUrl
      price
      status
      category {
        id
        name
      }
    }
  }
`;

export const PRODUCT_BY_SEARCH = gql`
  query GetProductList {
    productList {
      id
      name
      newPath
      posterImageUrl
      status
      category {
        id
        name
        newPath
      }
      subcategory {
        id
        name
        newPath
      }
    }
  }
`;

export const PRODUCT_BY_PATH = gql`
  query ProductByPath($path: String!) {
    productByPath(input: { path: $path }) {
      id
      fabricId
      blindTypeId
      name
      sku
      description
      shortDescription
      newPath
      categoryId
      subcategoryId
      posterImageUrl
      productImages
      price
      motorPrice
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      seoSchema
      additionalInfo
      measuringGuide
      status
      lastEditedBy
      minDrop
      maxDrop
      minWidth
      maxWidth
      color
      pattern
      material
    }
  }
`;
