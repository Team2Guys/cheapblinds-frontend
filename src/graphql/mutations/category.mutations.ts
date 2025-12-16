import { gql } from "@apollo/client";

// Create category
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      status
      message
    }
  }
`;

// Update category by ID
export const UPDATE_CATEGORY_BY_ID = gql`
  mutation UpdateCategoryById($input: UpdateCategoryByIdInput!) {
    updateCategoryById(input: $input) {
      status
      message
    }
  }
`;

// Remove category by ID
export const REMOVE_CATEGORY_BY_ID = gql`
  mutation RemoveCategoryById($input: RemoveCategoryByIdInput!) {
    removeCategoryById(input: $input) {
      status
      message
    }
  }
`;
