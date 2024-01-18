const fs = require('fs');
const path = require('node:path');

const copyFiles = () => {
  const sourceDirectory = path.join(__dirname, 'files');
  const newDirectory = path.join(__dirname, 'files-copy');
  fs.mkdir(newDirectory, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
    }
    fs.readdir(sourceDirectory, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      files.forEach((file) => {
        const sourceFiles = path.join(sourceDirectory, file);
        const newFiles = path.join(newDirectory, file);
        fs.copyFile(sourceFiles, newFiles, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      });
    });
  });
};

copyFiles();
