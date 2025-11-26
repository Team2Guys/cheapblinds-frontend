import { gql } from "@apollo/client";

export const GET_CATEGORY_LIST = gql`
  query GetCategoryList {
    getCategoryList {
      id
      name
      description
      shortDescription
      breadcrumb
      seoSchema
      status
      slug
      metaTitle
      metaDescription
      canonicalTag
      posterImageUrl
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;


export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!) {
    getCategoryById(id: $id) {
      id
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      posterImageUrl
      createdAt
      updatedAt
      seoSchema
      breadcrumb
      status
      lastEditedBy
    }
  }
`;


export const GET_CARD_CATEGORY = gql`
  query GetCategoryList {
    getCategoryList {
      id
      name
      status
      slug
      posterImageUrl
    }
  }
`;

export const GET_CATEGORY_BY_CUSTOM_URL = gql`
  query GetCategoryByCustomUrl($slug: String!) {
    getCategoryByUrl(input: { slug: $slug }) {
      id
      name
      description
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      seoSchema
      status
      subcategories {
        id
        name
        slug
        products {
          id
          name
          slug
          price
          discountPrice
        }
      }
    }
  }
`;

