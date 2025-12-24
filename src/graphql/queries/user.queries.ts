import { gql } from "@apollo/client";

export const GET_USER_LIST_QUERY = gql`
  query GetUserList {
    userList {
      id
      firstName
      lastName
      email
      isEmailVerified
      addresses
      defaultShippingAddress {
        id
      }
      defaultBillingAddress {
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID_QUERY = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      defaultShippingAddressId
      defaultBillingAddressId
      firstName
      lastName
      email
      addresses
      defaultBillingAddress {
        id
        userId
        firstName
        lastName
        email
        phone
        state
        country
        city
        address
        addressType
        createdAt
        updatedAt
      }
      defaultShippingAddress {
        id
        userId
        firstName
        lastName
        email
        phone
        state
        country
        city
        address
        addressType
        createdAt
        updatedAt
      }
      isEmailVerified
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_FOR_ADDRESS_QUERY = gql`
  query GetUserForAddress($id: ID!) {
    userById(id: $id) {
      id
      addresses
      defaultShippingAddressId
      defaultBillingAddressId
      defaultBillingAddress {
        id
        userId
        firstName
        lastName
        email
        phone
        state
        country
        city
        address
        addressType
        createdAt
        updatedAt
      }
      defaultShippingAddress {
        id
        userId
        firstName
        lastName
        email
        phone
        state
        country
        city
        address
        addressType
        createdAt
        updatedAt
      }
    }
  }
`;
