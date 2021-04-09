<template>
  <div class="projectsSection">
    <div :class="{visibleItem: isVisible, hiddenItem: !isVisible}">
      <h2 class="projectsLabel">Projects</h2>
      <div class="transcodePlayer">
        <player ref="transcodeProjectPlayer" :options="videoOptions"/>
      </div>
      <h2 class="projectTitle">Video Transcode System <br> and Streaming Service</h2>
      <p class="projectDescription">
        This project provides the capability to transcode video and stream it across
        the internet. The video above is powered by this system, and I hope to add
        more videos to provide examples of any other projects I work on in the future!
        Since I’ve been working in the streaming industry for almost three years now,
        this project was a great way to use and build upon my technical skills.
      </p>
      <div class="projectDetails">
        <div class="technology">
          <h3>Built With:</h3>
          <ul>
            <li>Node.js</li>
            <li>FFmpeg</li>
            <li>GCP Compute Engine</li>
            <li>GCP App Engine</li>
            <li>GCP Cloud Functions</li>
            <li>GCP Storage</li>
            <li>GCP Pub/Sub</li>
            <li>Firestore</li>
          </ul>
        </div>
        <div class="detailButtons">
          <v-btn class="detailButton" elevation="2">Learn More</v-btn>
          <v-btn style="display: block" elevation="2" @click="openGithub">View On GitHub</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";
  import player from "./player";

  export default {
    name: 'projects',
    components: {
      player
    },
    data: () => {
      return {
        isVisible: false,
        videoOptions: {
          autoplay: false,
          controls: true,
          muted: true,
          fluid: true,
          sources: [
            {
              src: "https://api.georgesarantinos.com/playout/v1.0/luke/hls3/ts/master.m3u8",
              type: "application/x-mpegURL",
              limitRenditionByPlayerDimensions: false
            }
          ]
        },
      }
    },
    mounted() {
      const handler = this.onVisibilityChange(this.$el);
      if (window.addEventListener) {
        addEventListener('scroll', _.throttle(handler, 10), false);
      }
    },
    methods: {
      onVisibilityChange(el) {
        const self = this;
        return function () {
          if (!self.isVisible) {
            const rect = el.getBoundingClientRect();
            self.isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 150;
            if (self.isVisible) {
              self.$refs.transcodeProjectPlayer.player.play();
            }
          }
        }
      },
      openGithub() {
        window.open("https://github.com/gsaranti/personal-platform");
      }
    }
  }
</script>

<style>
  @import '~video.js/dist/video-js.css';

  ul {
    list-style-position: inside;
  }

  .projectsSection {
    position: relative;
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 30px;
    background: #FBFAF5;
  }

  .projectsLabel {
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    margin-right: 35%;
    margin-left: 35%;
    margin-bottom: 25px;
    font-size: 30px;
  }

  .projectsLabel:before,
  .projectsLabel:after {
    background-color: #000;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  .projectsLabel:before {
    right: 0.5em;
    margin-left: -50%;
  }

  .projectsLabel:after {
    left: 0.5em;
    margin-right: -50%;
  }

  .transcodePlayer {
    width: 575px;
    display: inline-block;
  }

  .projectTitle {
    margin-top: 10px;
  }

  .projectDescription {
    margin-top: 20px;
    margin-left: 100px;
    margin-right: 100px;
  }

  .projectDetails {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .technology {
    text-align: left;
  }

  .detailButtons {
    margin-top: 50px;
    margin-left: 50px;
  }

  .detailButton {
    margin-bottom: 10px;
    width: 168px;
  }

  @media (max-width: 700px) {
    .transcodePlayer {
      width: 80%;
    }

    .projectDescription {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  @media (max-width: 550px) {
    .projectDetails {
      margin-top: 20px;
      display: block;
    }

    .technology {
      text-align: unset;
    }

    .detailButtons {
      margin-bottom: 10px;
      margin-left: 0;
      margin-top: 20px;
      justify-content: center;
      display: inline-block;
    }

    .projectsLabel {
      margin-right: 25%;
      margin-left: 25%;
      font-size: 23px;
    }

    .projectsLabel:before {
      right: 0.5em;
      margin-left: -50%;
    }

    .projectsLabel:after {
      left: 0.5em;
      margin-right: -50%;
    }
  }
</style>
