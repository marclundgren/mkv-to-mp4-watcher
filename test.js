const convert = require("./convert");

convert("folder/SampleVideo_1280x720_2mb.mkv")
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .then((res) => {
    console.log(res);
    process.exit(0);
  });
