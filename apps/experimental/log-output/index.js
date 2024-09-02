const express = require('express');
const fs = require('node:fs');

// Setup express
const app = express();
const PORT = process.env.PORT || 3000;

// Container role (can be 'reader' or 'writer')
const ROLE = process.env.ROLE || 'reader';

// Ping Pong service endpoint
const SVC_PINGPONGCOUNT_ENDPOINT = process.env.SVC_PINGPONGCOUNT_ENDPOINT || 'http://localhost:3000/pingpong/count';

// Message from config map environment variable
const MESSAGE = process.env.MESSAGE || 'Config Map MESSAGE not set!';

// Define content variable to store log content
let output = '';
let content = '';

// Function to generate a random UUID
function generateRandomUUID() {
  // Helper function to generate a random hex digit
  function randomHexDigit() {
    return Math.floor(Math.random() * 16).toString(16);
  }

  // Generate random UUID pattern
  return (
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    '-' +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    '-' +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    '-' +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    '-' +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() +
    randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit()
  );
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

// Write log to file
function writer() {
  output = getCurrentTimestamp() + ' ' + generateRandomUUID() + '\n';
  fs.writeFile('files/output.log', output, err => {
    if (err) {
      console.error(err);
    } else {
      console.info('File written successfully!');
    }
  });
  setTimeout(writer, 5000);
}

// Read log from file
function reader() {
  content = '';

  console.info("Reading information.txt from config map")

  // Reading information.txt from config map
  fs.readFile('files/information.txt', 'utf8', (err, data_info) => {
    if (err) {
      console.error('Error reading information:', err);
    } else {
      content += 'file content:' + data_info + '<br>';
    }
  });

  console.info('Reading message from config map');

  // Reading message from config map
  content += 'env variable: MESSAGE=' + MESSAGE + '<br>';

  console.info('Reading log file from log-output-writer');

  // Reading log file
  fs.readFile('files/output.log', 'utf8', (err, data_log) => {
    if (err) {
      console.error('Error reading log:', err);
    } else {
      content += data_log + '<br>';
    }
  });

  console.info('Fetching pingpong count from:', SVC_PINGPONGCOUNT_ENDPOINT);

  // Fetching pingpong count
  fetch(SVC_PINGPONGCOUNT_ENDPOINT)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok. Status code: ' + response.status);
      }
      return response.text();
    })
    .then(data_count => {
      content += 'Ping / Pongs: ' + data_count + '<br>';
    })
    .catch(err => {
      console.error('Error fetching pingpong count:', err);
    });

  setTimeout(reader, 5000);
}

if (ROLE == 'reader') {
  reader();
} else if (ROLE == 'writer') {
  writer();
} else {
  console.error('Invalid role');
  process.exit(-1);
}

// Define a route to return the log content
app.get('*', (req, res) => {
  res.send(content);
});

// Start the server
app.listen(PORT, () => {
  console.log(`log-${ROLE} is running on port ${PORT}...`);
});