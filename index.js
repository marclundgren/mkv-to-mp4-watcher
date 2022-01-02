const chokidar = require("chokidar");
const convert = require("./convert");

const { Mutex, E_CANCELED } = require("async-mutex");
const mutex = new Mutex();

const watchPath = process.env.DIR || "/watch";

// mkv to mp4
chokidar.watch([`${watchPath}/**/*.mkv`]).on("all", (event, filePath) => {
  console.log(`watch: ${event} ${filePath}`);
  if (event === "add") {
    mutex.runExclusive(() => {
      return convert(filePath)
        .catch(console.error)
        .then((res) => {
          console.log(`done ${filePath} ${res}`);
          return res;
        });
    });
  }
});

console.log(`watching ${watchPath}`);
