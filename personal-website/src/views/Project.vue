<template>
  <div class="projectDescriptionSection">
    <h1 class="projectHeader">Video Transcode System and Streaming Service</h1>
    <div class="architecture">
      <img class="diagram" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1619928436/Transcode_Pipeline_dqdeyp.png" alt=""/>
    </div>
    <div class="projectOverview">
      <h2 class="firsSection">Video Transcode System:</h2>
      <p>This system is made up of multiple pieces that builds a pipeline for transcoding
      videos from common formats, such as mp4 and mov, to a format that allows for adaptive
      bitrate streaming.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'project',
    components: {},
    data: () => {
      return {

      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style>
  .projectDescriptionSection {
    background-color: #FBFAF5;
  }

  .projectHeader {
    padding-top: 20px;
    margin-bottom: 20px;
  }

  .architecture {
    background-color: #add8e6;
    -moz-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
    -webkit-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
    box-shadow: 1px 2px 3px rgba(0,0,0,.5);
    border-radius: 40px;
    margin-left: 20px;
    margin-right: 20px;
  }
  
  .diagram {
    width: 50vw;
  }

  .projectOverview {
    display: block;
  }

  .firsSection {
    margin-top: 30px;
    margin-left: 40px;
  }
</style>
