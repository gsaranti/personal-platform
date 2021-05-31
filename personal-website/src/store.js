import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    animate: true
  },
  mutations: {
    setAnimate(state, data) {
      state.animate = data;
    }
  },
  actions: {}
})
