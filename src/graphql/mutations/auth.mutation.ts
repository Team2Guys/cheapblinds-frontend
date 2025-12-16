import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      message
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      id
      name
      email
      role
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
  mutation Signout {
    signout {
      message
    }
  }
`;

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation RequestPasswordReset($input: PasswordResetRequestInput!) {
    requestPasswordReset(input: $input) {
      message
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($input: PasswordUpdateInput!) {
    updatePassword(input: $input) {
      message
    }
  }
`;
