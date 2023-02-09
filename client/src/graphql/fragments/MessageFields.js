import { gql } from "@apollo/client";

export const MESSAGE_FIELDS = gql`
  fragment MessageFields on Message {
    id
    body
    sender {
      id
      username
      name
      email
    }
    updatedAt
    fileUrl
  }
`;
