const express = require('express');
const fs = require('node:fs');

// Setup express
const app = express();
const PORT = process.env.PORT || 3000;

// Define container role
const role = process.env.ROLE || 'reader';

// Define content variable to store log content
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
function writeLog() {
  content = getCurrentTimestamp() + ' ' + generateRandomUUID();
  fs.writeFile('files/output.log', content, err => {
    if (err) {
      console.error(err);
    } else {
      console.info('File written successfully!');
    }
  });
  setTimeout(writeLog, 5000);
}

// Read log from file
function readLog() {
  fs.readFile('files/output.log', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      content = data;
      console.log(content);
    }
  });
    setTimeout(readLog, 5000);
}

if(role == 'reader'){
  readLog();
}else if(role == 'writer'){
  writeLog();
}else{
  console.error('Invalid role');
  process.exit(-1);
}

// Define a route to return the log content
app.get('*', (req, res) => {
  res.send(content);
});

// Start the server
app.listen(PORT, () => {
  console.log(`log-${role} is running on port ${PORT}...`);
});