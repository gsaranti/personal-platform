#!/usr/bin/env node

const _   = require('lodash');
const fs  = require('fs');
const tmp = require('tmp');

const db      = require('./src/db');
const gs      = require('./src/gstorage');
const error   = require('./src/error');
const contant = require('./src/constant');

async function transcode() {
  try {
    const videoFileNamesDoc = await db.getVideoTranscodeList();
    if (!videoFileNamesDoc) {
      throw error.firestoreDocumentNotFound;
    }
    console.log('Retrieved video transcode list');

    const videoFileNames = _.get(videoFileNamesDoc, 'filenames', []);

    for (const videoFileName of videoFileNames) {
      const videoFile = await gs.getVideoFile(videoFileName);
      console.log(`${videoFileName} retrieved from google storage`);

      tmp.dir(async function _tempDirCreated(err, path, unsafeCleanup) {
        if (err) throw err;

        const videoFilePath = `${path}/${videoFileName}`;

        await writeToFolder(videoFilePath, videoFile);
        console.log(`${videoFileName} successfully written to tmp directory`);

        await runFfmpeg(path, videoFilePath, videoFileName);

        const transcodedFileNames = await getTranscodedFileNames(path);

        const gsFolderName = _.get(videoFileName.split("."), '[0]');
        if (!gsFolderName) {
          throw error.buildGsFolderNameError(videoFileName);
        }

        for (const transcodedFileName of transcodedFileNames) {
          if (transcodedFileName !== videoFileName) {
            const transcodedFilePath = `${path}/${transcodedFileName}`;
            await gs.uploadTranscodedFiles(transcodedFilePath, transcodedFileName, gsFolderName);
          }
        }

        unsafeCleanup();
        console.log(`Process completed for ${videoFileName}`);
      });
    }
  } catch (err) {
    console.error(err.toString());
  }
}

async function writeToFolder(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, function(err) {
      if (err) {
        reject(error.directoryWriteError(filePath));
      }
      resolve();
    });
  });
}

function runFfmpeg(path, videoFilePath, videoFileName) {
  console.log(`Starting transcode process for ${videoFileName}`);
  const spawn = require('child_process').spawn;

  const args = contant.getFfmpegArgs(videoFilePath, path);

  return new Promise((resolve) => {
    const proc = spawn('ffmpeg', args);

    proc.stderr.on('data', function (data) {
      console.log(data.toString());
    });

    proc.stderr.on('end', function () {
      console.log(`${videoFileName} transcoded process complete`);
    });

    proc.stderr.on('exit', function () {
      console.log('child process exited');
    });

    proc.stderr.on('close', function() {
      console.log(`closing ${videoFileName} ffmpeg process`);
      resolve();
    });
  });
}

async function getTranscodedFileNames(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(error.getFileNamesError(path));
      }

      const fileNames = [];
      files.forEach(file => {
        fileNames.push(file);
      });
      resolve(fileNames);
    });
  });
}

transcode();
