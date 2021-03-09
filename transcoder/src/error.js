const firestoreTranscodeRetrievalError = new Error('Error retrieving video transcode list from Firestore');
firestoreTranscodeRetrievalError.status = 500;

const firestoreDocumentNotFound = new Error('Firestore transcode document does not exist');
firestoreDocumentNotFound.status = 404;

function directoryCreationError(path) {
  const error = new Error(`Error creating new directory: ${path}. Possibly already exists`);
  error.status = 500;
  return error;
}

function directoryDeletionError(path) {
  const error = new Error(`Error deleting directory: ${path}`);
  error.status = 500;
  return error;
}

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

function firestoreRemoveVideoFileNameError(videoFileName) {
  const error = new Error(`Error removing ${videoFileName} from the transcode backlog. Stopping process to prevent infinite loop`);
  error.status = 500;
  return error;
}

module.exports = {
  firestoreTranscodeRetrievalError:  firestoreTranscodeRetrievalError,
  firestoreDocumentNotFound:         firestoreDocumentNotFound,
  directoryCreationError:            directoryCreationError,
  directoryDeletionError:            directoryDeletionError,
  directoryWriteError:               directoryWriteError,
  getFileNamesError:                 getFileNamesError,
  firestoreRemoveVideoFileNameError: firestoreRemoveVideoFileNameError
};