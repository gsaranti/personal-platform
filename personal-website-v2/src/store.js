import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            animate: true,
            homeScrollY: undefined
        }
    },
    mutations: {
        setAnimate(state, data) {
            state.animate = data;
        },
        setHomeScrollY(state, data) {
            state.homeScrollY = data;
        }
    }
});
