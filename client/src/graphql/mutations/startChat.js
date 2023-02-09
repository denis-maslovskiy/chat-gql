import { gql } from "@apollo/client";

export const START_CHAT = gql`
  mutation StartChat($userIds: [ID!]!, $title: String) {
    startChat(userIds: $userIds, title: $title) {
      id
      title
      users {
        id
        username
      }
    }
  }
`;
