const express = require('express');
const next = require('next');
const argv = require('minimist')(process.argv.slice(2));

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = {id: req.params.id};
    app.render(req, res, actualPage, queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  let port = argv.p || 3000;
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:' + port);
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
