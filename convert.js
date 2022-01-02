const path = require("path");
const fs = require("fs");

const write = require("./write");

const uid = Number(process.env.uid) || 1000;
const gid = Number(process.env.gid) || 1000;

// hardcoded for now
const IN_EXTENTION = "mkv";
const OUT_EXTENTION = "mp4";

async function convert(filePath) {
  const fileName = path.basename(filePath, `.${IN_EXTENTION}`);
  const newFileName = `${fileName}.${OUT_EXTENTION}`;
  const basePath = path.dirname(filePath);
  // const absolutePath = path.join(basePath, newFileName);

  return new Promise((resolve, reject) => {
    const writeConfig = {
      fileName,
      newFileName,
      basePath,
      inExtension: IN_EXTENTION,
      removeOriginal: true,
    };
    write(writeConfig).then((newFilePath) => {
      console.log(`finished writing ${newFilePath}`);

      fs.chown(newFilePath, uid, gid, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(`chown ${newFilePath}`);
          resolve(newFilePath);
        }
      });
    });
  });
}

module.exports = convert;
