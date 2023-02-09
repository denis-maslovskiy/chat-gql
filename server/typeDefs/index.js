const { gql } = require("apollo-server-express");
const user = require("./user");
const chat = require("./chat");
const message = require("./message");

const root = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;

module.exports = [root, user, chat, message];
