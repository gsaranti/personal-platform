const admin = require('firebase-admin');
const fs    = require('fs');

const error = require('./error');

if (fs.existsSync('./../personal-platform-service-account.json')) {
  const serviceAccount = require('../../personal-platform-service-account.json');
  console.log("local dev");
  admin.initializeApp({
    credential:  admin.credential.cert(serviceAccount)
  });
} else {
  console.log("gae");
  admin.initializeApp();
}

const db = admin.firestore();

db.settings({
  timestampsInSnapshots: true
});

async function getPublicVideos() {
  try {
    const doc = await db
      .collection('transcodes')
      .doc('public')
      .get();

    if (doc.exists) {
      return doc.data();
    }
  } catch (err) {
    throw error.setPublicVideosError(err);
  }
}

async function getTranscodeMeta() {
  try {
    const doc = await db
      .collection('transcodes')
      .doc('meta')
      .get();

    if (doc.exists) {
      return doc.data();
    }
  } catch (err) {
    throw error.getTranscodeMetaError(err);
  }
}

async function getVideoData(id) {
  try {
    const doc = await db
      .collection('transcodes')
      .doc('videos')
      .collection(id)
      .doc('meta')
      .get();

    if (doc.exists) {
      return doc.data();
    }
  } catch (err) {
    console.error(`Error getting video data for ${id}: ${err.toString()}`);
  }
}

module.exports = {
  getPublicVideos:  getPublicVideos,
  getTranscodeMeta: getTranscodeMeta,
  getVideoData:     getVideoData
};
