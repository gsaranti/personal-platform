import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Project from './views/Project';

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
      path: '/video-transcode-system',
      name: 'project',
      component: Project
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'project') {
      return { x: 0, y: 0 }
    } else if (savedPosition) {
      return savedPosition
    }
  }
})
