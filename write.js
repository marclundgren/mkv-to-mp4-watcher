const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const path = require("path");

const mutexify = require("mutexify");
let lock = mutexify();

const write = (
  { fileName, newFileName, basePath, inExtension, outExtension = "mp4" },
  cb
) => {
  console.log(`write: ${fileName}`);
  lock(async function (release) {
    const absolutePath = path.join(basePath, newFileName);
    console.log(`command: ${basePath}/${fileName}.${inExtension}`);
    const command = ffmpeg(`${basePath}/${fileName}.${inExtension}`)
      .format(outExtension)
      .output(absolutePath)
      .on("end", () => {
        console.log(`done: ${absolutePath}`);
        release(cb);
      });
    command.run();
  });
};
module.exports = write;
