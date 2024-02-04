<template>
  <div :class="{ 'base-item': !animate, 'visible-item': (animate && isVisible), 'hidden-item': !isVisible }">
    <div class="experience-item">
      <div class="image-holder">
        <v-lazy>
          <img class="image" :src=imgUrl alt=""/>
        </v-lazy>
      </div>
      <div>
        <div class="info">
          <h2 class="placement">{{ label }}</h2>
          <div class="positions">
            <p v-for="(p, index) in positions" :key="index">{{ p }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: 'experienceItem',
  props: {
    imgUrl: String,
    label: String,
    positions: Array
  },
  components: {
  },
  data: () => {
    return {
      isVisible: false,
    }
  },
  mounted() {
    const handler = this.onVisibilityChange(this.$el);
    if (window.addEventListener) {
      addEventListener('scroll', _.throttle(handler, 10), false);
    }
  },
  methods: {
    onVisibilityChange(el) {
      const self = this;
      return function () {
        if (!self.isVisible) {
          const rect = el.getBoundingClientRect();
          self.isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight);
        }
      }
    }
  },
  computed: {
    animate() {
      return this.$store.state.animate;
    }
  }
}
</script>

<style>
.experience-item {
  top: 0;
  margin-right: 5vw;
  margin-left: 5vw;
  padding-bottom: 30px;
}

.image-holder {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  width: 400px;
  height: 250px;
  background-color: rgba(192,192,192, 0.4);
  background-repeat: no-repeat;
  background-blend-mode: screen;
}

.image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.info {
  overflow: hidden;
  text-align: center;
  margin-top: 10px;
}

.placement {
  margin-bottom: 3px;
}

.positions {
  font-style: italic;
  font-weight: bold;
  margin-bottom: 5px;
}

@media (max-width: 500px) {
  .image-holder {
    width: 350px;
    height: 219px;
  }

  .image {
    max-width: 90%
  }
}

@media (max-width: 375px) {
  .experience-item {
    margin-right: 0;
    margin-left: 0;
  }
}

</style>
