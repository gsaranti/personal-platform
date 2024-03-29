<template>
  <div class="project-description-section">
    <navigation class="nav-bar" :background-loaded="true" :navigation-drop-down="false" :go-back="true"/>
    <v-btn @click="routeBack" class="back-nav-button" dark>&#8592; home</v-btn>
    <h1 class="project-header">Video Transcode System and Streaming Service</h1>
    <div class="visible-item">
      <div class="architecture">
        <img class="diagram" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1619928436/Transcode_Pipeline_dqdeyp.png" alt=""/>
      </div>
      <div class="project-overview">
        <v-btn style="display: block" elevation="2" @click="linkGithub">View On GitHub</v-btn>
        <h2 class="transcoder-system">Video Transcode System</h2>
        <p>
          This system is made up of multiple pieces that form a pipeline for transcoding
          videos from common formats, such as mp4 and mov, to a format that allows for adaptive
          bitrate streaming.
        </p>
        <h3 class="sub-description">Transcode Initiation</h3>
        <p>
          A transcode process starts when a video is uploaded to the "Raw Videos" google
          storage bucket. This is currently done through a locally ran script. Along with the
          video upload, this script also saves a set of metadata to Firestore that is later used
          for video playout after the transcode process.
        </p>
        <p>
          When the video upload is complete, a message is published on the "video-uploads"
          Pub/Sub topic, which triggers the "Encoder Trigger" cloud function. This cloud function performs
          the following tasks:
        </p>
        <div class="numbered-list">
          <ol>
            <li>Saves the video file name to a transcode backlog list in Firestore.</li>
            <li>Checks the state of the encoder. If the encoder is not already running or
              spinning up, the encoder is started via the Compute Engine SDK.</li>
          </ol>
        </div>
        <h3 class="sub-description">Transcode Process</h3>
        <p>
          The encoder is a Node.js program that runs on a Compute Engine Virtual Machine. Once the VM
          has spun up, the transcode backlog list is requested from Firestore. For each video file name
          in the backlog list, the video is downloaded from the "Raw Videos" storage bucket and transcoded
          using FFmpeg. Currently, the video gets re-encoded with the H.264 codec and segmented into ts
          (transport stream) segments. These segments, as well as the HLS (HTTP Live Streaming) playlists
          created by FFmpeg, get uploaded to the "Manifests and Segments" storage bucket. For now,
          the encoder outputs the following renditions: 360p, 480p, 720p, 1080p. Once the process has completed
          for each file name in the transcode backlog list, the list is requested from Firestore one last time
          to make sure no more videos have been uploaded to the "Raw Videos" storage bucket. If there are no new
          video file names in the list, the VM spins itself down.
        </p>
        <h2 class="streaming-service-system">Streaming Service</h2>
        <p>
          After a video has been transcoded, it can then be served to a client, such as my website, through
          the streaming service.
        </p>
        <h3 class="sub-description">Content Control</h3>
        <p>
          In order to control what content I would like made available to the internet, I implemented a video status
          feature. For a video to be streamed it's name must be included in the "public videos" list.
          This list is stored both in Firestore and on each Platform Service instance (we'll dive more into this
          service later). When a video name is added to the list in Firestore, the "Update Public Videos" Firestore
          function is triggered and publishes a message on the "public-videos-update" Pub/Sub topic. Each instance
          of the Platform Service is subscribed to this topic; therefore, when a message is received, the instance
          can update the local list.
        </p>
        <h3 class="sub-description">Video Playout</h3>
        <p>
          The Platform Service is an Express application running on Google App Engine that handles video requests.
          The initial api request for a video has the following path structure:
        </p>
        <div class="example-block">
          <p>
            /playout/:version/:id/:format/:muxingType/master.m3u8 &nbsp; &nbsp; &nbsp; &nbsp;
          </p>
        </div>
        <p>Let's go over the path parameters:</p>
        <div class="bullet-list">
          <ul>
            <li><b>version:</b> The api version</li>
            <li><b>id:</b> The video id</li>
            <li><b>format:</b> The streaming protocol</li>
            <li><b>muxingType:</b> The segment container format</li>
          </ul>
        </div>
        <div class="warning-block">
          <p>
            Currently, only the HLS (HTTP Live Streaming) protocol is supported, but my goal is to implement DASH
            (Dynamic Adaptive Streaming) playout in the future. Furthermore, the transcode process only outputs
            ts segments. I plan on supporting fragmented mp4s as well.
          </p>
        </div>
        <p>
          When the the request above is made, the Platform Service assembles the master manifest for the video.
          To do this, the metadata for the requested video is retrieved from Firestore. This data includes
          the available renditions, muxing types, and streaming formats. The path parameter values of the request
          must be included in the metadata for a manifest to be created. Otherwise, a 404 is returned.
        </p>
        <p>Here is an example:</p>
        <div>
          <div class="example-block">
            <p class="example-block-title"><b>Request:</b></p>
            <p>
              https://api.georgesarantinos.com/playout/v1.0/george/hls3/ts/master.m3u8 &nbsp; &nbsp; &nbsp; &nbsp;
            </p>
          </div>
          <div class="example-block">
            <p class="example-block-title"><b>Response:</b></p>
            <p>
              #EXTM3U<br>
              #EXT-X-VERSION:3<br>
              #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360<br>
              https://api.georgesarantinos.com/playout/v1.0/george/hls3/ts/360p/playlist.m3u8<br>
              #EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480<br>
              https://api.georgesarantinos.com/playout/v1.0/george/hls3/ts/480p/playlist.m3u8<br>
              #EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720<br>
              https://api.georgesarantinos.com/playout/v1.0/george/hls3/ts/720p/playlist.m3u8 &nbsp; &nbsp; &nbsp; &nbsp;<br>
              #EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080<br>
              https://api.georgesarantinos.com/playout/v1.0/george/hls3/ts/1080p/playlist.m3u8
            </p>
          </div>
        </div>
        <p>
          As seen above, the master manifest provides the client video player with the media manifest urls for the
          available renditions. These media manifests hold the segment urls, which the player requests to then play
          the video.
        </p>
        <p>
          Once the player receives all of the media manifests, no further requests are made to the Platform Service.
          All segments are requested directly from Google Cloud Storage. Performant segment response times are
          important for quality video playout, such as preventing buffering. Fortunately, Cloud Storage behaves
          like a Content Delivery Network (CDN) when stored data is publicly readable. This is the case for the
          video segments in this system; therefore, they are cached in the Cloud Storage network.
        </p>
        <h3 class="sub-description">Make a request yourself</h3>
        <p>
          Want to see everything that's been described in action? Here's how to do it! If you would like to
          actually play a video, request the following url in the Safari browser:
        </p>
        <div class="example-block">
          <p>
            https://api.georgesarantinos.com/playout/v1.0/george/hls3/ts/master.m3u8 &nbsp; &nbsp; &nbsp; &nbsp;
          </p>
        </div>
        <p>
          This request will return the HLS format, which is supported by Safari. When the browser receives the
          master manifest, it will automatically play the video in the native Safari player. Go ahead and
          open the browser developer tools as well. If you inspect the network, you will be able to see the media
          manifests and segments being requested, as well as the player performing rendition switching based on
          the available bandwidth.
        </p>
        <p>
          If you want to view the actual manifests, take the url above and request it using Chrome. The browser will
          download the master manifest instead of playing the video. You can then use the urls in the master manifest
          to download the media manifests as well.
        </p>
        <h2 class="future-features">Future Features</h2>
        <div class="bullet-list">
          <ul>
            <li>Implement HLS5 and Dash playout</li>
            <li>Implement fmp4 segments</li>
            <li>Implement ad insertion</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "./Navigation.vue";

