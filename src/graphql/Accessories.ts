import { gql } from "@apollo/client";

export const FETCH_ALL_ECOMERECE = gql`
 query EComerece {
    eComerece {
    id
        name
        price
        description
        stock
        discountPrice
        short_description
        posterImageUrl
        hoverImageUrl
        productImages
        last_editedBy
        custom_url
        breadCrum
        Banners
        DescriptionBullets
        Additionalinformation
        Questions
        materialType
        colors
        sizes
        variant
        Canonical_Tag
        Meta_Description
        Meta_Title
        createdAt
        updatedAt
        shippingOptions
        status
        category 
        {
            name
            id
            custom_url
        }
        subcategory 
        {
            id
            name
            custom_url
        }
    }
}

`;

export const UPDATE_ECOMERECE_PRODUCTS = gql`
  mutation UpdateAccessory($input: UpdateEComereceInput!) {
    updateEComerece(updateEComereceInput: $input) {
      name
    }
  }
`;

export const CREATE_ECOMERECE_PRODUCT = gql`
mutation Add_Accessories($input: CreateEComereceInput!) {
  createEComerece(createEComereceInput: $input) {
    name
  }
}

`


export const FIND_ONE_Accessory = gql`
query Product($custom_url: String!,$category: String!,$subCategory: String!) {
  single_product_ecomerece(custom_url: $custom_url, category:$category,subCategory:$subCategory) {
    id
    name
    posterImageUrl
    hoverImageUrl
    productImages
    price
    description
    stock
    discountPrice
    short_description
    colors
    sizes
    variant
    DescriptionBullets
    Additionalinformation
    Banners
    shippingOptions
    status
     questions {
            id
            name
            email
            question
            status
            replies
            createdAt
           
        }
    reviews {
           id
            starRating
            name
            ReviewsDescription
            reviewDate
            posterImageUrl
            productsImage
            status
        }
        category {
            custom_url
        }
        subcategory {
            custom_url
        }
  }}

`


export const REMOVE_ECOMERECE = gql`
  mutation RemoveProduct($id: Int!) {
    RemoveEcomereceProduct(id: $id) {
      id
    }
  }
`;

