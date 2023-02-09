import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      username
      id
    }
  }
`;
