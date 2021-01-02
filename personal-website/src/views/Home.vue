<template>
  <div>
    <intro :autoScroll="autoScroll" />
    <v-lazy>
      <experience class="experience" />
    </v-lazy>
  </div>
</template>

<script>
  import smoothscroll from 'smoothscroll-polyfill';
  import intro from "../components/intro";
  import experience from "../components/experience";

  export default {
    name: 'home',
    components: {
      intro,
      experience
    },
    created() {
      smoothscroll.polyfill();
    },
    methods: {
      autoScroll() {
        this.$el.querySelector('.experience').scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<style>
  .experience {

  }
</style>
