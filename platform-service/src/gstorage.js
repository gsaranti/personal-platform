const {Storage} = require('@google-cloud/storage');
const storage   = new Storage();

const bucketId   = 'george-personal-website-212820.appspot.com';

async function getFile(fileName) {
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

module.exports = {
  getFile: getFile
};
