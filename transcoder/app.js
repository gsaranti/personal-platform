#!/usr/bin/env node

const _   = require('lodash');
const fs  = require('fs');

const db      = require('./src/db');
const gs      = require('./src/gstorage');
const error   = require('./src/error');
const contant = require('./src/constant');

async function transcode() {
  let videoFileNames = await getVideoFileNames();
  console.log('Retrieved video transcode backlog');

  while (videoFileNames.length) {
    for (const videoFileName of videoFileNames) {
      const tmpDirectoryName = _.get(videoFileName.split("."), '[0]');
      if (!tmpDirectoryName) {
        console.error(`Error creating directory name for ${videoFileName}`);
        continue;
      }

      const tmpDirectoryPath = `./${tmpDirectoryName}`;
      try {
        await createTmpDirectory(tmpDirectoryPath);
        console.log('Temporary directory created');
      } catch (err) {
        console.error(err.toString());
        continue;
      }

      const videoFile = await gs.getVideoFile(videoFileName);
      if (!videoFile) {
        continue;
      }
      console.log(`${videoFileName} retrieved from google storage`);

      try {
        const videoFilePath = `${tmpDirectoryPath}/${videoFileName}`;

        await writeToDirectory(videoFilePath, videoFile);
        console.log(`${videoFileName} successfully written to tmp directory`);

        await runFfmpeg(tmpDirectoryPath, videoFilePath, videoFileName);

        const encodedFileNames = await getEncodedFileNames(tmpDirectoryPath, videoFileName);

        for (const encodedFileName of encodedFileNames) {
          const encodedFilePath = `${tmpDirectoryPath}/${encodedFileName}`;
          await gs.uploadEncodedFiles(encodedFilePath, encodedFileName, tmpDirectoryName);
        }
      } catch (err) {
        console.error(err.toString());
      }

      try {
        await deleteTmpDirectory(tmpDirectoryPath);
        console.log('Temporary directory deleted');
      } catch (err) {
        console.error(err.toString())
      }

      await db.removeFromVideoTranscodeList(videoFileName);
      console.log(`${videoFileName} removed from transcode backlog`);
      console.log(`Process completed for ${videoFileName}`);
    }

    videoFileNames = getVideoFileNames();
  }
}

async function getVideoFileNames() {
  const videoFileNamesDoc = await db.getVideoTranscodeList();
  return _.get(videoFileNamesDoc, 'filenames', []);
}

async function createTmpDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directoryPath, function(err) {
      if (err) {
        return reject(error.directoryCreationError());
      }
      resolve();
    })
  });
}

async function writeToDirectory(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, function(err) {
      if (err) {
        return reject(error.directoryWriteError(filePath));
      }
      resolve();
    });
  });
}

async function deleteTmpDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.rmdir(directoryPath, { recursive: true }, function(err) {
      if (err) {
        return reject(error.directoryDeletionError(directoryPath));
      }
      resolve();
    })
  });
}

function runFfmpeg(tmpDirectoryPath, videoFilePath, videoFileName) {
  console.log(`Starting encoding process for ${videoFileName}`);
  const spawn = require('child_process').spawn;

  const args = contant.getFfmpegArgs(videoFilePath, tmpDirectoryPath);

  return new Promise((resolve) => {
    const proc = spawn('ffmpeg', args);

    proc.stderr.on('data', function (data) {
      console.log(data.toString());
    });

    proc.stderr.on('end', function () {
      console.log(`${videoFileName} encode process complete`);
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

async function getEncodedFileNames(tmpDirectoryPath, videoFileName) {
  return new Promise((resolve, reject) => {
    fs.readdir(tmpDirectoryPath, (err, files) => {
      if (err) {
        return reject(error.getFileNamesError(tmpDirectoryPath));
      }

      const fileNames = [];
      files.forEach(file => {
        if (file !== videoFileName) {
          fileNames.push(file);
        }
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
