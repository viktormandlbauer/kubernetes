// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let counter = 0;

app.get('/pingpong', (req, res) => {
  counter += 1;
  res.send(`pong ${counter}`);
});

app.listen(port, () => {
  console.log(`PingPong app listening on port ${port}`);
});
