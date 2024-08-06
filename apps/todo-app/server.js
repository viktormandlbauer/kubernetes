const express = require('express');
const bodyParser = require('body-parser');

const imageService = require('./services/fileService');

setInterval(() => {
  // Fetch and save a file
  imageService.fetchFile('https://picsum.photos/1200')
    .then((filePath) => {
      console.log('File saved at:', filePath);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, 3600000);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'))

const cors = require("cors");
app.use(cors());

// Define a route to return an HTML site
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
