import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    animate: true,
    homeScrollY: undefined
  },
  mutations: {
    setAnimate(state, data) {
      state.animate = data;
    },
    setHomeScrollY(state, data) {
      state.homeScrollY = data;
    },
  },
  actions: {}
})
