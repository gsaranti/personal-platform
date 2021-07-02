import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Project from './views/Project';
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transcode-streaming-systems',
      name: 'project',
      component: Project
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'project') {
      return {x: 0, y: 0};
    } else if (to.name === 'home' && !store.state.visitedHome) {
      return {x: 0, y: 0};
    } else if (savedPosition) {
      return savedPosition;
    }
  }
})
