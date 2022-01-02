const ffmpeg = require("fluent-ffmpeg");
const Mutex = require("async-mutex").Mutex;
const { E_CANCELED } = require("async-mutex");

const mutex = new Mutex();

const convert = async (input) => {
  console.log(`convert: ${input}`);
  return new Promise((resolve, reject) => {
    try {
      console.log(`command: ${input} mp4 ${input.replace(".mkv", ".mp4")}`);
      const command = ffmpeg(input)
        .format("mp4")
        .output(input.replace(".mkv", ".mp4"))
        .on("end", () => {
          console.log("end!");
          resolve(input);
        });
      command.run();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

const run = async (input) => {
  try {
    console.log(`mutex.runExclusive: ${input}`);
    await mutex.runExclusive(() => {
      console.log("mutex.runExclusive: acquired");
      return convert(input);
    });
  } catch (e) {
    if (e === E_CANCELED) {
      // ...
      console.log("cancelled...");
    } else {
      throw e;
    }
  }
};

const main = async () => {
  [
    "./folder1/SampleVideo_1280x720_2mb-1.mkv",
    "./folder1/SampleVideo_1280x720_2mb-2.mkv",
    "./folder1/SampleVideo_1280x720_2mb-3.mkv",
    "./folder1/SampleVideo_1280x720_2mb-4.mkv",
    "./folder1/SampleVideo_1280x720_2mb-5.mkv",
    "./folder1/SampleVideo_1280x720_2mb-6.mkv",
    "./folder1/SampleVideo_1280x720_2mb-7.mkv",
    "./folder1/SampleVideo_1280x720_2mb-8.mkv",
    "./folder1/SampleVideo_1280x720_2mb-9.mkv",
    "./folder1/SampleVideo_1280x720_2mb-0.mkv",
    "./folder2/SampleVideo_1280x720_2mb-1.mkv",
    "./folder2/SampleVideo_1280x720_2mb-2.mkv",
    "./folder2/SampleVideo_1280x720_2mb-3.mkv",
    "./folder2/SampleVideo_1280x720_2mb-4.mkv",
    "./folder2/SampleVideo_1280x720_2mb-5.mkv",
    "./folder2/SampleVideo_1280x720_2mb-6.mkv",
    "./folder2/SampleVideo_1280x720_2mb-7.mkv",
    "./folder2/SampleVideo_1280x720_2mb-8.mkv",
    "./folder2/SampleVideo_1280x720_2mb-9.mkv",
    "./folder2/SampleVideo_1280x720_2mb-0.mkv",
    "./folder3/SampleVideo_1280x720_2mb-1.mkv",
    "./folder3/SampleVideo_1280x720_2mb-2.mkv",
    "./folder3/SampleVideo_1280x720_2mb-3.mkv",
    "./folder3/SampleVideo_1280x720_2mb-4.mkv",
    "./folder3/SampleVideo_1280x720_2mb-5.mkv",
    "./folder3/SampleVideo_1280x720_2mb-6.mkv",
    "./folder3/SampleVideo_1280x720_2mb-7.mkv",
    "./folder3/SampleVideo_1280x720_2mb-8.mkv",
    "./folder3/SampleVideo_1280x720_2mb-9.mkv",
    "./folder3/SampleVideo_1280x720_2mb-0.mkv",
  ].forEach((path) => {
    console.log(`running ${path}`);
    run(path);
  });
};

main();
