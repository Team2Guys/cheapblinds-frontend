import { gql } from "@apollo/client";

export const SEARCH_QUERY = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      categories {
        id
        name
        newPath
        posterImageUrl
        status
      }
      subcategories {
        id
        name
        newPath
        posterImageUrl
        status
      }
      products {
        id
        name
        newPath
        posterImageUrl
        price
        discountPrice
        status
      }
    }
  }
`;
