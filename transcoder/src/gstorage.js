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
    console.error(`Error getting ${fileName} video file`, err.toString());
  }
}

module.exports = {
  getVideoFile: getVideoFile
};
