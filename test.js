const ffmpeg = require("fluent-ffmpeg");

(async () => {
  let input = "./folder/SampleVideo_1280x720_2mb.mkv";

  try {
    console.log(`command: ${input}`);
    const command = ffmpeg(input)
      .format("mp4")
      .output("./folder/SampleVideo_1280x720_2mb.mp4")
      .on("end", () => {
        console.log("end!");
        process.exit(0);
      });
    command.run();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
