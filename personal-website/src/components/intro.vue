<template>
  <div :class="{intro: backgroundLoaded, introBeforeLoad: !backgroundLoaded}">
    <div v-if="backgroundLoaded" class="animated-title">
      <div class="text-top">
        <div>
          <span style="margin-right: 135px">Hi there,</span>
          <span>My name is George</span>
        </div>
      </div>
      <div class="text-bottom">
        <div>Get to know me!</div>
      </div>
    </div>
    <div v-if="backgroundLoaded" class="downButtonIntro">
      <div v-on:click="callAutoScroll('.experienceScroll')" class="downButton">
        <i class="arrow down"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'intro',
    components: {
    },
    props: {
      autoScroll: Function,
      backgroundLoaded: Boolean
    },
    methods: {
      callAutoScroll(selector) {
        if (selector) {
          this.autoScroll(selector);
        }
      }
    }
  }
</script>

<style>
  @keyframes backgroundFadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }

  @-moz-keyframes backgroundFadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }

  @-webkit-keyframes backgroundFadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }

  @-o-keyframes backgroundFadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }

  @-ms-keyframes backgroundFadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .introBeforeLoad {
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    filter: blur(12px);
    background: url(https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,e_brightness_hsb:-10/v1614834825/seaside_blur_v5_y7uohh.jpg) no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .intro {
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    background: url(https://res.cloudinary.com/df1dpirbp/image/upload/g_auto,q_auto,f_auto,e_brightness_hsb:-10/v1614833766/seaside_v5_abc.jpg) no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    animation: backgroundFadeIn 2s;
    -webkit-animation: backgroundFadeIn 2s;
    -moz-animation: backgroundFadeIn 2s;
    -o-animation: backgroundFadeIn 2s;
    -ms-animation: backgroundFadeIn 2s;
  }

  @keyframes showTopText {
    0% { transform: translate3d(0, 100%, 0); }
    40%, 60% { transform: translate3d(0, 50%, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }

  @-moz-keyframes showTopText {
    0% { -moz-transform: translate3d(0, 100%, 0); }
    40%, 60% { -moz-transform: translate3d(0, 50%, 0); }
    100% { -moz-transform: translate3d(0, 0, 0); }
  }

  @-webkit-keyframes showTopText {
    0% { -webkit-transform: translate3d(0, 100%, 0); }
    40%, 60% { -webkit-transform: translate3d(0, 50%, 0); }
    100% { -webkit-transform: translate3d(0, 0, 0); }
  }

  @-o-keyframes showTopText {
    0% { -o-transform: translate3d(0, 100%, 0); }
    40%, 60% { -o-transform: translate3d(0, 50%, 0); }
    100% { -o-transform: translate3d(0, 0, 0); }
  }

  @-ms-keyframes showTopText {
    0% { -ms-transform: translate3d(0, 100%, 0); }
    40%, 60% { -ms-transform: translate3d(0, 50%, 0); }
    100% { -ms-transform: translate3d(0, 0, 0); }
  }

  @keyframes showBottomText {
    0% { transform: translate3d(0, -100%, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }

  @-moz-keyframes showBottomText {
    0% { -moz-transform: translate3d(0, -100%, 0); }
    100% { -moz-transform: translate3d(0, 0, 0); }
  }

  @-webkit-keyframes showBottomText {
    0% { -webkit-transform: translate3d(0, -100%, 0); }
    100% { -webkit-transform: translate3d(0, 0, 0); }
  }

  @-o-keyframes showBottomText {
    0% { -o-transform: translate3d(0, -100%, 0); }
    100% { -o-transform: translate3d(0, 0, 0); }
  }

  @-ms-keyframes showBottomText {
    0% { -ms-transform: translate3d(0, -100%, 0); }
    100% { -ms-transform: translate3d(0, 0, 0); }
  }

  .animated-title {
    color: ghostwhite;
    font-family: "Baloo2-Medium", sans-serif;
    margin-top: 50vh;
    margin-left: 45vw;
    margin-right: 5vw;
    white-space: nowrap;
  }

  @media (max-width: 550px) {
    .animated-title {
      margin-left: 35vw;
    }
  }

  @media (max-height: 600px) {
    .animated-title {
      margin-top: 40vh;
    }
  }

  @media (max-height: 500px) {
    .animated-title {
      margin-top: 30vh;
    }
  }

  @media (max-height: 400px) {
    .animated-title {
      margin-top: 0;
    }
  }

  @media (max-height: 350px) {
    .downButton {
      visibility: hidden;
    }
  }

  @media (max-height: 250px) {
    .animated-title {
      visibility: hidden;
    }
  }

  .animated-title > div {
    height: 100%;
    overflow: hidden;
    width: 100%;
  }

  .animated-title > div div {
    font-size: 30px;
    padding: 2vmin 0;
    float: left;
  }

  .animated-title > div div span {
    display: block;
  }

  .animated-title > div.text-top {
    border-bottom: 3px solid ghostwhite;
    top: 0;
  }

  .animated-title > div.text-top div {
    animation: showTopText 1s forwards 1s;
    -webkit-animation: showTopText 1s forwards 1s;
    -moz-animation: showTopText 1s forwards 1s;
    -o-animation: showTopText 1s forwards 1s;
    -ms-animation: showTopText 1s forwards 1s;
    transform: translate(0, 100%);
    -webkit-transform: translate(0, 100%);
    -moz-transform: translate(0, 100%);
    -o-transform: translate(0, 100%);
    -ms-transform: translate(0, 100%);
    bottom: 0;
  }

  .animated-title > div.text-top div span:first-child {
    color: ghostwhite;
  }

  .animated-title > div.text-bottom {
    bottom: 0;
  }

  .animated-title > div.text-bottom div {
    animation: showBottomText 0.5s forwards 2.25s;
    -webkit-animation: showBottomText 0.5s forwards 2.25s;
    -moz-animation: showBottomText 0.5s forwards 2.25s;
    -o-animation: showBottomText 0.5s forwards 2.25s;
    -ms-animation: showBottomText 0.5s forwards 2.25s;
    top: 0;
    transform: translate(0, -100%);
    -webkit-transform: translate(0, -100%);
    -moz-transform: translate(0, -100%);
    -o-transform: translate(0, -100%);
    -ms-transform: translate(0, -100%);
  }

  @keyframes flash {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(248, 248, 255, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0);
    }
  }

  @-moz-keyframes flash {
    0% {
      -moz-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0.7);
    }

    70% {
      -moz-transform: scale(1);
      box-shadow: 0 0 0 10px rgba(248, 248, 255, 0);
    }

    100% {
      -moz-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0);
    }
  }

  @-webkit-keyframes flash {
    0% {
      -webkit-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0.7);
    }

    70% {
      -webkit-transform: scale(1);
      box-shadow: 0 0 0 10px rgba(248, 248, 255, 0);
    }

    100% {
      -webkit-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0);
    }
  }

  @-o-keyframes flash {
    0% {
      -o-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0.7);
    }

    70% {
      -o-transform: scale(1);
      box-shadow: 0 0 0 10px rgba(248, 248, 255, 0);
    }

    100% {
      -o-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0);
    }
  }

  @-ms-keyframes flash {
    0% {
      -ms-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0.7);
    }

    70% {
      -ms-transform: scale(1);
      box-shadow: 0 0 0 10px rgba(248, 248, 255, 0);
    }

    100% {
      -ms-transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(248, 248, 255, 0);
    }
  }

  @keyframes moveUpDown {
    0%, 100% {
      margin-top: 15px;
    }
    50% {
      margin-top: 10px;
    }
  }

  @-moz-keyframes moveUpDown {
    0%, 100% {
      margin-top: 15px;
    }
    50% {
      margin-top: 10px;
    }
  }

  @-webkit-keyframes moveUpDown {
    0%, 100% {
      margin-top: 15px;
    }
    50% {
      margin-top: 10px;
    }
  }

  @-o-keyframes moveUpDown {
    0%, 100% {
      margin-top: 15px;
    }
    50% {
      margin-top: 10px;
    }
  }

  @-ms-keyframes moveUpDown {
    0%, 100% {
      margin-top: 15px;
    }
    50% {
      margin-top: 10px;
    }
  }

  .downButtonIntro {
    opacity: 0;
    animation: fadeIn 1.5s forwards 3s;
    -webkit-animation: fadeIn 1.5s forwards 3s;
    -moz-animation: fadeIn 1.5s forwards 3s;
    -o-animation: fadeIn 1.5s forwards 3s;
    -ms-animation: fadeIn 1.5s forwards 3s;
  }

  .downButton {
    margin-left: 45vw;
    border: 2px solid ghostwhite;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    margin-top: 20px;
    animation: flash 1.5s;
    -webkit-animation: flash 1.5s;
    -moz-animation: flash 1.5s;
    -o-animation: flash 1.5s;
    -ms-animation: flash 1.5s;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    animation-timing-function: linear;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    -o-animation-timing-function: linear;
    -ms-animation-timing-function: linear;
  }

  .arrow {
    border: solid ghostwhite;
    border-width: 0 4px 4px 0;
    display: inline-block;
    padding: 11px;
    margin-top: 12px;
    border-radius: 15%;
  }

  .downButton:hover {
    border: 1px solid ghostwhite;
  }

  .downButton:hover > .arrow {
    border-width: 0 5px 5px 0;
    animation: moveUpDown 800ms;
    -webkit-animation: moveUpDown 800ms;
    -moz-animation: moveUpDown 800ms;
    -o-animation: moveUpDown 800ms;
    -ms-animation: moveUpDown 800ms;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    animation-timing-function: linear;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    -o-animation-timing-function: linear;
    -ms-animation-timing-function: linear;
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
  }

  @media (max-width: 500px) {
    .introBeforeLoad {
      background-position: left 35% center;
    }

    .intro {
      background-position: left 35% center;
    }

    .animated-title {
      margin-left: 25vw;
      margin-top: 47vh;
    }
  }
</style>
