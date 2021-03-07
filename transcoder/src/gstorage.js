const {Storage} = require('@google-cloud/storage');
const storage   = new Storage();

const error = require('./error');

const bucketId    = 'george-personal-website-212820.appspot.com';

async function getVideoFile(fileName) {
  try {
    const data = await storage
      .bucket(bucketId)
      .file(fileName)
      .download();

    return data[0];
  } catch (err) {
    throw error.gsRetrievalError(fileName);
  }
}

async function uploadTranscodedFiles(filePath, fileName, folderName) {
  try {
    await storage
      .bucket(bucketId)
      .upload(filePath, {
        destination: `${folderName}/${fileName}`,
        metadata: {
          cacheControl: 'public, max-age: 43200'
        }
      });
  } catch (err) {
    console.error(`error uploading ${fileName} to google storage`);
  }
}

module.exports = {
  getVideoFile:          getVideoFile,
  uploadTranscodedFiles: uploadTranscodedFiles
};
