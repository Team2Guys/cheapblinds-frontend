import { gql } from "@apollo/client";

export const ADDRESS_LIST_BY_USER = gql`
  query AddressListByUserId($userId: ID!) {
    addressListByUserId(userId: $userId) {
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
`;

export const ADDRESS_BY_ID = gql`
  query AddressById($Id: ID!) {
    addressById(Id: $Id) {
      id
      userId
      firstName
      lastName
      email
      phone
      country
      city
      state
      address
      addressType
      createdAt
      updatedAt
    }
  }
`;