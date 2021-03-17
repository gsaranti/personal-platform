const _  = require('lodash');
const fs = require('fs').promises;

const db     = require('./db');
const config = require('./config');
const error  = require('./error');

async function setPublicVideos() {
  const publicVideosDoc = await db.getPublicVideos();
  config.PUBLIC_VIDEOS  = _.get(publicVideosDoc, 'videoNames', []);
}

async function buildVideoDirectoryStructure() {
  const transcodeMeta   = await db.getTranscodeMeta();
  config.TRANSCODE_META = transcodeMeta;

  const formats     = _.get(transcodeMeta, 'formats', []);
  const muxingTypes = _.get(transcodeMeta, 'muxingTypes', []);

  for (const format of formats) {
    for (const type of muxingTypes) {
      await createDirectory(`manifest/${format}/${type}`);
    }
  }
}

async function createDirectory(directoryPath) {
  try {
    await fs.mkdir(__dirname + directoryPath, { recursive: true });
  } catch (err) {
    console.error(`Error building directory ${directoryPath}: ${err.toString()}`);
  }
}

async function writeToDirectory(filePath, data) {
  try {
    await fs.writeFile(__dirname + filePath, data);
  } catch (err) {
    console.error(`Error writing file to ${filePath}`);
  }
}

async function checkLocalFiles(filePath) {
  try {
    return fs.readFile(__dirname + filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return;
    }
    throw error.fileCheckError(filePath, err)
  }
}

module.exports = {
  setPublicVideos:              setPublicVideos,
  buildVideoDirectoryStructure: buildVideoDirectoryStructure,
  writeToDirectory:             writeToDirectory,
  checkLocalFiles:              checkLocalFiles
};
