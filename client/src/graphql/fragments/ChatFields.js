import { gql } from "@apollo/client";
import { MESSAGE_FIELDS } from "./MessageFields";

export const CHAT_FIELDS = gql`
  ${MESSAGE_FIELDS}
  fragment ChatFields on Chat {
    title
    id
    users {
      username
      email
      id
      name
    }
    messages {
      ...MessageFields
    }
    updatedAt
    lastMessage {
      ...MessageFields
    }
  }
`;
