const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const method = req.method.toLowerCase();
  const headers = req.headers;
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  const query = parsedUrl.query;

  const handler = path in router ? router[path] : handlers.notFound;
  handler(
    { method, headers, path, query },
    (statusCode = 200, payload = {}) => {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(JSON.stringify(payload));
    }
  );
});

server.listen(3000, () => {
  console.log('HTTP server is running on port 3000');
});

const handlers = {};

handlers.notFound = (data, callback) => {
  callback(404);
};

handlers.hello = (data, callback) => {
  callback(200, { message: 'EHLO' });
};

const router = {
  hello: handlers.hello
};
