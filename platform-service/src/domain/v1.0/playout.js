const config         = require('../../config');
const utils          = require('../../utils');
const gstorage       = require('../../gstorage');
const db             = require('../../db');
const error          = require('../../error');
const MasterManifest = require('../../assemblers/hls/masterManifest');

async function getMasterManifest(id, format, muxingType, version) {
  if (config.PUBLIC_VIDEOS.includes(id)) {
    const manifestPath = `/manifests/${format}/${muxingType}/${id}.m3u8`;
    const manifest     = await utils.checkLocalFiles(manifestPath);
    if (manifest) {
      return manifest
    }

    const videoData = await db.getVideoData(id);
    if (!videoData) {
      throw error.videoNotFound(id);
    }

    const masterManifest = new MasterManifest(videoData, id, format, muxingType, version);

    if (masterManifest.verifyManifestRequest()) {
      const final = masterManifest.build();
      await utils.writeToDirectory(`/manifests/${format}/${muxingType}/${id}.m3u8`, final);
      return final;
    } else {
      throw error.masterManifestNotFound(id);
    }
  }
}

async function getMediaManifest(id, format, muxingType, rendition) {
  if (config.PUBLIC_VIDEOS.includes(id)) {
    const localManifestPath = `/manifests/${format}/${muxingType}/${id}${rendition}.m3u8`;
    const manifest          = await utils.checkLocalFiles(localManifestPath);
    if (manifest) {
      return manifest;
    }

    const gsFilePath = `${id}/${rendition}/${rendition}.m3u8`;
    const gsManifest = await gstorage.getFile(gsFilePath);
    if (gsManifest) {
      const mediaManifest = configureMediaManifest(gsManifest, id, rendition);
      await utils.writeToDirectory(localManifestPath, mediaManifest);
      return mediaManifest;
    }
  }
}

function configureMediaManifest(manifest, id, rendition) {
  const url            = `${config.SEGMENTS_URL}/${id}/${rendition}`;
  const parsedManifest = manifest.split('\n');
  const mediaManifest  = [];

  for (const line of parsedManifest) {
    if (line.includes('.ts')) {
      mediaManifest.push(`${url}/${line}`);
    } else {
      mediaManifest.push(line);
    }
  }

  return mediaManifest.join('\n');
}

module.exports = {
  getMasterManifest: getMasterManifest,
  getMediaManifest:  getMediaManifest
};
