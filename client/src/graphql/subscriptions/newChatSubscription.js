import { gql } from "@apollo/client";
import { CHAT_FIELDS } from "../fragments/ChatFields";

export const NEW_CHAT_SUBSCRIPTION = gql`
  ${CHAT_FIELDS}
  subscription NewChat {
    newChat {
      ...ChatFields
    }
  }
`;
