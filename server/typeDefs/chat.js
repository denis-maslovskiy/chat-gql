const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    chatMessages(chatId: ID!): [Message]!
  }

  extend type Mutation {
    startChat(title: String, userIds: [ID!]!): Chat
  }

  extend type Subscription {
    newChat: Chat!
  }

  type Chat {
    id: ID!
    title: String!
    users: [User!]!
    messages: [Message!]!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }
`;
