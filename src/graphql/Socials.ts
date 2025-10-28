import { gql } from "@apollo/client";

// Mutation: Create Social Link
export const CREATE_SOCIAL = gql`
  mutation CreateSocial($CreateGeneralsocial: CreateGeneralsocial!) {
    createSocial(CreateGeneralsocial: $CreateGeneralsocial) {
      id
    }
  }
`;

// Query: Get All Social Links
export const GET_SOCIAL_LINKS = gql`
  query {
    SocialLinks {
      id
      post_links
      posterImageUrl
      createdAt
      updatedAt
    }
  }
`;

// Mutation: Update Social Link
export const UPDATE_SOCIAL = gql`
  mutation UpdateSocial($UpdateGeneralsocial: UpdateGeneralsocial!) {
    updateSocial(UpdateGeneralsocial: $UpdateGeneralsocial) {
      id
    }
  }
`;

// Mutation: Delete Social Link
export const DELETE_SOCIAL = gql`
  mutation DeleteSocial($id: Int!) {
    deleteSocial(id: $id) {
      id
    }
  }
`;
