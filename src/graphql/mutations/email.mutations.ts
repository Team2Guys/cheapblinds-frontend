import { gql } from "@apollo/client";

export const SEND_VERIFICATION_TOKEN_MUTATION = gql`
  mutation SendVerificationToken($input: SendVerificationTokenInput!) {
    sendVerificationToken(input: $input) {
      message
    }
  }
`;

export const CHECK_VERIFICATION_TOKEN_MUTATION = gql`
  mutation CheckVerificationToken($input: CheckVerificationTokenInput!) {
    checkVerificationToken(input: $input) {
      message
    }
  }
`;
