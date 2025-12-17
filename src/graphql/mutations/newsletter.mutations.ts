import { gql } from "@apollo/client";

export const CREATE_NEWSLETTER_SUBSCRIBER_MUTATION = gql`
  mutation CreateNewsletterSubscriber($input: CreateNewsletterSubscriberInput!) {
    createNewsletterSubscriber(input: $input) {
      email
      isActive
    }
  }
`;

export const UPDATE_NEWSLETTER_SUBSCRIBER_MUTATION = gql`
  mutation UpdateNewsletterSubscriberById($id: ID!, $input: UpdateNewsletterSubscriberByIdInput!) {
    updateNewsletterSubscriberById(id: $id, input: $input) {
      isActive
    }
  }
`;
