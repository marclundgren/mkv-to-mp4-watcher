const chokidar = require("chokidar");
const convert = require("./convert");

const watchPath = process.env.DIR || "/watch";

// mkv to mp4
chokidar.watch([`${watchPath}/**/*.mkv`]).on("all", (event, filePath) => {
  console.log(`watch: ${event} ${filePath}`);
  if (event === "add") {
    convert(filePath)
      .catch(console.error)
      .then((res) => {
        console.log(`done ${res}`);
      });
  }
});

console.log(`watching ${watchPath}`);
