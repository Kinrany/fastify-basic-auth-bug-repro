const Fastify = require('fastify');
const basicAuth = require('fastify-basic-auth');

module.exports.App = () => {
  const app = Fastify({
    logger: {
      prettyPrint: true,
      level: 'trace',
    }
  });

  app.register(basicAuth, {
    authenticate: { realm: 'Realm' },
    validate: (username, password) => {
      // Base64 for user:password is dXNlcjpwYXNzd29yZA==
      if (username !== 'user' || password !== 'password') {
        throw new Error('Unauthorized');
      }
    },
  });

  app.after(() => {
    app.get("/auth", {
      onRequest: app.basicAuth,
      handler: async () => 'OK\n',
    });
  });

  return app;
};

if (require.main === module) {
  module.exports.App().listen(3000);
}
