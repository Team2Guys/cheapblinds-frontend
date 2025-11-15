import { gql } from "@apollo/client";

export const SEND_VERIFICATION_TOKEN = gql`
  mutation SendVerificationToken($input: SendVerificationTokenInput!) {
    sendVerificationToken(input: $input) {
      status
      message
    }
  }
`;

export const CHECK_VERIFICATION_TOKEN = gql`
  mutation CheckVerificationToken($input: CheckVerificationTokenInput!) {
    checkVerificationToken(input: $input) {
      status
      message
    }
  }
`;
