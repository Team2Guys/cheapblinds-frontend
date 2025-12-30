import { gql } from "@apollo/client";

export const GET_SUBCATEGORY_LIST_QUERY = gql`
  query GetSubcategoryList {
    subcategoryList {
      id
      name
      categoryId
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalUrl
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

export const GET_SUBCATEGORY_BY_ID_QUERY = gql`
  query GetSubcategoryById($id: ID!) {
    subcategoryById(id: $id) {
      id
      name
      categoryId
      description
      shortDescription
      slug
      metaTitle
      metaDescription
      canonicalUrl
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

export const GET_SUBCATEGORY_BY_URLS_QUERY = gql`
  query GetSubcategoryBySlugs($subcategorySlug: String!, $categorySlug: String!) {
    subcategoryBySlugs(input: { subcategorySlug: $subcategorySlug, categorySlug: $categorySlug }) {
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
      products {
        id
        name
        fabricId
        blindTypeId
        sku
        slug
        price
        posterImageUrl
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
`;
