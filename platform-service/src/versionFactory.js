const _ = require('lodash');

const playout = require('./domain/v1.0/playout');
const error   = require('./error');

function getMethod(version, method) {
  const key     = `${version}_${method}`;
  const methods = {
    "v1.0_getMasterManifest": playout.getMasterManifest,
    "v1.0_getMediaManifest":  playout.getMediaManifest
  };

  const finalMethod = _.get(methods, key);

  if (!finalMethod) {
    throw error.versionError(version);
  }

  return finalMethod;
}

module.exports = {
  getMethod: getMethod
};
