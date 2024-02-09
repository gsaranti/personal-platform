<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.base-item {
}

.visible-item {
  animation: fadeInUp 1s ease forwards;
  -moz-animation: fadeInUp 1s ease forwards;
  -webkit-animation: fadeInUp 1s ease forwards;
  -o-animation: fadeInUp 1s ease forwards;
  -ms-animation: fadeInUp 1s ease forwards;
}

.hidden-item {
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
