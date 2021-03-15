const admin = require('firebase-admin');
const fs    = require('fs');

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

async function upsertFileName(filename) {
  db
    .collection('transcodes')
    .doc('backlog')
    .update({
      filenames: FieldValue.arrayUnion(filename)
    });
}

module.exports = {
  upsertFileName: upsertFileName
};
