const ffmpeg = require("fluent-ffmpeg");

let input = "folder/SampleVideo_1280x720_2mb.mkv";

ffmpeg(input).format("mp4").output("outputfile.mp4").run();
