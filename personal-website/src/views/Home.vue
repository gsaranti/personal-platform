<template>
  <div>
    <intro :autoScroll="autoScroll"/>
    <experience class="experienceScroll"/>
    <about class="aboutScroll"/>
  </div>
</template>

<script>
  import smoothscroll from 'smoothscroll-polyfill';
  import intro from "../components/intro";
  import experience from "../components/experience";
  import about from "../components/about";

  export default {
    name: 'home',
    components: {
      intro,
      experience,
      about
    },
    created() {
      smoothscroll.polyfill();
    },
    methods: {
      autoScroll() {
        this.$el.querySelector('.experienceScroll').scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<style>
  .experienceScroll {
  }

  .aboutScroll {
  }

  .visibleItem {
    animation: fadeInUp 1s ease forwards;
    -moz-animation: fadeInUp 1s ease forwards;
    -webkit-animation: fadeInUp 1s ease forwards;
    -o-animation: fadeInUp 1s ease forwards;
    -ms-animation: fadeInUp 1s ease forwards;
  }

  .hiddenItem {
    opacity: 0;
  }

  @keyframes fadeInUp {
    0% {
      transform: translate3d(0, 40px, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @-moz-keyframes fadeInUp {
    0% {
      -moz-transform: translate3d(0, 40px, 0);
      opacity: 0;
    }
    100% {
      -moz-transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInUp {
    0% {
      -webkit-transform: translate3d(0, 40px, 0);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @-o-keyframes fadeInUp {
    0% {
      -o-transform: translate3d(0, 40px, 0);
      opacity: 0;
    }
    100% {
      -o-transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @-ms-keyframes fadeInUp {
    0% {
      -ms-transform: translate3d(0, 40px, 0);
      opacity: 0;
    }
    100% {
      -ms-transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
</style>
