function getFfmpegArgs(videoFilePath, path) {
  return [
    '-hide_banner',
    '-y',
    '-i', videoFilePath,
    '-vf', 'scale=w=640:h=360:force_original_aspect_ratio=decrease',
    '-c:a', 'aac',
    '-ar', '48000',
    '-c:v', 'h264',
    '-profile:v', 'main',
    '-crf', '20',
    '-sc_threshold', '0',
    '-g', '48',
    '-keyint_min', '48',
    '-hls_time', '3',
    '-hls_playlist_type', 'vod',
    '-b:v', '800k',
    '-maxrate', '856k',
    '-bufsize', '1200k',
    '-b:a', '96k',
    `${path}/360p.m3u8`
  ];
}

module.exports = {
  getFfmpegArgs: getFfmpegArgs
};
