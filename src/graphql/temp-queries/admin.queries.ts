import { gql } from "@apollo/client";

export const GET_ALL_ADMINS = gql`
  query GetAdminList {
    getAdminList {
      status
      message
      data {
        id
        firstName
        lastName
        password
        email
        permissions
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ADMIN_BY_ID = gql`
  query GetAdminById($input: GetAdminByIdInput!) {
    getAdminById(input: $input) {
      status
      message
      data {
        id
        firstName
        lastName
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;
