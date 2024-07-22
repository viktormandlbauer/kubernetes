function generateRandomUUID() {
  // Helper function to generate a random hex digit
  function randomHexDigit() {
      return Math.floor(Math.random() * 16).toString(16);
  }

  // Generate random UUID pattern
  return (
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      '-' +
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      '-' +
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      '-' +
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      '-' +
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit() + // 4 hex digits
      randomHexDigit() + randomHexDigit() + randomHexDigit() + randomHexDigit()   // 4 hex digits
  );
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

const uuid = generateRandomUUID();
const timestamp = getCurrentTimestamp();

const logOutput = () => {

  console.log(getCurrentTimestamp() + ' ' + generateRandomUUID());
  setTimeout(logOutput, 5000)
}

logOutput()