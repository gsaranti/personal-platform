<template>
    <div class="aboutSection">
      <div class="aboutMe">
        <div :class="{visibleItem: isVisible, hiddenItem: !isVisible}">
        <div class="aboutLabelWrapper">
          <h2 class="aboutLabel">About Me</h2>
        </div>
        <p>
          When I look back on how I landed in the field of software engineering, I often reflect
          on the things I've always enjoyed doing. Getting in a good day at the mountain skiing,
          learning a new song on the guitar, or documenting random events of my life through short
          form videos are all activities that I grew up loving to do.
          <br><br>
          I find that I am attracted to the challenging nature of these things. There is
          persistence needed to build my skill and problem solving is always involved. What's my
          best line down a difficult ski run? How much longer do I need to practice to perfect this
          song? How should I edit this part of the video to keep the viewer entertained?
          <br><br>
          Although as a software engineer I ask different questions, my mindset is in a similar state.
          Software engineering is challenging, takes persistence, and at it's core is problem solving.
          This is what I love about the work I do.
          <br><br>
          But let's not be too analytical here! Outside of the office you'll find me enjoying the
          outdoors, whether that's exploring the city I'm in or heading out for a weekend in the
          mountains. More often than not music is involved. That usually means a jam session on
          the piano or guitar, or possibly blasting some good old Seattle grunge in the car. But
          in the end, what makes all of these things better is when I get to do them with my friends
          and family! They're the people that keep me going, keep me laughing, and keep me loving
          life.
        </p>
        </div>
      </div>
      <div class="collage">
        <div class="imageRow">
          <v-img class="long" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833764/family_v5_tdyc5n.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833764/family_v5_tdyc5n.jpg"/>
          <v-img class="tall" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833765/look_v5_ow7dta.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833765/look_v5_ow7dta.jpg"/>
          <v-img class="long" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833765/bench_v5_mynrxo.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833765/bench_v5_mynrxo.jpg"/>
        </div>
        <div class="imageRow">
          <v-img class="tall" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833764/buildings_v5_si7azp.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833764/buildings_v5_si7azp.jpg"/>
          <v-img class="long" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833765/ski_v5_dbasle.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833765/ski_v5_dbasle.jpg"/>
          <v-img class="long" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833765/henry_v5_vqzxsm.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833765/henry_v5_vqzxsm.jpg"/>
        </div>
        <div class="imageRow">
          <v-img class="long" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833764/ferry_v5_qj2xq2.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833764/ferry_v5_qj2xq2.jpg"/>
          <v-img class="tall" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833764/bike_v5_qhvlxv.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833764/bike_v5_qhvlxv.jpg"/>
          <v-img class="long" lazy-src="https://res.cloudinary.com/df1dpirbp/image/upload/q_10,f_auto/v1614833764/book_v5_quytft.jpg"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1614833764/book_v5_quytft.jpg"/>
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
    }
  }
</script>

<style>
  .aboutSection {
    overflow: hidden;
  }

  .aboutMe {
    float: right;
    width: 650px;
    line-height: 1.5;
    padding: 30px 65px;
    background-color: #D8D7CC;
    border-left: 5px solid #84A9D1;
    height: 770px;
    position: relative;
    z-index: 1;
  }

  .collage {
    position: relative;
    z-index: -1;
    background-color: #84A9D1;
    height: 770px;
    width: 100vw;
  }

  .aboutLabel {
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    margin-right: 25%;
    margin-left: 25%;
    margin-bottom: 20px;
  }

  .aboutLabel:before,
  .aboutLabel:after {
    background-color: #000;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  .aboutLabel:before {
    right: 0.5em;
    margin-left: -50%;
  }

  .aboutLabel:after {
    left: 0.5em;
    margin-right: -50%;
  }

  .aboutLabelWrapper {
    padding-top: 25px;
    background-color: #D8D7CC;
  }

  .imageRow {
    display: flex;
    align-items: center;
  }

  @media (min-width: 1545px) {
    .imageRow {
      float: right;
    }
  }

  .long {
    height: 250px;
    width: 333px;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
  }

  .tall {
    height: 250px;
    width: 188px;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
  }

  @media (max-width: 1000px) {
    .aboutMe {
      width: 100%;
      height: unset;
      border-left: none;
      overflow: auto;
    }

    .collage {
      visibility: hidden;
      height: 0;
    }
  }

  @media (max-width: 500px) {
    .aboutMe {
      padding: 30px 40px;
    }

    .aboutLabel:before {
      right: 0.5em;
      margin-left: -50%;
    }

    .aboutLabel:after {
      left: 0.5em;
      margin-right: -50%;
    }

    .aboutLabel {
      margin-right: 12%;
      margin-left: 12%;
    }
  }
</style>
