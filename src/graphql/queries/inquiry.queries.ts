import { gql } from "@apollo/client";

// Get the list of all inquiries
export const GET_INQUIRY_LIST_QUERY = gql`
  query GetInquiryList {
    inquiryList {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;

// Get a single inquiry by ID
export const GET_INQUIRY_BY_ID_QUERY = gql`
  query GetInquiryById($id: ID!) {
    inquiryById(id: $id) {
      id
      name
      email
      phone
      message
      inquiryType
      inquiryStatus
      createdAt
      updatedAt
    }
  }
`;
