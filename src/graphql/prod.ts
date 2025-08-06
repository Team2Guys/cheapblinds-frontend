// products

export const CREATE_PRODUCT = `
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      custom_url
      price
      description
      # add other fields here
    }
  }
`;

export const GET_ALL_PRODUCTS = `
  query {
    products {
      id
      name
      custom_url
      price
      description
      # add other fields here
    }
  }
`;

export const GET_PRODUCT_BY_CUSTOM_URL = `
  query GetProduct($custom_url: Int!) {
    product(custom_url: $custom_url) {
      id
      name
      custom_url
      price
      description
      # add other fields here
    }
  }
`;

export const UPDATE_PRODUCT = `
  mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
      name
      custom_url
      price
      description
      # add other fields here
    }
  }
`;

export const REMOVE_PRODUCT = `
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
      name
      custom_url
      # add other fields here
    }
  }
`;
