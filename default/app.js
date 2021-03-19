const express = require('express');
const app     = express();

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log('Default service running'));
