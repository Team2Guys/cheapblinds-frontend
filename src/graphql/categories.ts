import { gql } from "@apollo/client";

// categories
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      description
      posterImageUrl
      last_editedBy
      short_description
      custom_url
      Banners
      breadCrum
      hoverImageUrl
      Meta_Title
      Meta_Description
      Canonical_Tag
      status
      seoSchema
      Products {
        id
        name
        description
        posterImageUrl
        last_editedBy
        short_description
        custom_url
        Banners
        breadCrum
        discountPrice
        stock
        hoverImageUrl
        Meta_Title
        Meta_Description
        Canonical_Tag
        status
        seoSchema
      }
      subCategories {
        id
        name
        description
        posterImageUrl
        last_editedBy
        short_description
        custom_url
        Banners
        breadCrum
        hoverImageUrl
        Meta_Title
        Meta_Description
        Canonical_Tag
        status
        seoSchema
      }
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


export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $input) {
      id
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
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




// SubCategories 
export const CREATE_SUBCATEGORY = gql`
  mutation CreateSubCategory($input: CreateSubCategoryInput!) {
    subCategory(createSubCategoryInput: $input) {
      name
      description
      posterImageUrl
      Canonical_Tag
      Meta_Description
      Meta_Title
      last_editedBy
      custom_url
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
            short_description
            custom_url
            Banners
            breadCrum
            hoverImageUrl
            Meta_Title
            Meta_Description
            Canonical_Tag
            status
            seoSchema
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
