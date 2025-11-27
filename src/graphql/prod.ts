// products

import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id
      name
      slug
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
      slug
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
        slug
      }
      category {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCT_BY_CUSTOM_URL = `
  query GetProduct($slug: Int!) {
    product(slug: $slug) {
      id
      name
      slug
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
      slug
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
