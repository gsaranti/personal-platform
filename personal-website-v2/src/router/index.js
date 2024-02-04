import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transcode-streaming-systems',
      name: 'project',
      component: () => import('../views/Project.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'project' || (to.name === 'home' && !store.state.homeScrollY)) {
      return { top: 0 };
    } else if (to.name === 'home' && store.state.homeScrollY) {
      return { top: store.state.homeScrollY };
    } else if (savedPosition) {
      return savedPosition;
    }
  }
});

router.beforeEach((to, from, next) => {
  if (from.name === 'home') {
    store.commit('setHomeScrollY', window.scrollY);
  }
  next();
});

export default router
