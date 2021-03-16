const config   = require('../../config');
const utils    = require('../../utils');
const gstorage = require('../../gstorage');

async function getMasterManifest(version, id) {
  if (config.PUBLIC_VIDEOS.includes(id)) {
    const manifestPath = `/manifests/${version}/${id}/${id}.m3u8`;
    const manifest          = await utils.checkLocalFiles(manifestPath);
    if (manifest) {
      return verifyMasterManifest(manifest)
    }
  }
}

function verifyMasterManifest(manifest) {
  if (config.GAE_SERVICE) {
    return manifest;
  }

  const parsedManifest = manifest.split('\n');
  parsedManifest.map(line => {
    if (line.includes('https://')) {
      return line.replace(config.MANIFEST_DOMAIN, config.LOCAL_MANIFEST_DOMAIN);
    }
    return line;
  });

  return parsedManifest.join('\n');
}

async function getMediaManifest(version, id, rendition) {
  if (config.PUBLIC_VIDEOS.includes(id)) {
    const localManifestPath = `/manifests/${version}/${id}/${rendition}.m3u8`;
    const manifest          = await utils.checkLocalFiles(localManifestPath);
    if (manifest) {
      return manifest;
    }
    const gsFilePath = `${id}/${rendition}p/${rendition}p.m3u8`;
    const gsManifest = await gstorage.getFile(gsFilePath);
    if (gsManifest) {
      await utils.writeToDirectory(`/manifests/${version}/${id}/${rendition}p.m3u8`, gsManifest);
      return gsManifest;
    }
  }
}

module.exports = {
  getMasterManifest: getMasterManifest,
  getMediaManifest:  getMediaManifest
};