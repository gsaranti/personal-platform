<template>
  <div>
    <div class="aboutMe">
      <h2 class="label">About Me</h2>
      <p>
        'My time at Red Bull Media House has been incredible. Being able to work with' +
        ' a group of experienced, driven individuals who show passion for what they do ' +
        'both in and out of the office inspires me on a daily basis.',
        'After proving my abilities to the team leadership, I was promoted from a junior' +
        ' Software Engineer to Software Engineer at the beginning of 2019. Over the past ' +
        'two plus years I’ve worked on the backend engineering team, building and ' +
        'maintaining the services that power the Red Bull TV and Servus TV streaming ' +
        'services and Red Bull AR App.',
        'During this time I have gained significant experience in video streaming. A ' +
        'unique project that my team and I built was our multilinear service, which ' +
        'generates 24/7 HLS and DASH linear streams and accompanying electronic ' +
        'programming guides. By doing so, Red Bull TV now offers multiple linear stream ' +
        'channels along with VOD and live streams. Along with this, I helped build the ' +
        'metadata and stream localization features for Red Bull TV, improving the ' +
        'content served to numerous regions.',
        'Want to learn more about what I’ve worked on at Red Bull Media House (ETL' +
        ' systems, leaderboard services, data migrations, and more!)? Connect with me ' +
        'on LinkedIn! Let’s chat.'
      </p>
    </div>
    <div class="collage">
      <img class="portrait" src="https://res.cloudinary.com/df1dpirbp/image/upload/w_350,h_200/v1609570109/LMU1_t6sf4w.png" alt=""/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
    components: {
    },
    data: () => {
      return {
        fixed: false
      }
    }
  }
</script>

<style>
  .aboutMe {
    float: right;
    width: 45%;
    text-align: center;
    text-autospace: initial;
    line-height: 1.5;
    padding: 30px 5vw;
    background-color: mintcream;
    height: 600px;
  }

  .collage {
    float: left;
    background-color: blue;
    height: 600px;
    width: 55%;
  }

  .label {
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    margin-right: 25%;
    margin-left: 25%;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
  }

  .label:before,
  .label:after {
    background-color: #000;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  .label:before {
    right: 0.5em;
    margin-left: -50%;
  }

  .label:after {
    left: 0.5em;
    margin-right: -50%;
  }

  .portrait {
    position: sticky;
    margin-top: 100px;
    top: 200px;
  }
</style>
