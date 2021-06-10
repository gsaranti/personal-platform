<template>
  <div class="experience">
    <div :class="{baseItem: !animate, visibleItem: (animate && isVisible), hiddenItem: !isVisible}">
      <h2 class="label">The Path So Far</h2>
    </div>
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
                      'channels. Along with this, I helped build the metadata and stream localization ' +
                      'features for Red Bull TV, improving the content served to numerous regions.',
                      'Want to learn more about what I’ve worked on at Red Bull Media House (ETL' +
                      ' systems, leaderboard services, data migrations, and more!)? Connect with me ' +
                      'on LinkedIn! Let’s chat.'
                    ]"
                    :expand="true"
                    :positions="[
                      'Software Engineer: Jan 2019 - Present',
                      'Junior Software Engineer: Aug 2018 - Dec 2018'
                    ]"
    />
    <experienceItem side="right"
                    imgUrl="https://res.cloudinary.com/df1dpirbp/image/upload/w_350,h_150/v1609570109/LMU1_t6sf4w.png"
                    label="Loyola Marymount University"
                    :description="[
                      'I\'ll never take for granted my four years at LMU. Always sunny and close to the ' +
                      'beach, who could ask for more?',
                      'Through small class sizes I was able to have substantial in person time with my ' +
                      'professors, allowing me to build relationships with them. This not only helped ' +
                      'improve my understanding of the material, but made for conversations with them to ' +
                      'be easy going and fun. I find this to be a core reason for my enjoyment of ' +
                      'software engineering today.',
                      'Outside of the classroom I was lucky enough to be a member of the Ignatians ' +
                      'service organization. With the other members we worked together to perform ' +
                      'service at different placements around the LA area for the promotion of social ' +
                      'justice. We often found ourselves engaged in difficult conversations regarding ' +
                      'complicated social topics, which pushed me to think critically about the systemic ' +
                      'injustice around the world.',
                      'I could go on about my time at LMU, but in the end it was the experiences I had, ' +
                      'friends I made, and skills I gained that helped catapult me to where I am today'
                    ]"
                    :expand="true"
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
        viewPortTop: 0,
        isVisible: false
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
            self.isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight);
          }
        }
      }
    },
    computed: {
      animate() {
        return this.$store.state.animate;
      }
    }
  }
</script>

<style>
  .experience {
    margin-top: 100vh;
    padding-top: 30px;
    background: #f8f6ed;
  }

  .label {
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    margin-right: 30%;
    margin-left: 30%;
    margin-bottom: 40px;
    font-size: 30px;
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

  @media (max-width: 800px) {
    .label {
      margin-right: 22%;
      margin-left: 22%;
      margin-bottom: 30px;
    }

    .label:before {
      right: 0.5em;
      margin-left: -50%;
    }

    .label:after {
      left: 0.5em;
      margin-right: -50%;
    }
  }

  @media (max-width: 500px) {
    .label {
      margin-right: 20%;
      margin-left: 20%;
      margin-bottom: 30px;
      font-size: 23px;
    }

    .label:before {
      right: 0.5em;
      margin-left: -50%;
    }

    .label:after {
      left: 0.5em;
      margin-right: -50%;
    }
  }
</style>
