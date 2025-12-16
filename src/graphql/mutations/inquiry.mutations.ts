import { gql } from "@apollo/client";

export const CREATE_INQUIRY = gql`
  mutation CreateInquiry($input: CreateInquiryInput!) {
    createInquiry(input: $input) {
      name
      email
      phone
      message
      inquiryType
    }
  }
`;

export const UPDATE_INQUIRY_BY_ID = gql`
  mutation UpdateInquiryById($id: ID!, $input: UpdateInquiryByIdInput!) {
    updateInquiryById(id: $id, input: $input) {
      id
      inquiryStatus
      updatedAt
    }
  }
`;

export const REMOVE_INQUIRY_BY_ID = gql`
  mutation RemoveInquiryById($id: ID!) {
    removeInquiryById(id: $id) {
      id
      name
    }
  }
`;
