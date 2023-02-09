import { gql } from "@apollo/client";

export const POST_MESSAGE = gql`
  mutation PostMessage($body: String!, $sender: ID!, $chatId: ID!, $file: Upload) {
    postMessage(body: $body, sender: $sender, chatId: $chatId, file: $file) {
      body
      id
      createdAt
      updatedAt
      fileUrl
    }
  }
`;
