#!/usr/bin/env node

const _   = require('lodash');
const fs  = require('fs');
const tmp = require('tmp');

const db      = require('./src/db');
const gs      = require('./src/gstorage');
const error   = require('./src/error');
const contant = require('./src/constant');

async function transcode() {
  let videoFileNames = await getVideoFileNames();
  console.log('Retrieved video transcode backlog');

  while (videoFileNames.length) {
    for (const videoFileName of videoFileNames) {
      const videoFile = await gs.getVideoFile(videoFileName);

      if (!videoFile) {
        continue;
      }
      console.log(`${videoFileName} retrieved from google storage`);

      const transcodeProcess = new Promise((resolve) => {
        tmp.dir(async function _tempDirCreated(err, path, unsafeCleanup) {
          if (err) {
            console.error(err.toString());
            return resolve();
          }

          try {
            const videoFilePath = `${path}/${videoFileName}`;

            await writeToFolder(videoFilePath, videoFile);
            console.log(`${videoFileName} successfully written to tmp directory`);

            await runFfmpeg(path, videoFilePath, videoFileName);

            const transcodedFileNames = await getTranscodedFileNames(path);

            const gsFolderName = _.get(videoFileName.split("."), '[0]');
            if (!gsFolderName) {
              console.error(`Error creating folder name for ${videoFileName}`);
              unsafeCleanup();
              return resolve();
            }

            for (const transcodedFileName of transcodedFileNames) {
              if (transcodedFileName !== videoFileName) {
                const transcodedFilePath = `${path}/${transcodedFileName}`;
                await gs.uploadTranscodedFiles(transcodedFilePath, transcodedFileName, gsFolderName);
              }
            }

            await db.removeFromVideoTranscodeList(videoFileName);
            unsafeCleanup();

            console.log(`${videoFileName} removed from transcode backlog`);
            console.log(`Process completed for ${videoFileName}`);
            resolve();
          } catch (err) {
            unsafeCleanup();
            console.error(err.toString());
          }
        });
      });

      await transcodeProcess;
    }

    videoFileNames = getVideoFileNames();
  }
}

async function getVideoFileNames() {
  const videoFileNamesDoc = await db.getVideoTranscodeList();
  return _.get(videoFileNamesDoc, 'filenames', []);
}

async function writeToFolder(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, function(err) {
      if (err) {
        return reject(error.directoryWriteError(filePath));
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
      console.log(`${videoFileName} transcode process complete`);
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
        return reject(error.getFileNamesError(path));
      }

      const fileNames = [];
      files.forEach(file => {
        fileNames.push(file);
      });
      resolve(fileNames);
    });
  });
}

transcode()
  .then(() => {
    console.log("All video transcode processes completed")
  })
  .catch((err) => {
    console.log(err.toString());
  });
