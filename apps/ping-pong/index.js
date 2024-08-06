const express = require('express');
const fs = require('node:fs');

const app = express();
const port = process.env.PORT || 3000;

let counter = 0;
let output = '';

app.get('/pingpong', (req, res) => {
  counter += 1;
  output = `Ping / Pongs: ${counter}` + '\n';
  res.send(output);
  fs.writeFile('files/pingpong-count.txt', output, err => {
    if (err) {
      console.error(err);
    } else {
      console.info('Count saved successfully!');
    }
  })
});

app.get('/pingpong/count', (req, res) => {
  res.send(counter.toString());
});

app.listen(port, () => {
  console.log(`PingPong app listening on port ${port}`);
});
