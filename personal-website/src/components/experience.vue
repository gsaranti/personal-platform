<template>
  <div class="experience">
    <h2 class="label">The Path So Far...</h2>
    <experienceItem side="left"
                    imgUrl="https://res.cloudinary.com/df1dpirbp/image/upload/w_400,h_250/v1609373485/redbull_wr7wps.png"
                    label="Red Bull Media House"
                    :description="[
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
                    ]"
                    :expand="true"
                    :scrollDirection="scrollDirection"
                    :positions="[
                      'Software Engineer - Jan 2019 - Present',
                      'Junior Software Engineer - Aug 2018 - Dec 2018'
                    ]"
    />
    <experienceItem side="right"
                    imgUrl="https://res.cloudinary.com/df1dpirbp/image/upload/w_350,h_170/v1609570109/LMU1_t6sf4w.png"
                    label="Loyola Marymount University"
                    :description="[
                      'My time at Red Bull Media House has been incredible. Being able to work with' +
                      ' a group of experienced, driven individuals who show passion for what they do ' +
                      'both in and out of the office inspires me on a daily basis.',
                      'After proving my abilities to the team leadership, I was promoted from a junior' +
                      ' Software Engineer to Software Engineer at the beginning of 2019. Over the past ' +
                      'two plus years I’ve worked on the backend engineering team, building and ' +
                      'maintaining the services that power the Red Bull TV and Servus TV streaming ' +
                      'services and Red Bull AR App.'
                    ]"
                    :expand="true"
                    :scrollDirection="scrollDirection"
                    :positions="[
                      'B.S. Computer Science',
                      'Class of 2018'
                    ]"
    />
  </div>
</template>

<script>
  import experienceItem from "./experienceItem";
  import _ from "lodash";

  export default {
    name: 'experience',
    components: {
      experienceItem
    },
    data: () => {
      return {
        scrollDirection: "down",
        viewPortTop: 0
      }
    },
    mounted() {
      const handler = this.onScroll();

      if (window.addEventListener) {
        addEventListener('scroll', _.throttle(handler, 10), {passive: true, capture: true});
      }
    },
    methods: {
      onScroll() {
        const self = this;
        return function () {
          const currentTop = window.pageYOffset || window.scrollTop;
          if (currentTop > self.viewPortTop) {
            self.scrollDirection = "down";
          } else {
            self.scrollDirection = "up";
          }
          self.viewPortTop = currentTop;
        }
      }
    }
  }
</script>

<style>
  .experience {
    margin-top: 100vh;
    padding-top: 30px;
    background: white;
  }

  .label {
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    margin-right: 30%;
    margin-left: 30%;
    margin-bottom: 40px;
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

  @media (max-width: 575px) {
    .label {
      border-bottom: 1px solid black;
      margin-right: 24%;
      margin-left: 24%;
    }

    .label:before {
      right: 2em;
      margin-left: -50%;
    }

    .label:after {
      left: 2em;
      margin-right: -50%;
    }
  }
</style>
