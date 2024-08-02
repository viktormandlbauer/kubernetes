const axios = require('axios');
const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/files');

const imageService = {
  fileName: '',
  lastFetchedTime: null,

  /**
   * Fetch a file from the given URL and save it temporarily.
   * Automatically follows redirects up to a specified limit.
   * @param {string} url - The URL of the file to fetch.
   * @returns {Promise<string>} - A promise that resolves to the path of the saved file.
   */
  async fetchFile(url) {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream', // Important to handle the response as a stream
        maxRedirects: 5, // Set a limit for redirects
      });

      const fileName = 'image.jpg';
      const filePath = path.join(OUTPUT_DIR, fileName);
      const writer = fs.createWriteStream(filePath);

      // Pipe the response data to the file
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          this.lastFetchedFilePath = filePath;
          this.lastFetchedTime = new Date();
          resolve(filePath);
        });
        writer.on('error', reject);
      });
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  },

  /**
   * Delete a file from the temporary directory.
   * @param {string} filePath - The path of the file to delete.
   * @returns {Promise<void>} - A promise that resolves when the file is deleted.
   */
  deleteFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  },

  /**
   * Get the age of the last fetched file in minutes.
   * @returns {number} - The age of the last fetched file in minutes.
   */
  getLastFetchedFileAge() {
    if (!this.lastFetchedTime) {
      Console.log('No file has been fetched yet.');
      return 0;
    }
    Console.log('Last image fetch at: ' + this.lastFetchedTime)
    const now = new Date();
    const ageInMilliseconds = now - this.lastFetchedTime;
    const ageInMinutes = Math.floor(ageInMilliseconds / (1000 * 60));

    return ageInMinutes;
  }
};

imageService.fetchFile('https://picsum.photos/1200')
.then((filePath) => {
  console.log('File saved at:', filePath);
})
.catch((error) => {
  console.error('Error:', error);
});

module.exports = imageService;
