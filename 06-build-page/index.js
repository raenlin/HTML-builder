const fs = require('fs');
const path = require('path');

const buildPage = async () => {
  try {
    const pathToProjectDir = path.join(__dirname, 'project-dist');
    await fs.promises.mkdir(path.join(__dirname, 'project-dist'), {
      recursive: true,
    });
    const componentsDir = path.join(__dirname, 'components');
    const componentsData = await fs.promises.readdir(componentsDir);
    let templateData = await fs.promises.readFile(
      path.join(__dirname, 'template.html'),
      { encoding: 'utf8' },
    );
    for (const file of componentsData) {
      const componentsName = path.parse(file).name;
      const componentsFile = path.join(componentsDir, file);
      const pattern = new RegExp(`{{${componentsName}}}`, 'g');
      const componentsFileData = await fs.promises.readFile(
        componentsFile,
        'utf8',
      );
      templateData = templateData.replace(pattern, componentsFileData);
    }
    const writeStream = fs.createWriteStream(
      path.join(pathToProjectDir, 'index.html'),
    );
    writeStream.write(templateData);

    // Style bundle
    const pathToStylesFolder = path.join(__dirname, 'styles');
    const pathToProjectFolder = path.join(__dirname, 'project-dist');
    const pathToBundlerFile = path.join(pathToProjectFolder, 'style.css');
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

    // Copy assets
    const sourceDirectory = path.join(__dirname, 'assets');
    const newDirectory = path.join(pathToProjectDir, 'assets');
    await fs.promises.mkdir(newDirectory, { recursive: true });
    const assetsData = await fs.promises.readdir(sourceDirectory);
    for (const file of assetsData) {
      const sourceFiles = path.join(sourceDirectory, file);
      const newFiles = path.join(newDirectory, file);
      fs.cp(sourceFiles, newFiles, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
  } catch (err) {
    console.log(err);
  }
};

buildPage();
