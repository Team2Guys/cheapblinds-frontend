import { gql } from "@apollo/client";

// --- LOGIN MUTATIONS ---

export const SUPER_ADMIN_LOGIN = gql`
  mutation SigninSuperAdmin($input: SigninInput!) {
    signinSuperAdmin(input: $input) {
      status
      message
      data {
        id
        accessToken
        role
      }
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation SigninAdmin($input: SigninInput!) {
    signinAdmin(input: $input) {
      status
      message
      data {
        id
        accessToken
        role
      }
    }
  }
`;

// --- ADMIN MANAGEMENT MUTATIONS ---

export const CREATE_ADMIN = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_ADMIN_BY_ID = gql`
  mutation UpdateAdminById($input: UpdateAdminByIdInput!) {
    updateAdminById(input: $input) {
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

export const REMOVE_ADMIN_BY_ID = gql`
  mutation removeAdminById($input: RemoveAdminByIdInput!) {
    removeAdminById(input: $input) {
      status
      message
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