export default {
  name: 'project',
  components: {
    navigation
  },
  data: () => {
    return {
      buttonText: 'back to projects'
    }
  },
  mounted() {
    this.$store.commit('setAnimate', false);
  },
  methods: {
    routeBack() {
      this.$router.push({name: 'home'});
    },
    linkGithub() {
      window.open('https://github.com/gsaranti/personal-platform');
    }
  }
}
</script>

<style>
.project-description-section {
  background-color: #f8f6ed;
  padding-bottom: 40px;
}

.nav-bar {}

.back-nav-button {
  position: fixed;
  display: block;
  margin-left: 10px;
  margin-top: 9px;
  z-index: 7;
}

.project-header {
  text-align: center;
  padding-top: 80px;
  margin-bottom: 20px;
}

.architecture {
  text-align: center;
  background-color: #add8e6;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  -webkit-box-shadow: 0 0 5px rgba(0,0,0,.5);
  -moz-box-shadow: 0 0 5px rgba(0,0,0,.5);
  -o-box-shadow: 0 0 5px rgba(0,0,0,.5);
  -ms-box-shadow: 0 0 5px rgba(0,0,0,.5);
  border-radius: 2px;
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 20px;
}

.diagram {
  width: 50vw;
}

.project-overview {
  text-align: left;
  border: 1px solid white;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 3px rgba(0,0,0,.5);
  -webkit-box-shadow: 0 0 3px rgba(0,0,0,.5);
  -moz-box-shadow: 0 0 3px rgba(0,0,0,.5);
  -o-box-shadow: 0 0 3px rgba(0,0,0,.5);
  -ms-box-shadow: 0 0 3px rgba(0,0,0,.5);
  border-radius: 2px;
  margin-left: 100px;
  margin-right: 100px;
}

.transcoder-system {
  margin-bottom: 25px;
  margin-top: 15px;
}

.streaming-service-system {
  margin-bottom: 25px;
  margin-top: 45px;
}

.future-features {
  margin-top: 45px;
  margin-bottom: 25px;
}

.sub-description {
  margin-bottom: 20px;
}

.numbered-list {
  margin-left: 50px;
  margin-bottom: 20px;
}

.bullet-list {
  margin-left: 40px;
  margin-bottom: 20px;
}

.example-block {
  color: #0d47a1;
  background-color: #E2F4FE;
  overflow: auto;
  white-space: nowrap;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.warning-block {
  color: saddlebrown;
  background-color: #FDEFE3;
  overflow: auto;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.example-block-title {
  margin-bottom: 10px;
}

@media (max-width: 1000px) {
  .architecture {
    margin-left: 50px;
    margin-right: 50px;
  }

  .project-overview {
    margin-left: 50px;
    margin-right: 50px;
  }

  .diagram {
    width: 60vw;
  }
}

@media (max-width: 650px) {
  .nav-bar {
    display: none;
  }

  .project-header {
    padding-top: 60px;
  }
}


@media (max-width: 500px) {
  .architecture {
    margin-left: 25px;
    margin-right: 25px;
  }

  .project-overview {
    margin-left: 25px;
    margin-right: 25px;
  }

  .diagram {
    width: 75vw;
  }
}
</style>

<style scoped>
p {
  margin-bottom: 20px;
}

.example-block p {
  margin-left: 20px;
  margin-bottom: 0;
}

.warning-block p {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0;
}
</style>
