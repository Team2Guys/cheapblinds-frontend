import { gql } from "@apollo/client";

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createAddress(input: $input) {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      state
      city
      address
      addressType
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ADDRESS_BY_ID = gql`
  mutation UpdateAddressById($id: ID!, $input: UpdateAddressByIdInput!) {
    updateAddressById(id: $id, input: $input) {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      state
      city
      address
      addressType
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_ADDRESS_BY_ID = gql`
  mutation RemoveAddressById($id: ID!) {
    removeAddressById(id: $id) {
      id
    }
  }
`;