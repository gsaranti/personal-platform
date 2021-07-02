import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    animate: true,
    visitedHome: false
  },
  mutations: {
    setAnimate(state, data) {
      state.animate = data;
    },
    setVisitedHome(state, data) {
      state.visitedHome = data;
    }
  },
  actions: {}
})
