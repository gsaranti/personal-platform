function versionError(version) {
  const err  = new Error(`${version} is not a valid version for this endpoint`);
  err.status = 400;
  return err;
}

function setPublicVideosError(error) {
  const err  = new Error(`Error retrieving public videos: ${error.toString()}`);
  err.status = 500;
  return err;
}

function getTranscodeMetaError(error) {
  const err  = new Error(`Error retrieving transcode meta: ${error.toString()}`);
  err.status = 500;
  return err;
}

function fileCheckError(path, error) {
  const err  = new Error(`Error retrieving local file ${path}: ${error.toString()}`);
  err.status = 500;
  return err;
}

function videoNotFound(id) {
  const err  = new Error(`${id} not found`);
  err.status = 404;
  return err;
}

function masterManifestNotFound(id) {
  const err  = new Error(`Master manifest not found for ${id}`);
  err.status = 404;
  return err;
}

function mediaManifestNotFound(id) {
  const err  = new Error(`Media manifest not found for ${id}`);
  err.status = 404;
  return err;
}

module.exports = {
  versionError:           versionError,
  setPublicVideosError:   setPublicVideosError,
  getTranscodeMetaError:  getTranscodeMetaError,
  fileCheckError:         fileCheckError,
  videoNotFound:          videoNotFound,
  masterManifestNotFound: masterManifestNotFound,
  mediaManifestNotFound:  mediaManifestNotFound
};
