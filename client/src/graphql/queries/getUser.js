import { gql } from "@apollo/client";
import { CHAT_FIELDS } from "../fragments/ChatFields";

export const GET_USER = gql`
  ${CHAT_FIELDS}
  query getUser($userId: ID!) {
    user(id: $userId) {
      id
      email
      username
      name
      updatedAt
      chatsToCheck
      chats {
        ...ChatFields
      }
    }
  }
`;
