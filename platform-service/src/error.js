function versionError(version) {
  const err  = new Error(`${version} is not a valid version for this endpoint`);
  err.status = 400;
  return err;
}

function fileCheckError(path, error) {
  const err  = new Error(`Error retrieving local file ${path}: ${error.toString()}`);
  err.status = 500;
  return err;
}

function writeToDirectoryError(path) {
  const error = new Error(`Error writing file to ${path}`);
  error.status = 500;
  return error;
}

module.exports = {
  versionError:          versionError,
  fileCheckError:        fileCheckError,
  writeToDirectoryError: writeToDirectoryError
};
