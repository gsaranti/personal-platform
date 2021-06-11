<template>
  <div :class="{baseItem: !animate, visibleItem: (animate && isVisible), hiddenItem: !isVisible}">
    <div :class="{itemCollapsed: !this.isExpanded, itemExpanded: this.isExpanded}">
      <div :class="{imageHolderLeft: this.side === 'left', imageHolderRight: this.side === 'right'}">
        <v-lazy>
          <img class="image" :src=imgUrl alt=""/>
        </v-lazy>
      </div>
      <div :class="{infoLeft: this.side === 'left', infoRight: this.side === 'right'}">
        <div>
          <h2 class="placement">{{label}}</h2>
          <div class="positions">
            <p v-for="(p, index) in positions" :key="index">{{ p }}</p>
          </div>
          <div :class="{startCollapsed: !expandInitiated, collapsed: (!this.isExpanded && expandInitiated), expanded: (this.isExpanded && expandInitiated)}">
            <p v-for="(paragraph, index) in description" :key="index">
              {{ paragraph }}<br><br>
            </p>
          </div>
          <p v-if="!isExpanded && expand" class="dots">...</p>
          <div v-if="expand" v-on:click="expandText" :class="{expandButtonUp: this.isExpanded, expandButton: !this.isExpanded}">
            <i class="smallArrow smallDown" v-if="!isExpanded"></i>
            <i class="smallArrow smallUp" v-if="isExpanded"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";

  export default {
    name: 'experienceItem',
    props: {
      side: String,
      imgUrl: String,
      label: String,
      description: Array,
      expand: Boolean,
      positions: Array
    },
    components: {
    },
    data: () => {
      return {
        isExpanded: false,
        isVisible: false,
        expandInitiated: false
      }
    },
    mounted() {
      const handler = this.onVisibilityChange(this.$el);
      if (window.addEventListener) {
        addEventListener('scroll', _.throttle(handler, 10), false);
      }
    },
    methods: {
      expandText() {
        this.expandInitiated = true;
        this.isExpanded = !this.isExpanded;
      },
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
  .image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  .placement {
    margin-bottom: 3px;
  }

  .positions {
    font-style: italic;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .startCollapsed {
    max-height: 130px;
    overflow: hidden;
  }

  .collapsed {
    max-height: 130px;
    overflow: hidden;
    animation: collapseText 1s forwards;
    -webkit-animation: collapseText 1s forwards;
    -moz-animation: collapseText 1s forwards;
    -o-animation: collapseText 1s forwards;
    -ms-animation: collapseText 1s forwards;
  }

  .expanded {
    animation: expandText 1.5s forwards;
    -webkit-animation: expandText 1.5s forwards;
    -moz-animation: expandText 1.5s forwards;
    -o-animation: expandText 1.5s forwards;
    -ms-animation: expandText 1.5s forwards;
  }

  .dots {
    text-align: center;
    font-weight: bold;
  }

  .expandButton {
    position: relative;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    margin: auto;
    background-color: rgba(192,192,192, 0.4);
  }

  .expandButtonUp {
    position: relative;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    margin: auto;
    background-color: rgba(192,192,192, 0.4);
  }

  .smallArrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    padding: 4px;
    position: absolute;
    display: table-cell;
    margin-left: 5px;
    margin-top: 3px;
  }

  .smallDown {
    animation: reverseSpin .5s forwards;
    -webkit-animation: reverseSpin .5s forwards;
    -moz-animation: reverseSpin .5s forwards;
    -o-animation: reverseSpin .5s forwards;
    -ms-animation: reverseSpin .5s forwards;
  }

  .smallUp {
    animation: spin .5s forwards;
    -webkit-animation: spin .5s forwards;
    -moz-animation: spin .5s forwards;
    -o-animation: spin .5s forwards;
    -ms-animation: spin .5s forwards;
  }

  @media (min-width: 1000px) {
    .itemExpanded {
      padding-bottom: 30px;
    }

    .itemCollapsed {
      padding-bottom: 70px;
    }

    .imageHolderLeft {
      float: left;
      position: relative;
      margin-left: 5vw;
      margin-right: 20px;
      border-radius: 25px;
      width: 400px;
      height: 250px;
      background-color: rgba(192,192,192, 0.4);
      background-repeat: no-repeat;
      background-blend-mode: screen;
    }

    .imageHolderRight {
      float: right;
      position: relative;
      margin-right: 5vw;
      margin-left: 20px;
      border-radius: 25px;
      width: 400px;
      height: 250px;
      background-color: rgba(192,192,192, 0.4);
      background-repeat: no-repeat;
      background-blend-mode: screen;
    }

    .infoLeft {
      margin-right: 5vw;
      overflow: hidden;
      text-align: left;
    }

    .infoRight {
      margin-left: 5vw;
      overflow: hidden;
      text-align: left;
    }
  }

  @media (max-width: 1000px) {
    .itemExpanded {
      padding-bottom: 10px;
    }

    .itemCollapsed {
      padding-bottom: 40px;
    }

    .imageHolderLeft {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      border-radius: 25px;
      width: 400px;
      height: 250px;
      background-color: rgba(192,192,192, 0.4);
      background-repeat: no-repeat;
      background-blend-mode: screen;

    }

    .imageHolderRight {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      border-radius: 25px;
      width: 400px;
      height: 250px;
      background-color: rgba(192,192,192, 0.4);
      background-repeat: no-repeat;
      background-blend-mode: screen;
    }

    .infoLeft {
      margin-right: 10vw;
      margin-left: 10vw;
      margin-top: 20px;
      overflow: hidden;
      text-align: center;
    }

    .infoRight {
      margin-left: 10vw;
      margin-right: 10vw;
      margin-top: 20px;
      overflow: hidden;
      text-align: center;
    }

    .expandButtonUp {
      margin-bottom: 25px;
    }
  }

  @media (max-width: 500px) {
    .imageHolderLeft {
      width: 350px;
      height: 219px;
    }

    .imageHolderRight {
      width: 350px;
      height: 219px;
    }

    .image {
      max-width: 90%
    }

    .expanded {
      margin-bottom: 70px;
    }

    .expandButtonUp {
      margin-top: -15vw;
    }
  }

  @keyframes expandText {
    0% {
      max-height: 130px;
    }
    100% {
      max-height: 800px;
    }
  }

  @-moz-keyframes expandText {
    0% {
      max-height: 130px;
    }
    100% {
      max-height: 800px;
    }
  }

  @-webkit-keyframes expandText {
    0% {
      max-height: 130px;
    }
    100% {
      max-height: 800px;
    }
  }

  @-o-keyframes expandText {
    0% {
      max-height: 130px;
    }
    100% {
      max-height: 800px;
    }
  }

  @-ms-keyframes expandText {
    0% {
      max-height: 130px;
    }
    100% {
      max-height: 800px;
    }
  }

  @keyframes collapseText {
    0% {
      max-height: 800px;
    }
    100% {
      max-height: 130px;
    }
  }

  @-moz-keyframes collapseText {
    0% {
      max-height: 800px;
    }
    100% {
      max-height: 130px;
    }
  }

  @-webkit-keyframes collapseText {
    0% {
      max-height: 800px;
    }
    100% {
      max-height: 130px;
    }
  }

  @-o-keyframes collapseText {
    0% {
      max-height: 800px;
    }
    100% {
      max-height: 130px;
    }
  }

  @-ms-keyframes collapseText {
    0% {
      max-height: 800px;
    }
    100% {
      max-height: 130px;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(45deg) translate(0, 0);
    }
    100% {
      transform: rotate(225deg) translate(-3px, -3px);
    }
  }

  @-moz-keyframes spin {
    0% {
      -moz-transform: rotate(45deg) translate(0, 0);

    }
    100% {
      -moz-transform: rotate(225deg) translate(-3px, -3px);
    }
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(45deg) translate(0, 0);
    }
    100% {
      -webkit-transform: rotate(225deg) translate(-3px, -3px);
    }
  }

  @-o-keyframes spin {
    0% {
      -o-transform: rotate(45deg) translate(0, 0);
    }
    100% {
      -o-transform: rotate(225deg) translate(-3px, -3px);
    }
  }

  @-ms-keyframes spin {
    0% {
      -ms-transform: rotate(45deg) translate(0, 0);
    }
    100% {
      -ms-transform: rotate(225deg) translate(-3px, -3px);
    }
  }

  @keyframes reverseSpin {
    0% {
      transform: rotate(225deg) translate(-3px, -3px);
    }
    100% {
      transform: rotate(45deg) translate(0, 0);
    }
  }

  @-moz-keyframes reverseSpin {
    0% {
      -moz-transform: rotate(225deg) translate(-3px, -3px);
    }
    100% {
      -moz-transform: rotate(45deg) translate(0, 0);
    }
  }

  @-webkit-keyframes reverseSpin {
    0% {
      -webkit-transform: rotate(225deg) translate(-3px, -3px);
    }
    100% {
      -webkit-transform: rotate(45deg) translate(0, 0);
    }
  }

  @-o-keyframes reverseSpin {
    0% {
      -o-transform: rotate(225deg) translate(-3px, -3px);
    }
    100% {
      -o-transform: rotate(45deg) translate(0, 0);
    }
  }

  @-ms-keyframes reverseSpin {
    0% {
      -ms-transform: rotate(225deg) translate(-3px, -3px);
    }
    100% {
      -ms-transform: rotate(45deg) translate(0, 0);
    }
  }
</style>
