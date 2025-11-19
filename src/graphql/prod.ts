// products

import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
      name
      customUrl
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query products {
    products {
      id
      name
      description
      posterImageUrl
      last_editedBy
      shortDescription
      customUrl
      Banners
      breadCrumb
      price
      discountPrice
      stock
      productImages
      hoverImageUrl
      metaTitle
      metaDescription
      canonicalTag
      status
      seoSchema
      updatedAt
      createdAt
      subcategory {
        id
        name
        customUrl
      }
      category {
        id
        name
        customUrl
      }
    }
  }
`;

export const GET_PRODUCT_BY_CUSTOM_URL = `
  query GetProduct($customUrl: Int!) {
    product(customUrl: $customUrl) {
      id
      name
      customUrl
      price
      description
      # add other fields here
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(updateProductInput: $input) {
      id
      name
      customUrl
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
    }
  }
`;
