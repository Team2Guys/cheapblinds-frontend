import { gql } from "@apollo/client";

// Create a subcategory
export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubcategory($input: CreateSubcategoryInput!) {
    createSubcategory(input: $input) {
      status
      message
    }
  }
`;

// Update a subcategory by ID
export const UPDATE_SUBCATEGORY_BY_ID = gql`
  mutation UpdateSubcategoryById($input: UpdateSubcategoryByIdInput!) {
    updateSubcategoryById(input: $input) {
      status
      message
    }
  }
`;

// Remove a subcategory by ID
export const REMOVE_SUBCATEGORY_BY_ID = gql`
  mutation RemoveSubcategoryById($input: RemoveSubcategoryByIdInput!) {
    removeSubcategoryById(input: $input) {
      status
      message
    }
  }
`;
