<template>
  <div>
    <intro/>
    <experience/>
  </div>
</template>

<script>
  import intro from "../components/intro";
  import experience from "../components/experience";

  export default {
  name: 'home',
  components: {
    intro,
    experience
  }
}
</script>

<style>
</style>
