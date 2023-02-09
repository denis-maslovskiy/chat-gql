const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(
      email: String!
      username: String!
      name: String!
      password: String!
    ): User
    signIn(email: String!, password: String!): SignInResponse
    updateUser(userId: ID!, chatsToCheck: [String!]): User
  }

  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    chats: [Chat!]!
    chatsToCheck: [String!]
    createdAt: String!
    updatedAt: String!
  }

  type SignInResponse {
    user: User
    token: String!
  }
`;
