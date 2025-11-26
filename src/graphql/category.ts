import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;

// Update a category by ID
export const UPDATE_CATEGORY_BY_ID = gql`
  mutation UpdateCategoryById($input: UpdateCategoryByIdInput!) {
    updateCategoryById(input: $input) {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;

// Remove a category by ID
export const REMOVE_CATEGORY_BY_ID = gql`
  mutation RemoveCategoryById($input: RemoveCategoryByIdInput!) {
    removeCategoryById(input: $input) {
      status
      message
    }
  }
`;

// Get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;

// Get category by ID
export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($input: GetCategoryByIdInput!) {
    getCategoryById(input: $input) {
      status
      message
      data {
        id
        name
        description
        shortDescription
        customUrl
        metaTitle
        metaDescription
        canonicalTag
        thumbnailUrl
        thumbnailPublicId
        thumbnailText
        createdAt
        updatedAt
      }
    }
  }
`;
