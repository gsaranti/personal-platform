const admin     = require('firebase-admin');
const fs        = require('fs');
const {Storage} = require('@google-cloud/storage');

const storage   = new Storage();

if (fs.existsSync('./../personal-platform-service-account.json')) {
  const serviceAccount = require('../personal-platform-service-account.json');
  console.log("local dev");
  admin.initializeApp({
    credential:  admin.credential.cert(serviceAccount)
  });
} else {
  console.log("failed to connect to DB");
}

const db = admin.firestore();

db.settings({
  timestampsInSnapshots: true
});

const downloadBucketId = 'video-staging-bucket';

const videoMeta = {
  formats: ['hls3'],
  muxingTypes: ['ts'],
  renditions: [
    {
      bandwidth: "800000",
      rendition: "360p",
      resolution: "640x360"
    },
    {
      bandwidth: "1400000",
      rendition: "480p",
      resolution: "842x480"
    },
    {
      bandwidth: "2800000",
      rendition: "720p",
      resolution: "1280x720"
    },
    {
      bandwidth: "5000000",
      rendition: "1080p",
      resolution: "1920x1080"
    },
  ]
};

async function uploadVideo() {
  const path = "../../";
  const name = "";

  await db
    .collection("transcodes")
    .doc("videos")
    .collection(name)
    .doc("meta")
    .set(videoMeta);

    await storage
      .bucket(downloadBucketId)
      .upload(path, {
        destination: `${name}.mp4`
      });
}

uploadVideo()
  .then(() => {
    console.log("Video uploaded");
  })
  .catch(err => {
    console.error(err.toString());
  });