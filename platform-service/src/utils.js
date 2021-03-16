const _  = require('lodash');
const fs = require('fs');

const db       = require('./db');
const config   = require('./config');
const error    = require('./error');
const constant = require('./constant');

async function setPublicVideos() {
  const publicVideosDoc = await db.getPublicVideos();
  config.PUBLIC_VIDEOS  = _.get(publicVideosDoc, 'videoNames', []);

  for (const video of config.PUBLIC_VIDEOS) {
    for (const version of config.VALID_VERSIONS) {
      try {
        createDirectory(`/manifests/${version}/${video}`);

        const masterManifest = buildMasterManifest(video, version);
        await writeToDirectory(`/manifests/${version}/${video}/${video}.m3u8`, masterManifest);
      } catch (err) {
        console.error(`Error setting master manifest for ${version} ${video}: ${err.toString()}`);
      }
    }
  }
}

function buildMasterManifest(video, version) {
  const domain       = config.GAE_SERVICE ? config.MANIFEST_DOMAIN : config.LOCAL_MANIFEST_DOMAIN;
  const manifestTags = _.cloneDeep(constant.MASTER_MANIFEST_TOP);

  for (const rendition in constant.VALID_RENDITIONS) {
    const bandwidth  = _.get(constant.VALID_RENDITIONS, `${rendition}.bandwidth`);
    const resolution = _.get(constant.VALID_RENDITIONS, `${rendition}.resolution`);
    if (bandwidth && resolution) {
      const stream = [
        `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}`,
        `${domain}/playout/${version}/${video}/${rendition}/playlist.m3u8`
      ];
      manifestTags.push(...stream);
    }
  }
  return manifestTags.join('\n');
}

function createDirectory(directoryPath) {
  fs.mkdirSync(__dirname + directoryPath, { recursive: true });
}

function writeToDirectory(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + filePath, data, function(err) {
      if (err) {
        return reject(error.writeToDirectoryError(filePath));
      }
      resolve();
    });
  });
}

function checkLocalFiles(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + filePath, 'utf8', function(err, data) {
      if (err) {
        if (err.code === 'ENOENT') {
          return resolve();
        }
        return reject(error.fileCheckError(filePath, err));
      }
      if (data) {
        return resolve(data);
      }
      resolve();
    });
  });
}

module.exports = {
  setPublicVideos:  setPublicVideos,
  writeToDirectory: writeToDirectory,
  checkLocalFiles:  checkLocalFiles
};
