#!/usr/bin/env node

const _     = require('lodash');
const fs    = require('fs');
const axios = require('axios');

const db      = require('./src/db');
const gs      = require('./src/gstorage');
const error   = require('./src/error');
const contant = require('./src/constant');

async function transcode() {
  let videoFileNames = await getVideoFileNames();
  console.log('Retrieved video transcode backlog');

  while (videoFileNames.length) {
    for (const videoFileName of videoFileNames) {
      await db.removeFromVideoTranscodeList(videoFileName);
      console.log(`${videoFileName} removed from transcode backlog`);

      const tmpDirectoryName = _.get(videoFileName.split("."), '[0]');
      if (!tmpDirectoryName) {
        console.error(`Error creating directory name for ${videoFileName}`);
        continue;
      }

      const tmpDirectoryPath        = `./${tmpDirectoryName}`;
      const renditionDirectoryPaths = getRenditionDirectoryPaths(tmpDirectoryPath);

      try {
        await createTmpDirectory(tmpDirectoryPath);
        console.log(`Temporary directory created: ${tmpDirectoryPath}`);

        for (const path of Object.values(renditionDirectoryPaths)) {
          await createTmpDirectory(path);
          console.log(`Rendition directory created: ${path}`);
        }
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

        const encodedFileInfo = [];
        for (const rendition of contant.renditions) {
          const renditionFilePaths = await getEncodedFilePaths(renditionDirectoryPaths, tmpDirectoryName, rendition);
          encodedFileInfo.push(...renditionFilePaths);
        }

        for (const fileInfo of encodedFileInfo) {
          await gs.uploadEncodedFiles(fileInfo);
        }

        console.log('Encoded files successfully uploaded to google storage');
      } catch (err) {
        console.error(err.toString());
      }

      try {
        await deleteTmpDirectory(tmpDirectoryPath);
        console.log('Temporary directory deleted');
      } catch (err) {
        console.error(err.toString())
      }

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
        return reject(error.directoryCreationError(directoryPath));
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

async function getEncodedFilePaths(renditionDirectoryPaths, tmpDirectoryName, rendition) {
  return new Promise((resolve, reject) => {
    const renditionDirectoryPath = renditionDirectoryPaths[rendition];

    fs.readdir(renditionDirectoryPath, (err, files) => {
      if (err) {
        return reject(error.getFileNamesError(renditionDirectoryPath));
      }

      const encodedFilePaths = [];
      files.forEach(file => {
        encodedFilePaths.push({
          path: `${renditionDirectoryPath}/${file}`,
          storage_path: `${tmpDirectoryName}/${rendition}/${file}`,
          name: file
        });
      });
      resolve(encodedFilePaths);
    });
  });
}

function getRenditionDirectoryPaths(tmpDirectoryPath) {
  const pathInfo = {};
  for (const rendition of contant.renditions) {
    pathInfo[rendition] = `${tmpDirectoryPath}/${rendition}`
  }
  return pathInfo;
}

transcode()
  .then(() => {
    console.log("All video transcode processes completed");
    axios.post(contant.stopUrl).then(() => {
      console.log("Stopping GCE instance");
    }).catch((err) => {
      console.log(err.toString());
    });
  })
  .catch((err) => {
    console.log(err.toString());
  });
