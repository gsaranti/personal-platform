<template>
  <div v-bind:class="{intro: isLoaded, beforeLoad: !isLoaded}">
    <div>
      <p v-bind:class="{signature: isLoaded}">George Sarantinos</p>
    </div>
    <div v-bind:class="{'animated-title': isLoaded}">
      <div v-bind:class="{'text-top': isLoaded}">
        <div>
          <span style="margin-right: 135px">Hi there,</span>
          <span>My name is George</span>
        </div>
      </div>
      <div v-bind:class="{'text-bottom': isLoaded}">
        <div>Get to know me!</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'intro',
    components: {
    },
    data: () => {
      return {
        isLoaded: false
      }
    },
    mounted() {
      this.isLoaded = true;
    }
  }
</script>

<style>
  @keyframes fadeIn {
    0% {
      opacity:0;
      visibility: visible;
    }
    100% {
      opacity:1;
      visibility: visible;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity:0;
      visibility: visible;
    }
    100% {
      opacity:1;
      visibility: visible;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity:0;
      visibility: visible;
    }
    100% {
      opacity:1;
      visibility: visible;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity:0;
      visibility: visible;
    }
    100% {
      opacity:1;
      visibility: visible;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity:0;
      visibility: visible;
    }
    100% {
      opacity:1;
      visibility: visible;
    }
  }

  .beforeLoad {
    visibility: hidden;
  }

  .intro {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: url(https://res.cloudinary.com/df1dpirbp/image/upload/g_auto,q_auto,f_auto,e_sharpen:100,e_brightness_hsb:-10/v1609018153/2020-11-06_12.37.49_h3ayue.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    animation: fadeIn ease 2s;
    -webkit-animation: fadeIn ease 2s;
    -moz-animation: fadeIn ease 2s;
    -o-animation: fadeIn ease 2s;
    -ms-animation: fadeIn ease 2s;
  }

  .signature {
    visibility: hidden;
    color: ghostwhite;
    font-family: "Sacramento", sans-serif;
    font-size: 35px;
    float: right;
    margin-top: 10px;
    margin-right: 25px;
    white-space: nowrap;
    animation: fadeIn ease 1.5s;
    -webkit-animation: fadeIn ease 1.5s;
    -moz-animation: fadeIn ease 1.5s;
    -o-animation: fadeIn ease 1.5s;
    -ms-animation: fadeIn ease 1.5s;
    animation-fill-mode: forwards;
    animation-delay: 3s;
  }

  @keyframes showTopText {
    0% { transform: translate3d(0, 100%, 0); }
    40%, 60% { transform: translate3d(0, 50%, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }

  @keyframes showBottomText {
    0% { transform: translate3d(0, -100%, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }

  .animated-title {
    color: ghostwhite;
    font-family: "Baloo2-Medium", sans-serif;
    margin-top: 50vh;
    margin-left: 45vw;
    margin-right: 5vw;
  }

  @media (max-width: 550px) {
    .animated-title {
      margin-left: 35vw;
    }
  }

  @media (max-height: 400px) {
    .animated-title {
      margin-top: 0;
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
    animation: showTopText 1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    bottom: 0;
    transform: translate(0, 100%);
  }

  .animated-title > div.text-top div span:first-child {
    color: ghostwhite;
  }

  .animated-title > div.text-bottom {
    bottom: 0;
  }

  .animated-title > div.text-bottom div {
    animation: showBottomText 0.5s;
    animation-delay: 2.25s;
    animation-fill-mode: forwards;
    top: 0;
    transform: translate(0, -100%);
  }
</style>
