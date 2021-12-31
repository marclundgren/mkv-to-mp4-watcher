const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });

let loaded = false;

function loadFFmpeg() {
  if (loaded) {
    return Promise.resolve({ ffmpeg, fetchFile });
  } else {
    return ffmpeg.load().then(() => {
      loaded = true;
      return { ffmpeg, fetchFile };
    });
  }
}

module.exports = loadFFmpeg;
