<template>
  <div class="about-section">
    <div class="about-me">
      <div :class="{ 'base-item': !animate, 'visible-item': (animate && isVisible), 'hidden-item': !isVisible }">
        <div class="about-label-wrapper">
          <h2 class="about-label">About Me</h2>
        </div>

        <p>
          I am a software engineer with over five years of experience building premium video streaming
          platforms. Throughout my career, I've honed my analytical and restorative skills to architect
          and develop complex systems for video manifest and metadata delivery, cache eviction, ETL
          pipelines, and more.
        </p>

        <div class="image-row">
          <div class="image-item">
            <v-img :height="200"
                   :width="266"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/family_v5_tdyc5n.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/family_v5_tdyc5n.jpg"/>
          </div>
          <div class="image-item image-hidden-1">
            <v-img :height="200"
                   :width="154"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/look_v5_ow7dta.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/look_v5_ow7dta.jpg"/>
          </div>
          <div class="image-item image-hidden-2">
            <v-img :height="200"
                   :width="266"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/bench_v5_mynrxo.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/bench_v5_mynrxo.jpg"/>
          </div>
        </div>

        <p>
          Outside of the office you'll find me enjoying the outdoors, whether that's exploring the city
          I'm in or heading out for a weekend in the mountains. More often than not music is involved.
          That usually means a jam session on the piano or guitar, or possibly blasting some good old Seattle
          grunge in the car.
        </p>

        <div class="image-row">
          <div class="image-item  image-hidden-1">
            <v-img :height="200"
                   :width="150"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/buildings_v5_si7azp.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/buildings_v5_si7azp.jpg"/>
          </div>
          <div class="image-item image-hidden-2">
            <v-img :height="200"
                   :width="266"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/ski_v5_dbasle.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/ski_v5_dbasle.jpg"/>
          </div>
          <div class="image-item">
            <v-img :height="200"
                   :width="266"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/henry_v5_vqzxsm.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/henry_v5_vqzxsm.jpg"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: 'about',
  components: {
  },
  data: () => {
    return {
      isVisible: false
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
          self.isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 50;
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
.about-section {
  overflow: hidden;
  z-index: 2;
  position: relative;
  box-shadow: 0 0 5px rgba(0,0,0,10);
}

.about-me {
  line-height: 1.5;
  padding-top: 30px;
  padding-bottom: 10px;
  background-color: #D8D7CC;
  position: relative;
}

.about-me p {
  text-align: center;
  font-size: 17px;
  margin-right: 20vw;
  margin-left: 20vw;
}

.about-label-wrapper {
  padding-bottom: 25px;
  background-color: #D8D7CC;
}

.about-label {
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  font-size: 30px;
  margin-right: 30%;
  margin-left: 30%;
}

.about-label:before,
.about-label:after {
  background-color: #000;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}

.about-label:before {
  right: 0.5em;
  margin-left: -50%;
}

.about-label:after {
  left: 0.5em;
  margin-right: -50%;
}

.image-row {
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
}

.image-item {
  margin-left: 10px;
  margin-right: 10px;
}

.image-hidden-1 {
}

.image-hidden-2 {
}

@media (max-width: 1000px) {
  .about-me {
    height: unset;
    border-left: none;
    overflow: auto;
  }

  .about-me p {
    margin-right: 15vw;
    margin-left: 15vw;
  }

  .image-hidden-1 {
    display: none;
  }
}

@media (max-width: 750px) {
  .image-hidden-2 {
    display: none;
  }
}

@media (max-width: 500px) {
  .about-me {
    padding: 30px 40px;
  }

  .about-me p {
    margin-right: 5vw;
    margin-left: 5vw;
  }

  .about-label:before {
    right: 0.5em;
    margin-left: -50%;
  }

  .about-label:after {
    left: 0.5em;
    margin-right: -50%;
  }

  .about-label {
    margin-right: 12%;
    margin-left: 12%;
  }
}
</style>
