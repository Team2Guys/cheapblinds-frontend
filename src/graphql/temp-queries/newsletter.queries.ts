import { gql } from "@apollo/client";

export const GET_NEWSLETTER_SUBSCRIBERS = gql`
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

export const GET_NEWSLETTER_SUBSCRIBER_BY_ID = gql`
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

export const GET_NEWSLETTER_SUBSCRIBER_BY_EMAIL = gql`
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

