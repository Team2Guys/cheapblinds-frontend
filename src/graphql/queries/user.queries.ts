import { gql } from "@apollo/client";

export const GET_USER_LIST_QUERY = gql`
  query GetUserList {
    userList {
      id
      firstName
      lastName
      email
      isEmailVerified
      role
      defaultShippingAddressId
      defaultBillingAddressId
      addresses
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      firstName
      lastName
      email
      isEmailVerified
      role
      defaultShippingAddressId
      defaultBillingAddressId
      addresses
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_FOR_ADDRESS_QUERY = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      defaultShippingAddressId
      defaultBillingAddressId
      addresses
    }
  }
`;

