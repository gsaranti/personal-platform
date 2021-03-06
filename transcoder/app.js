#!/usr/bin/env node

const _ = require('lodash');

const db = require('./src/db');
const gs = require('./src/gstorage');

async function transcode() {
  const videoFileNamesDoc = await db.getVideoTranscodeList();
  if (!videoFileNamesDoc) {
    return;
  }

  const videoFileNames = _.get(videoFileNamesDoc, 'filenames', []);

  for (const videoFileName of videoFileNames) {
    const videoFile = await gs.getVideoFile(videoFileName);

  }

}

transcode();
