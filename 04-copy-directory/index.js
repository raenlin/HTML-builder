const fs = require('fs');
const path = require('path');

const sourceDirectory = path.join(__dirname, 'files');
const newDirectory = path.join(__dirname, 'files-copy');
fs.mkdir(newDirectory, { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  }
});
fs.readdir(newDirectory, (err, files) => {
  if (err) {
    console.log(err);
  }
  for (const file of files) {
    fs.unlink(path.join(newDirectory, file), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});
fs.readdir(sourceDirectory, (err, files) => {
  if (err) {
    console.log(err);
  }
  for (const file of files) {
    fs.readFile(path.join(sourceDirectory, file), (err, data) => {
      if (err) {
        console.log(err);
      }
      fs.writeFile(path.join(newDirectory, file), data, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
});
