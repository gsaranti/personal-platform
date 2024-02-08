<template>
  <div :class="{ 'intro': backgroundLoaded, 'intro-before-load': !backgroundLoaded }">
    <div :class="{ 'title-section': backgroundLoaded,'title-section-before-load': !backgroundLoaded }">
      <div v-if="backgroundLoaded" class="title">
        <div class="title-top">
          <div>
            <span style="margin-right: 145px">Hi there,</span>
            <span class="title-middle">My name is George</span>
          </div>
        </div>
        <div>
          <div>Get to know me!</div>
        </div>
      </div>
      <div v-if="backgroundLoaded" class="down-button-intro">
        <div v-on:click="callAutoScroll('.experience-scroll')" class="down-button">
          <i class="arrow"></i>
        </div>
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

html, body {
  overflow-x: hidden !important;
  max-width: 100% !important;
}

body {
  position: relative;
}

.intro-before-load {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  filter: blur(12px);
  box-shadow: 0 0 5px rgba(0,0,0,10);
  background: url(https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,e_brightness_hsb:-10/v1614834825/seaside_blur_v5_y7uohh.jpg) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.intro {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  background: url(https://res.cloudinary.com/df1dpirbp/image/upload/g_auto,q_auto,f_auto,e_brightness_hsb:-10/v1614833766/seaside_v5_abc.jpg) no-repeat center center;
  box-shadow: 0 0 5px rgba(0,0,0,10);
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

.title-section-before-load {
  visibility: hidden;
}

.title-section {
  position: absolute;
  bottom: 0;
  margin-bottom: 10vh;
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;
  -ms-animation: fadeIn 2s;
}

.title {
  color: ghostwhite;
  font-family: "Roboto", monospace;
  margin-left: 45vw;
  margin-right: 5vw;
  white-space: nowrap;
}

.title > div {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.title > div div {
  font-size: 30px;
  padding: 2vmin 0;
  float: left;
}

.title > div div span {
  display: block;
}

.title > div.title-top {
  border-bottom: 3px solid ghostwhite;
  width: 50vw;
  top: 0;
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

.down-button-intro {
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;
  -ms-animation: fadeIn 2s;
}

.down-button {
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

.down-button:hover {
  border: 1px solid ghostwhite;
}

.down-button:hover > .arrow {
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

.arrow {
  border: solid ghostwhite;
  border-width: 0 4px 4px 0;
  display: inline-block;
  padding: 11px;
  margin-top: 10px;
  margin-left: 14px;
  border-radius: 15%;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}

@media (max-height: 275px) {
  .down-button {
    display: none;
  }
}

@media (max-height: 175px) {
  .title {
    display: none;
  }
}

@media (max-width: 625px) {
  .title > div.title-top {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .intro-before-load {
    background-position: left 35% center;
  }

  .intro {
    background-position: left 35% center;
  }

  .title {
    margin-left: 20vw;
    word-spacing: -10px;
  }
}
</style>
