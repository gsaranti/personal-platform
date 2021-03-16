const express = require('express');
const router = express.Router();

const versionFactory = require('../src/versionFactory');

router.get('/:version/:id/master.m3u8', async function(req, res, next) {
  const version = req.params.version;
  const videoId = req.params.id;

  try {
    const method = versionFactory.getMethod(version, 'getMasterManifest');
    const masterPlaylist = await method(version, videoId);
    res.set('Content-Type', 'application/x-mpegURL').send(masterPlaylist);
  } catch (err) {
    next(err);
  }
});

router.get('/:version/:id/:rendition/playlist.m3u8', async function(req, res, next) {
  const version   = req.params.version;
  const videoId   = req.params.id;
  const rendition = req.params.rendition;

  try {
    const method = versionFactory.getMethod(version, 'getMediaManifest');
    const masterPlaylist = await method(version, videoId, rendition);
    res.set('Content-Type', 'application/x-mpegURL').send(masterPlaylist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
