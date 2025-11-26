import { gql } from "@apollo/client";

// Create a product
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      status
      message
    }
  }
`;

// Update a product by ID
export const UPDATE_PRODUCT_BY_ID = gql`
  mutation UpdateProductById($input: UpdateProductByIdInput!) {
    updateProductById(input: $input) {
      status
      message
    }
  }
`;

// Remove a product by ID
export const REMOVE_PRODUCT_BY_ID = gql`
  mutation RemoveProductById($input: RemoveProductByIdInput!) {
    removeProductById(input: $input) {
      status
      message
    }
  }
`;
