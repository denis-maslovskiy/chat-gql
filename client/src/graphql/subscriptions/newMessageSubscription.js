import { gql } from "@apollo/client";
import { MESSAGE_FIELDS } from "../fragments/MessageFields";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  ${MESSAGE_FIELDS}
  subscription NewMessage {
    newMessage {
      chat
      updatedAt
      ...MessageFields
    }
  }
`;
