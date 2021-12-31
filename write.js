const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const path = require("path");

// const mutexify = require("mutexify");
// let lock = mutexify();

const write = (
  { fileName, newFileName, basePath, inExtension, outExtension = "mp4" },
  cb
) => {
  const absolutePath = path.join(basePath, newFileName);
  console.log(`write: ${absolutePath}`);

  return new Promise((resolve, reject) => {
    // lock(async function (release) {
    console.log(`command: ${basePath}/${fileName}.${inExtension}`);
    try {
      const command = ffmpeg(`${basePath}/${fileName}.${inExtension}`)
        .format(outExtension)
        .output(absolutePath)
        .on("end", () => {
          console.log(`done: ${absolutePath}`);
          // release(cb);
          resolve(absolutePath);
        });
      command.run();
    } catch (err) {
      console.error(err);
      reject(err);
    }
    // });
  });
};
module.exports = write;
