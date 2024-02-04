<template>
  <div class="about-section">
    <div class="about-me">
      <div :class="{ 'base-item': !animate, 'visible-item': (animate && isVisible), 'hidden-item': !isVisible }">
        <div class="about-label-wrapper">
          <h2 class="about-label">About Me</h2>
        </div>

        <div class="image-row">
          <div class="image-item">
            <v-img :height="250"
                   :width="333"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/family_v5_tdyc5n.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/family_v5_tdyc5n.jpg"/>
          </div>
          <div class="image-item image-hidden-1">
            <v-img :height="250"
                   :width="188"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/look_v5_ow7dta.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/look_v5_ow7dta.jpg"/>
          </div>
          <div class="image-item image-hidden-2">
            <v-img :height="250"
                   :width="333"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/bench_v5_mynrxo.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/bench_v5_mynrxo.jpg"/>
          </div>
        </div>

        <p>
          When I look back on how I landed in the field of software engineering, I often reflect
          on the things I've always enjoyed doing. Getting in a good day at the mountain skiing,
          learning a new song on the guitar, or documenting random events of my life through short
          form videos are all activities that I grew up loving to do.
        </p>
        <br>
        <p>
          I find that I am attracted to the challenging nature of these things. There is
          persistence needed to build my skill and problem solving is always involved. What's my
          best line down a difficult ski run? How much longer do I need to practice to perfect this
          song? How should I edit this part of the video to keep the viewer entertained?
        </p>

        <div class="image-row">
          <div class="image-item  image-hidden-1">
            <v-img :height="250"
                   :width="188"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/buildings_v5_si7azp.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/buildings_v5_si7azp.jpg"/>
          </div>
          <div class="image-item image-hidden-2">
            <v-img :height="250"
                   :width="333"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/ski_v5_dbasle.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/ski_v5_dbasle.jpg"/>
          </div>
          <div class="image-item">
            <v-img :height="250"
                   :width="333"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833765/henry_v5_vqzxsm.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833765/henry_v5_vqzxsm.jpg"/>
          </div>
        </div>

        <p>
          Although as a software engineer I ask different questions, my mindset is in a similar state.
          Software engineering is challenging, takes persistence, and at it's core is problem solving.
          This is what I love about the work I do.
        </p>
        <br>
        <p>
          But let's not be too analytical here! Outside of the office you'll find me enjoying the
          outdoors, whether that's exploring the city I'm in or heading out for a weekend in the
          mountains. More often than not music is involved. That usually means a jam session on
          the piano or guitar, or possibly blasting some good old Seattle grunge in the car. But
          in the end, what makes all of these things better is when I get to do them with my friends
          and family! They're the people that keep me going, keep me laughing, and keep me loving
          life.
        </p>

        <div class="image-row">
          <div class="image-item">
            <v-img :height="250"
                   :width="333"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/ferry_v5_qj2xq2.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/ferry_v5_qj2xq2.jpg"/>
          </div>
          <div class="image-item image-hidden-1">
            <v-img :height="250"
                   :width="188"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/bike_v5_qhvlxv.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/bike_v5_qhvlxv.jpg"/>
          </div>
          <div class="image-item image-hidden-2">
            <v-img :height="250"
                   :width="333"
                   lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto,r_25/v1614833764/book_v5_quytft.jpg"
                   src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto,r_25/v1614833764/book_v5_quytft.jpg"/>
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
}

.about-me {
  line-height: 1.5;
  padding: 10px 65px;
  background-color: #D8D7CC;
  position: relative;
}

.about-label-wrapper {
  padding-top: 25px;
  background-color: #D8D7CC;
}

.about-label {
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  margin-right: 25%;
  margin-left: 25%;
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
  padding-top: 20px;
  padding-bottom: 20px;
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
