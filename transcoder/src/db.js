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

const db         = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

db.settings({
  timestampsInSnapshots: true
});

async function getVideoTranscodeList() {
  try {
    const doc = await db
      .collection('transcodes')
      .doc('backlog')
      .get();

    if (doc.exists) {
      return doc.data();
    }
  } catch (err) {
    console.error('Error retrieving video transcode list from Firestore');
  }
}

async function removeFromVideoTranscodeList(videoFileName) {
  try {
    await db
      .collection('transcodes')
      .doc('backlog')
      .update({
        filenames: FieldValue.arrayRemove(videoFileName)
      });
  } catch (err) {
    throw error.firestoreRemoveVideoFileNameError(videoFileName);
  }
}

module.exports = {
  getVideoTranscodeList:        getVideoTranscodeList,
  removeFromVideoTranscodeList: removeFromVideoTranscodeList
};