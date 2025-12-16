import { gql } from "@apollo/client";

export const UPDATE_USER_BY_ID_MUTATION = gql`
  mutation UpdateUserById($id: ID!, $input: UpdateUserByIdInput!) {
    updateUserById(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      isEmailVerified
      role
      defaultShippingAddressId
      defaultBillingAddressId
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_USER_BY_ID_MUTATION = gql`
  mutation RemoveUserById($id: ID!) {
    removeUserById(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;
