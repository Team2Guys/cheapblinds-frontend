import { gql } from "@apollo/client";

export const GET_PRODUCT_LIST_QUERY = gql`
  query ProductList {
    productList {
      id
      categoryId
      subcategoryId
      fabricId
      blindTypeId
      sku
      name
      slug
      productUrl
      shortDescription
      description
      posterImageUrl
      productImages
      price
      motorPrice
      minDrop
      maxDrop
      minWidth
      maxWidth
      color
      pattern
      material
      isMotorized
      additionalInfo
      measuringGuide
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      seoSchema
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
      updatedAt
      createdAt
    }
  }
`;

export const GET_CARD_PRODUCT_QUERY = gql`
  query ProductList {
    productList {
      id
      name
      slug
      breadcrumb
      posterImageUrl
      productUrl
      price
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
      productUrl
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
      fabricId
      blindTypeId
      name
      sku
      description
      shortDescription
      slug
      productUrl
      categoryId
      subcategoryId
      posterImageUrl
      productImages
      price
      motorPrice
      metaTitle
      metaDescription
      canonicalUrl
      breadcrumb
      seoSchema
      additionalInfo
      measuringGuide
      status
      lastEditedBy
      minDrop
      maxDrop
      minWidth
      maxWidth
      color
      pattern
      material
    }
  }
`;
