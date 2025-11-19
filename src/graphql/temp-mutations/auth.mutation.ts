import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      status
      message
    }
  }
`;

export const SIGN_IN = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      status
      message
      data {
        id
        role
      }
    }
  }
`;

export const SIGNOUT_MUTATION = gql`
  mutation Signout {
    signout {
      status
      message
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($input: PasswordResetRequestInput!) {
    requestPasswordReset(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: PasswordUpdateInput!) {
    updatePassword(input: $input) {
      status
      message
    }
  }
`;
