import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      message
    }
  }
`;

export const SIGN_IN = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      id
      name
      role
    }
  }
`;

export const SIGN_OUT = gql`
  mutation Signout {
    signout {
      message
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($input: PasswordResetRequestInput!) {
    requestPasswordReset(input: $input) {
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: PasswordUpdateInput!) {
    updatePassword(input: $input) {
      message
    }
  }
`;
