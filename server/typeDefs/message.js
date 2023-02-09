const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Upload

  extend type Query {
    userMessages(userId: ID!): [Message]!
  }

  extend type Mutation {
    postMessage(body: String!, sender: ID!, chatId: ID!, file: Upload): Message
  }

  extend type Subscription {
    newMessage: Message!
  }

  type Message {
    id: ID!
    body: String!
    sender: User!
    createdAt: String!
    updatedAt: String!
    chat: ID
    fileUrl: String
  }
`;
