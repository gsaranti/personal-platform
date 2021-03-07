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
    throw error.firestoreTranscodeRetrievalError;
  }
}

module.exports = {
  getVideoTranscodeList: getVideoTranscodeList
};