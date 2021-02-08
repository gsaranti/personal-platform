<template>
  <div>
    <intro :autoScroll="autoScroll"/>
    <v-lazy>
      <experience class="experienceScroll"/>
    </v-lazy>
    <v-lazy>
      <about class="aboutScroll"/>
    </v-lazy>
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
</style>
