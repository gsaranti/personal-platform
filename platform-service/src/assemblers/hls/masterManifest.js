const _        = require('lodash');

const constant = require('../../constant');
const config   = require('../../config');

class MasterManifest {
  constructor(videoData, id, format, muxingType, version) {
    this.videoData  = videoData;
    this.id         = id;
    this.format     = format;
    this.muxingType = muxingType;
    this.version    = version;
  }

  getRenditions() {
    return Object.keys(_.get(this.videoData, 'renditions', {}));
  }

  getBandwidth(rendition) {
    return _.get(this.videoData, `${rendition}.bandwidth`);
  }

  getResolution(rendition) {
    return _.get(this.videoData, `${rendition}.resolution`);
  }

  getFormats() {
    return _.get(this.videoData, 'formats', []);
  }

  getMuxingTypes() {
    return _.get(this.videoData, 'muxingTypes', []);
  }

  verifyManifestRequest() {
    const formatAvailable     = this.getFormats().includes(this.format);
    const muxingTypeAvailable = this.getMuxingTypes().includes(this.muxingType);

    return formatAvailable && muxingTypeAvailable;
  }

  build() {
    const manifest = _.get(_.cloneDeep(constant.MASTER_MANIFEST_TOP), this.format);
    const domain   = config.GAE_SERVICE ? config.MANIFEST_DOMAIN : config.LOCAL_MANIFEST_DOMAIN;

    const renditions = this.getRenditions();
    for (const rendition of renditions) {
      const bandwidth  = this.getBandwidth(rendition);
      const resolution = this.getResolution(rendition);

      const stream = [
        `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}`,
        `${domain}/playout/${this.version}/${this.id}/${this.format}/${this.muxingType}/${rendition}/playlist.m3u8`
      ];
      manifest.push(...stream);
    }

    return manifest.join('\n');
  }
}

module.exports = MasterManifest;