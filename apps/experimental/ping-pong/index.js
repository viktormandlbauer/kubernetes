const express = require('express');
const fs = require('node:fs');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Load environment variables for PostgreSQL connection
const DB_NAME = process.env.DB_NAME || 'app_pingpong';
const DB_USER = process.env.DB_USER || 'pingpong';
const DB_HOST = process.env.DB_HOST || '0.0.0.0';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_PASSWORD = process.env.DB_PASSWORD || '';

// PostgreSQL connection
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

let counter = 0;
let output = '';

app.get('/pingpong', (req, res) => {
  counter += 1;
  output = `Ping / Pongs: ${counter}` + '\n';
  res.send(output);

  // Update database
  pool.query('UPDATE pingpongs SET count = $1', [counter], (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.info('Count updated successfully!');
    }
  });
  
  // fs.writeFile('files/pingpong-count.txt', output, err => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.info('Count saved successfully!');
  //   }
  // })
});

app.get('/pingpong/count', (req, res) => {
  console.log('Returning count: ', counter);
  res.send(counter.toString());
});

app.listen(port, () => {
  console.log(`PingPong app listening on port ${port}`);
});
