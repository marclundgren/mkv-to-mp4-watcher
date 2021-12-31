const fs = require("fs");
const mutexify = require("mutexify");
const loadFFmpeg = require("./loadFFmpeg");

let lock = mutexify();

const write = ({ fileName, newFileName, basePath, inExtension }, cb) => {
  lock(async function (release) {
    const { fetchFile, ffmpeg } = await loadFFmpeg();

    return fetchFile(`${basePath}/${fileName}.${inExtension}`).then(
      async (fetchedFile) => {
        await ffmpeg.FS("writeFile", `${fileName}.${inExtension}`, fetchedFile);

        const args = ["-y", "-i", `${fileName}.${inExtension}`, newFileName];
        await ffmpeg.run.apply(ffmpeg, args);

        await fs.promises.writeFile(
          `${basePath}/${newFileName}`,
          ffmpeg.FS("readFile", newFileName)
        );

        release(cb);
      }
    );
  });
};

module.exports = write;
