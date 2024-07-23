const fs = require('node:fs');

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

function writeLog() {
  const content = getCurrentTimestamp() + ' ' + generateRandomUUID() + '\n';
  fs.writeFile('files/output.log', content, err => {
    if (err) {
      console.error(err);
    } else {
      console.info('File written successfully!');
    }
  });
  setTimeout(writeLog, 5000);
}

function readLog() {
  fs.readFile('files/output.log', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
    setTimeout(readLog, 5000);
}

const role = process.env.ROLE || 'reader';

if(role == 'reader'){
  console.log('Reader role');
  readLog();
}else if(role == 'writer'){
  console.log('Writer role');
  writeLog();
}else{
  console.error('Invalid role');
  process.exit(-1);
}