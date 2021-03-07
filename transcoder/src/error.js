const firestoreTranscodeRetrievalError = new Error('Error retrieving video transcode list from Firestore');
firestoreTranscodeRetrievalError.status = 500;

const firestoreDocumentNotFound = new Error('Firestore transcodes document does not exist');
firestoreDocumentNotFound.status = 404;

function directoryWriteError(path) {
  const error = new Error(`Error writing video to ${path}`);
  error.status = 500;
  return error;
}

function getFileNamesError(path) {
  const error = new Error(`Error getting file names from ${path}`);
  error.status = 500;
  return error;
}

function buildGsFolderNameError(videoName) {
  const error = new Error(`Error creating folder name for ${videoName}`);
  error.status = 500;
  return error;
}

function firestoreRemoveVideoFileNameError(videoFileName) {
  const error = new Error(`Error removing ${videoFileName} from the transcode backlog`);
  error.status = 500;
  return error;
}

module.exports = {
  firestoreTranscodeRetrievalError:  firestoreTranscodeRetrievalError,
  firestoreDocumentNotFound:         firestoreDocumentNotFound,
  directoryWriteError:               directoryWriteError,
  getFileNamesError:                 getFileNamesError,
  buildGsFolderNameError:            buildGsFolderNameError,
  firestoreRemoveVideoFileNameError: firestoreRemoveVideoFileNameError
};