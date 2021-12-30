const path = require("path");
const fs = require("fs");

const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });

let ffmpegLoaded;

function loadFFmpeg() {
  if (ffmpegLoaded) {
    return Promise.resolve(ffmpeg);
  } else {
    return ffmpeg.load().then((res) => {
      ffmpegLoaded = true;
      return res;
    });
  }
}

async function convert(filePath) {
  const fileName = path.basename(filePath, ".mkv");
  const newFileName = `${fileName}.mp4`;
  const basePath = path.dirname(filePath);

  await loadFFmpeg();

  return fetchFile(`${basePath}/${fileName}.mkv`)
    .then((res) => {
      // [info] run FS.writeFile SampleVideo_1280x720_2mb.mkv <2097841 bytes binary file>
      ffmpeg.FS("writeFile", `${fileName}.mkv`, res);
      const args = ["-y", "-i", `${fileName}.mkv`, newFileName];

      // [info] run ffmpeg command: -y -i SampleVideo_1280x720_2mb.mkv SampleVideo_1280x720_2mb.mp4
      return ffmpeg.run.apply(ffmpeg, args);
    })
    .then((res) => {
      console.log(res);
      return fs.promises.writeFile(
        `${basePath}/${newFileName}`,
        ffmpeg.FS("readFile", newFileName)
      );
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = convert;
