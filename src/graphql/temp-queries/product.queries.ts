import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST = gql`
  query GetProductList {
    getProductList {
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
      status
      width
      height
      weight
      color
      pattern
      composition
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

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
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
      weight
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

export const GET_CARD_PRODUCT = gql`
  query GetProductList {
    getProductList {
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

export const GET_PRODUCT_BY_URLS = gql`
  query GetProductBySlugs(
    $categorySlug: String!
    $subcategorySlug: String!
    $productSlug: String!
  ) {
    getProductBySlugs(
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
      weight
      color
      pattern
      composition
    }
  }
`;
