// auth.js
import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      status
      message
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      status
      message
      data {
        id
        role
        accessToken
      }
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
