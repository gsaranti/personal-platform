const VALID_RENDITIONS = {
  '360p': {
    bandwidth: '800000',
    resolution: '640x360'
  },
  '480p': {
    bandwidth: '1400000',
    resolution: '842x480'
  },
  '720p': {
    bandwidth: '2800000',
    resolution: '1280x720'
  },
  '1080p': {
    bandwidth: '5000000',
    resolution: '1920x1080'
  },
};

const MASTER_MANIFEST_TOP = [
  '#EXTM3U',
  '#EXT-X-VERSION:3'
];

module.exports = {
  VALID_RENDITIONS:    VALID_RENDITIONS,
  MASTER_MANIFEST_TOP: MASTER_MANIFEST_TOP
};