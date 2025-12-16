import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST_QUERY = gql`
  query GetProductList {
    productList {
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
      productImages
      lastEditedBy
      seoSchema
      price
      discountPrice
      stock
      width
      height
      color
      pattern
      composition
      status
      categoryId
      subcategoryId
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
      additionalInfo
      measuringGuide
      updatedAt
      createdAt
    }
  }
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query GetProductById($id: ID!) {
    productById(id: $id) {
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
      productImages
      lastEditedBy
      seoSchema
      price
      discountPrice
      stock
      width
      height
      color
      pattern
      composition
      status
      categoryId
      subcategoryId
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
      additionalInfo
      measuringGuide
      updatedAt
      createdAt
    }
  }
`;

export const GET_CARD_PRODUCT_QUERY = gql`
  query GetProductList {
    productList {
      id
      name
      slug
      breadcrumb
      posterImageUrl
      price
      discountPrice
      stock
      status
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCT_BY_SEARCH_QUERY = gql`
  query GetProductList {
    productList {
      id
      name
      slug
      posterImageUrl
      stock
      status
      category {
        id
        name
        slug
      }
      subcategory {
        id
        name
        slug
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG_QUERY = gql`
  query GetProductBySlugs(
    $categorySlug: String!
    $subcategorySlug: String!
    $productSlug: String!
  ) {
    productBySlugs(
      input: {
        categorySlug: $categorySlug
        subcategorySlug: $subcategorySlug
        productSlug: $productSlug
      }
    ) {
      id
      name
      description
      shortDescription
      slug
      categoryId
      subcategoryId
      posterImageUrl
      productImages
      price
      discountPrice
      stock
      metaTitle
      metaDescription
      canonicalTag
      breadcrumb
      seoSchema
      additionalInfo
      measuringGuide
      status
      lastEditedBy
      width
      height
      color
      pattern
      composition
    }
  }
`;
