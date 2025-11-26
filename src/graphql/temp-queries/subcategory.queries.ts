import { gql } from "@apollo/client";

export const GET_SUBCATEGORY_LIST = gql`
  query GetSubcategoryList {
    getSubcategoryList {
      id
      name
      categoryId
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      posterImageUrl
      createdAt
      updatedAt
      lastEditedBy
      seoSchema
      status
    }
  }
`;



export const GET_SUBCATEGORY_BY_ID = gql`
  query GetSubcategoryById($id: ID!) {
    getSubcategoryById(id: $id) {
      id
      name
      categoryId
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      posterImageUrl
      breadcrumb
      seoSchema
      status
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;



export const GET_SUBCATEGORY_BY_URLS = gql`
  query GetSubcategoryByUrls($subcategorySlug: String!, $categorySlug: String!) {
    getSubcategoryByUrls(
      input: {
        subcategorySlug: $subcategorySlug
        categorySlug: $categorySlug
      }
    ) {
      id
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      posterImageUrl
      lastEditedBy
      seoSchema
      status
      products {
        id
        name
        slug
        price
        discountPrice
        posterImageUrl
      }
    }
  }
`;

