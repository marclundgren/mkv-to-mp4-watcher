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
  lock(async function (release) {
    const absolutePath = path.join(basePath, newFileName);
    const command = ffmpeg(`${basePath}/${fileName}.${inExtension}`)
      .format(outExtension)
      .output(absolutePath)
      .on("end", () => {
        release(cb);
      });
    command.run();
  });
};
module.exports = write;
