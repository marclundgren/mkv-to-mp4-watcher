const path = require("path");
const fs = require("fs");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(ffmpegPath);

const write = ({
  fileName,
  newFileName,
  basePath,
  inExtension,
  outExtension = "mp4",
  removeOriginal = false,
}) => {
  const absolutePath = path.join(basePath, newFileName);
  console.log(`write: ${absolutePath}`);

  return new Promise((resolve, reject) => {
    console.log(`command: ${basePath}/${fileName}.${inExtension}`);
    try {
      const command = ffmpeg(`${basePath}/${fileName}.${inExtension}`)
        .format(outExtension)
        .output(absolutePath)
        .on("progress", function (progress) {
          console.log("Processing: " + JSON.stringify(progress));
        })
        .on("end", () => {
          console.log(`done: ${absolutePath}`);
          if (removeOriginal) {
            console.log(`removing ${basePath}/${fileName}.${inExtension}`);
            fs.unlink(`${basePath}/${fileName}.${inExtension}`, (err) => {
              if (err) {
                reject(err);
              } else {
                console.log(`removed ${basePath}/${fileName}.${inExtension}`);
                resolve(absolutePath);
              }
            });
          } else {
            resolve(absolutePath);
          }
        });
      command.run();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
module.exports = write;
