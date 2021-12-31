const chokidar = require("chokidar");
const convert = require("./convert");
const fs = require("fs");
const path = require("path");

const watchPath = process.env.DIR || "/watch";

// mkv to mp4
chokidar.watch([`${watchPath}/**/*.mkv`]).on("all", (event, filePath) => {
  if (event === "add") {
    convert(filePath)
      .catch(console.error)
      .then((res) => {
        console.log(`done ${res}`);
      });
  }
});
