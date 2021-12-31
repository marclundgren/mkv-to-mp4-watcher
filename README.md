# mkv-to-mp4-watcher

## Install

```sh
npm install
```

## Usage

```sh
WATCH="**/*.mkv" yarn start
```

## Testing

1. download assets from [here](https://www.appsloveworld.com/sample-mkv-video-sample-mkv-files/)
2. run `npm test`

## Notes

- ffmpeg.wasm isnt supported on raspberry pi (yet)
- fluent-ffmpeg/node-fluent-ffmpeg is actively looking for maintainers so the goal is to get off this dependency
