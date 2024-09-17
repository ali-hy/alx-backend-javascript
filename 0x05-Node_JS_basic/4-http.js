const http = require('http');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();

app.on('request', (_, resp) => {
  const text = 'Hello Holberton School!';

  resp.setHeader('Content-Type', 'text/plain');
  resp.setHeader('Content-Length', text.length);

  resp.statusCode = 200;
  resp.write(Buffer.from(text));
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
