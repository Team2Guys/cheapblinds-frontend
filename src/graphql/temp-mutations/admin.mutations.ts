import { gql } from "@apollo/client";

export const UPDATE_ADMIN_BY_ID = gql`
  mutation UpdateAdminById($input: UpdateAdminByIdInput!) {
    updateAdminById(input: $input) {
      status
      message
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
