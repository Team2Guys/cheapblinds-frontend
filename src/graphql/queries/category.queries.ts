import { gql } from "@apollo/client";

export const GET_CATEGORY_LIST_QUERY = gql`
  query GetCategoryList {
    categoryList {
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
      canonicalUrl
      posterImageUrl
      lastEditedBy
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY_BY_ID_QUERY = gql`
  query GetCategoryById($id: ID!) {
    categoryById(id: $id) {
      id
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalUrl
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

export const GET_CARD_CATEGORY_QUERY = gql`
  query GetCategoryList {
    categoryList {
      id
      name
      status
      slug
      posterImageUrl
    }
  }
`;

export const GET_CATEGORY_BY_SLUG_QUERY = gql`
  query GetCategoryBySlug($slug: String!) {
    categoryBySlug(input: { slug: $slug }) {
      id
      name
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      posterImageUrl
      lastEditedBy
      seoSchema
      status
      createdAt
      updatedAt

      subcategories {
        id
        name
        description
        shortDescription
        slug
        metaTitle
        metaDescription
        canonicalUrl
        breadcrumb
        posterImageUrl
        lastEditedBy
        seoSchema
        status
        createdAt
        updatedAt

        products {
          id
          name
          slug
          posterImageUrl
          price
          minHeight
          maxHeight
          minWidth
          maxWidth
          color
          pattern
          composition
          isMotorized
          motorPrice
          status
        }
      }
    }
  }
`;
