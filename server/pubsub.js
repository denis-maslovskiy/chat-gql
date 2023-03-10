const { RedisPubSub } = require("graphql-redis-subscriptions");

module.exports = new RedisPubSub({
  connection: {
    host: "127.0.0.1",
    port: 6379,
    retryStrategy: (options) => {
      return Math.max(options.attempt * 100, 3000);
    },
  },
});
