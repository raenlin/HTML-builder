const fs = require('fs');
const path = require('node:path');
const pathToStylesFolder = path.join(__dirname, 'styles');
const pathToProjectFolder = path.join(__dirname, 'project-dist');
const pathToBundlerFile = path.join(pathToProjectFolder, 'bundle.css');

const copyStyles = async () => {
  try {
    const data = await fs.promises.readdir(pathToStylesFolder);
    const outputStream = fs.createWriteStream(pathToBundlerFile);
    for (const file of data) {
      if (path.extname(file) === '.css') {
        const content = await fs.promises.readFile(
          path.join(pathToStylesFolder, file),
          'utf8',
        );
        outputStream.write(content);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
copyStyles();
