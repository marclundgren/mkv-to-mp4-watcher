const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");
const ffmpeg = createFFmpeg({ log: true });

let loaded = false;

function loadFFmpeg() {
  if (loaded) {
    return Promise.resolve({ ffmpeg, fetchFile });
  } else {
    console.log("loading ffmpeg...");
    return ffmpeg.load().then(() => {
      console.log("loaded ffmpeg");
      loaded = true;
      return { ffmpeg, fetchFile };
    });
  }
}

module.exports = loadFFmpeg;
