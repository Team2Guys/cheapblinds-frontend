
// categories
export const CREATE_CATEGORY = `
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const GET_ALL_CATEGORIES = `
  query {
    categories {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const GET_CATEGORY_BY_CUSTOM_URL = `
  query FindOneCategory($custom_url: String!) {
    category(custom_url: $custom_url) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const UPDATE_CATEGORY = `
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const REMOVE_CATEGORY = `
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;




// SubCategories 
export const CREATE_SUBCATEGORY = `
  mutation CreateSubCategory($createSubCategoryInput: CreateSubCategoryInput!) {
    subCategory(createSubCategoryInput: $createSubCategoryInput) {
      id
      name
          }
  }
`;

export const GET_ALL_SUBCATEGORIES = `
  query {
    subCategories {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const GET_SUBCATEGORY_BY_CUSTOM_URL = `
  query GetSubCategory($custom_url: String!) {
    SubCategory(custom_url: $custom_url) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const UPDATE_SUBCATEGORY = `
  mutation UpdateSubCategory($updateCategoryInput: UpdatesubCategoryInput!) {
    subCategoryupdateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;

export const REMOVE_SUBCATEGORY = `
  mutation RemoveSubCategory($id: Int!) {
    subCategoryremoveCategory(id: $id) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;
