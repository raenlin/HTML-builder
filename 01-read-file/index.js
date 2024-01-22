const fs = require('fs');
const path = require('node:path');
const pathToFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(`${pathToFile}`);
readStream.on('data', (text) => {
  console.log(text.toString());
});
