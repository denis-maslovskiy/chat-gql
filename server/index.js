const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const express = require("express");
const mongoose = require("mongoose");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { PORT, NODE_ENV, MONGO_CONNECTION_STRING } = require("./config");

(async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();
    app.disable("x-powered-by");
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use(express.static("public"));

    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
      schema,
      playground: NODE_ENV !== "production",
      context: ({ req, res }) => ({ req, res }),
      uploads: false,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });

    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen({ port: PORT }, () =>
      console.log(
        `Worker started on http://localhost:${PORT}${server.graphqlPath}. Pid: ${process.pid}`
      )
    );
  } catch (error) {
    console.error(error);
  }
})();
