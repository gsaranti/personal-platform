const startEncoder = require('./startEncoder');

exports.start = async (event, context) => {
  const pubsubMessage = event.data;
  const gsData        = JSON.parse(Buffer.from(pubsubMessage, 'base64').toString());

  await startEncoder(gsData);
};
