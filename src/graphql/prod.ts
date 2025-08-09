// products

import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
      name
      custom_url
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
      short_description
      custom_url
      Banners
      breadCrum
      price
      discountPrice
      stock
      productImages
      hoverImageUrl
      Meta_Title
      Meta_Description
      Canonical_Tag
      status
      seoSchema
      updatedAt
      createdAt
      subcategory {
      id
      name
      custom_url
      }
      category {
      id
      name
      custom_url
      }
    }
  }
`;

export const GET_PRODUCT_BY_CUSTOM_URL = `
  query GetProduct($custom_url: Int!) {
    product(custom_url: $custom_url) {
      id
      name
      custom_url
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
      custom_url
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
