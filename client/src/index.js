import React from "react";
import ReactDOM from "react-dom";
import { createClient } from "graphql-ws";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  makeVar,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import App from "./components/app/App";
import "./index.css";

export const draftMessagesVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        draftMessages: {
          read() {
            return draftMessagesVar();
          },
        },
      },
    },
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
);

const httpLink = new createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  uri: "http://localhost:4000/graphql",
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
