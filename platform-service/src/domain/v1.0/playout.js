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
    const gsFilePath = `${id}/${rendition}/${rendition}.m3u8`;
    const gsManifest = await gstorage.getFile(gsFilePath);
    if (gsManifest) {
      const finalManifest = configureMediaManifest(gsManifest, id, rendition);
      await utils.writeToDirectory(`/manifests/${version}/${id}/${rendition}.m3u8`, finalManifest);
      return finalManifest;
    }
  }
}

function configureMediaManifest(manifest, id, rendition) {
  const stringManifest = manifest.toString();
  const url            = `${config.SEGMENTS_URL}/${id}/${rendition}`;
  const parsedManifest = stringManifest.split('\n');
  const newManifest    = [];

  for (const line of parsedManifest) {
    if (line.includes('.ts')) {
      newManifest.push(`${url}/${line}`);
    } else {
      newManifest.push(line);
    }
  }

  return newManifest.join('\n');
}

module.exports = {
  getMasterManifest: getMasterManifest,
  getMediaManifest:  getMediaManifest
};