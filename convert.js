const path = require("path");
const fs = require("fs");

const write = require("./write");

// hardcoded for now
const IN_EXTENTION = "mkv";
const OUT_EXTENTION = "mp4";

async function convert(filePath) {
  const fileName = path.basename(filePath, `.${IN_EXTENTION}`);
  const newFileName = `${fileName}.${OUT_EXTENTION}`;
  const basePath = path.dirname(filePath);
  const absolutePath = path.join(basePath, newFileName);

  return new Promise((resolve, reject) => {
    const writeConfig = {
      fileName,
      newFileName,
      basePath,
      inExtension: IN_EXTENTION,
    };
    write(writeConfig, () => {
      console.log(`removing ${filePath}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`removed ${filePath}`);
          resolve(absolutePath);
        }
      });
    });
  });
}

module.exports = convert;
