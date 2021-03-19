module.exports = {
  GAE_SERVICE: process.env.GAE_SERVICE,
  PUBLIC_VIDEOS_UPDATE_TOPIC: process.env.PUBLIC_VIDEOS_UPDATE_TOPIC || 'projects/george-personal-website-212820/topics/public-videos-update',
  MANIFEST_DOMAIN: process.env.MANIFEST_DOMAIN || 'https://api.georgesarantinos.com',
  LOCAL_MANIFEST_DOMAIN: 'http://localhost:3000',
  VALID_VERSIONS: ['v1.0'],
  SEGMENTS_URL: 'https://storage.googleapis.com/george-personal-website-212820.appspot.com'
};
