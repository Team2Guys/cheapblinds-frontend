import { gql } from "@apollo/client";

export const GET_NEWSLETTER_SUBSCRIBERS_QUERY = gql`
  query GetNewsletterSubscribers {
    newsletterSubscriberList {
      id
      email
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_NEWSLETTER_SUBSCRIBER_BY_ID_QUERY = gql`
  query GetNewsletterSubscriberById($id: ID!) {
    newsletterSubscriberById(id: $id) {
      id
      email
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_NEWSLETTER_SUBSCRIBER_BY_EMAIL_QUERY = gql`
  query GetNewsletterSubscriberByEmail($email: String!) {
    newsletterSubscriberByEmail(email: $email) {
      id
      email
      isActive
      createdAt
      updatedAt
    }
  }
`;


