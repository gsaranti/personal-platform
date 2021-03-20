const _              = require('lodash');
const fs             = require('fs').promises;
const {PubSub}       = require('@google-cloud/pubsub');
const { v4: uuidv4 } = require('uuid');

const db     = require('./db');
const config = require('./config');
const error  = require('./error');

const pubSubClient = new PubSub();

const BASE_PATH = config.GAE_SERVICE ? '/tmp' : __dirname;

async function setPublicVideos() {
  const publicVideosDoc = await db.getPublicVideos();
  config.PUBLIC_VIDEOS  = _.get(publicVideosDoc, 'videoNames', []);
}

async function buildVideoDirectoryStructure() {
  const transcodeMeta   = await db.getTranscodeMeta();
  config.TRANSCODE_META = transcodeMeta;

  const formats     = _.get(transcodeMeta, 'formats', []);
  const muxingTypes = _.get(transcodeMeta, 'muxingTypes', []);

  for (const format of formats) {
    for (const type of muxingTypes) {
      await createDirectory(`/manifests/${format}/${type}`);
    }
  }
}

async function createDirectory(directoryPath) {
  try {
    await fs.mkdir(BASE_PATH + directoryPath, { recursive: true });
  } catch (err) {
    console.error(`Error building directory ${directoryPath}: ${err.toString()}`);
  }
}

async function writeToDirectory(filePath, data) {
  try {
    await fs.writeFile(BASE_PATH + filePath, data);
  } catch (err) {
    console.error(`Error writing file to ${filePath}`);
  }
}

async function checkLocalFiles(filePath) {
  try {
    return await fs.readFile(BASE_PATH + filePath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return;
    }
    throw error.fileCheckError(filePath, err)
  }
}

async function subscribeToPublicVideosUpdateTopic() {
  const subscriptionName = `platform-service-${uuidv4()}`;
  const options          = {
    "expirationPolicy": {
      "ttl": {
        "seconds": 86400
      }
    },
    "messageRetentionDuration": 3600
  };

  try {
    await pubSubClient.topic(config.PUBLIC_VIDEOS_UPDATE_TOPIC).createSubscription(subscriptionName, options);
  } catch (err) {
    console.error(`Failure creating subscription for public-videos-update topic: ${err.toString()}`);
    return;
  }

  try {
    const subscription = pubSubClient.topic(config.PUBLIC_VIDEOS_UPDATE_TOPIC).subscription(subscriptionName);

    const messageHandler = message => {
      message.ack();
      setPublicVideos().then(() => {
        console.log('Public videos updated');
      }).catch((err) => {
        console.error(err.toString());
      });
    };

    subscription.on('message', messageHandler);
    console.log(`Subscription ${subscriptionName} subscribed to public-videos-update topic`);
  } catch (err) {
    console.error(`Failure subscribing to public-videos-update topic, ${err.toString()}`)
  }
}

module.exports = {
  setPublicVideos:                    setPublicVideos,
  buildVideoDirectoryStructure:       buildVideoDirectoryStructure,
  writeToDirectory:                   writeToDirectory,
  checkLocalFiles:                    checkLocalFiles,
  subscribeToPublicVideosUpdateTopic: subscribeToPublicVideosUpdateTopic
};
