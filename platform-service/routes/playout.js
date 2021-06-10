const express = require('express');
const router = express.Router();

const versionFactory = require('../src/versionFactory');

router.get('/:version/:id/:format/:muxingType/master.m3u8', async function(req, res, next) {
  const version    = req.params.version;
  const id         = req.params.id;
  const format     = req.params.format;
  const muxingType = req.params.muxingType;

  try {
    const method = versionFactory.getMethod(version, 'getMasterManifest');
    const masterPlaylist = await method(id, format, muxingType, version);
    res.set({
      'Content-Type': 'application/x-mpegURL',
      'Cache-Control': 'public, max-age=3600, immutable'
    }).send(masterPlaylist);
  } catch (err) {
    next(err);
  }
});

router.get('/:version/:id/:format/:muxingType/:rendition/playlist.m3u8', async function(req, res, next) {
  const version    = req.params.version;
  const id         = req.params.id;
  const format     = req.params.format;
  const muxingType = req.params.muxingType;
  const rendition  = req.params.rendition;

  try {
    const method = versionFactory.getMethod(version, 'getMediaManifest');
    const mediaPlaylist = await method(id, format, muxingType, rendition);
    res.set({
      'Content-Type': 'application/x-mpegURL',
      'Cache-Control': 'public, max-age=3600, immutable'
    }).send(mediaPlaylist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
