const chokidar = require("chokidar");
const convert = require("./convert");
const fs = require("fs");
const path = require("path");

const watchPath = process.env.WATCH || "**/*.mkv";

// mkv to mp4
chokidar.watch(watchPath.split(","), {}).on("all", (event, filePath) => {
  if (event === "add") {
    convert(filePath)
      .catch(console.errorgs)
      .then(() => {
        fs.promises.unlink(path.join(__dirname, filePath));
      });
  }
});
