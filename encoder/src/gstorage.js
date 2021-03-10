const {Storage} = require('@google-cloud/storage');
const storage   = new Storage();

const bucketId    = 'george-personal-website-212820.appspot.com';

async function getVideoFile(fileName) {
  try {
    const data = await storage
      .bucket(bucketId)
      .file(fileName)
      .download();

    return data[0];
  } catch (err) {
    console.error(`Error retrieving ${fileName} from google storage`);
  }
}

async function uploadEncodedFiles(filePathInfo) {
  try {
    await storage
      .bucket(bucketId)
      .upload(filePathInfo.path, {
        destination: filePathInfo.storage_path,
        metadata: {
          cacheControl: 'public, max-age: 43200'
        }
      });
  } catch (err) {
    console.error(`error uploading ${filePathInfo.name} to google storage`);
  }
}

module.exports = {
  getVideoFile:       getVideoFile,
  uploadEncodedFiles: uploadEncodedFiles
};
