const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach((file) => {
    const pathToFile = path.join(pathToFolder, file);
    fs.stat(pathToFile, (err, stats) => {
      if (err) {
        console.log(err);
        return;
      }
      const fileSize = stats.size;
      const fileExtension = path.extname(file);
      const fileExtensionWithoutDot = path.extname(file).slice(1);
      const fileName = path.basename(file, fileExtension);
      if (stats.isFile()) {
        console.log(
          `${fileName} - ${fileExtensionWithoutDot} - ${fileSize}bytes`,
        );
      }
    });
  });
});
