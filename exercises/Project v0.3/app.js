const express = require('express');
const app = express();
const port = 3000;

// Define a route to return an HTML site
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple App</title>
    </head>
    <body>
      <h1>Welcome to My Simple Express App</h1>
      <p>This is a basic HTML page served by Express.</p>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
