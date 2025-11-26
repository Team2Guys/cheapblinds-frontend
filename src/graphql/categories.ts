import { gql } from "@apollo/client";

// categories
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      name
      description
      posterImageUrl
      canonicalTag
      metaDescription
      metaTitle
      last_editedBy
      customUrl
    }
  }
`;



export const GET_CATEGORY_BY_CUSTOM_URL = `
  query FindOneCategory($customUrl: String!) {
    category(customUrl: $customUrl) {
      id
      name
      customUrl
      # add other fields here
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $input) {
      id
      name
      description
      posterImageUrl
      canonicalTag
      metaDescription
      metaTitle
      last_editedBy
      customUrl
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
    }
  }
`;


export const GET_ALL_SUBCATEGORIES = gql`
  query SubCategories {
    subCategories {
      id
      name
      description
      posterImageUrl
      last_editedBy
      shortDescription
      customUrl
      Banners
      breadCrumb
      metaTitle
      metaDescription
      canonicalTag
      status
      seoSchema
      updatedAt
      createdAt
      category {
        id
        name
      }
    }
  }
`;

export const GET_SUBCATEGORY_BY_CUSTOM_URL = `
  query GetSubCategory($customUrl: String!) {
    SubCategory(customUrl: $customUrl) {
      id
      name
      customUrl
      # add other fields here
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubCategory($input: UpdatesubCategoryInput!) {
    subCategoryupdateCategory(updateCategoryInput: $input) {
      id
    }
  }
`;

export const REMOVE_SUBCATEGORY = gql`
  mutation RemoveSubCategory($id: Int!) {
    subCategoryremoveCategory(id: $id) {
      id
    }
  }
`;
