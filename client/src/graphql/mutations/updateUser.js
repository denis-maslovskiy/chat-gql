import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $chatsToCheck: [String!]) {
    updateUser(userId: $userId, chatsToCheck: $chatsToCheck) {
      id
      email
      chatsToCheck
      chats {
        id
      }
    }
  }
`;
