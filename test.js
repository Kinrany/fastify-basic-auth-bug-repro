const { test } = require('tap');
const { App } = require('./app');

test('/health', async t => {
  const app = App();

  const response = await app.inject({
    method: 'GET',
    url: '/health',
  });

  t.same(response.statusCode, 200, 'returns status OK');
});

test('/auth', async t => {
  const app = App();

  const response = await app.inject({
    method: 'GET',
    url: '/auth',
    headers: {
      'WWW-Authenticate': 'Basic realm="Realm"',
      // Base64 for user:password
      Authorization: 'Basic dXNlcjpwYXNzd29yZA==',
    },
  });

  t.same(response.statusCode, 200, 'allows access when the password is correct');
});
