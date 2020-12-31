<template>
  <div class="item">
    <div :class="{imageHolderLeft: side === 'left', imageHolderRight: side === 'right'}">
      <v-lazy>
        <img class="image" :src=imgUrl alt=""/>
      </v-lazy>
    </div>
    <div :class="{infoLeft: side === 'left', infoRight: side === 'right'}">
      <div>
        <h2 class="placement">{{label}}</h2>
        <div :class="{collapsed: !isExpanded, expanded: isExpanded}">
          <p v-for="(paragraph, index) in description" :key="index">
            {{ paragraph }}<br><br>
          </p>
        </div>
        <p :class="{noDots: isExpanded, dots: !isExpanded}">...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";

  export default {
    name: 'experienceItem',
    props: {
      side: String,
      imgUrl: String,
      label: String,
      description: Array,
      expand: Boolean
    },
    components: {
    },
    data: () => {
      return {
        isExpanded: false
      }
    },
    mounted() {
      const handler = this.onVisibilityChange(this.$el);

      if (window.addEventListener) {
        addEventListener('scroll', _.throttle(handler, 100), false);
      }
    },
    methods: {
      onVisibilityChange(el) {
        let old_visible = this.isExpanded;
        const self = this;
        return function () {
          const visible = self.isElementInViewport(el);
          if (visible !== old_visible) {
            old_visible = visible;
            self.isExpanded = visible;
          }
        }
      },
      isElementInViewport (el) {
        const rect = el.getBoundingClientRect();

        return (
          rect.top >= -150 - (window.innerWidth * .1) &&
          rect.top + 400 <= 700
        );
      }
    }
  }
</script>

<style>
  .item {
    margin-top: 20px;
    margin-bottom: 80px;
  }

  .imageHolderLeft {
    float: left;
    margin-left: 5vw;
    border-radius: 25px;
    padding-right: 20px;
  }

  .imageHolderRight {
    float: right;
    margin-right: 5vw;
    border-radius: 25px;
    padding-left: 20px;
  }

  .image {
    border-radius: 25px;
    width: 400px;
    height: 250px;
    background-repeat: no-repeat;
    background-blend-mode: screen;
    background-color: rgba(192,192,192, 0.4);
  }

  .infoLeft {
    margin-right: 5vw;
    overflow: hidden;
    text-align: left;
  }

  .infoRight {
    margin-left: 5vw;
    overflow: hidden;
    text-align: left;
  }

  .placement {
    margin-bottom: 10px;
  }

  @keyframes expandText {
    0% {
      max-height: 180px;
    }
    100% {
      max-height: 500px;
    }
  }

  @keyframes collapseText {
    0% {
      max-height: 500px;
    }
    100% {
      max-height: 180px;
    }
  }

  .collapsed {
    max-height: 180px;
    animation: collapseText 1s;
    -webkit-animation: collapseText 1s;
    -moz-animation: collapseText 1s;
    -o-animation: collapseText 1s;
    -ms-animation: collapseText 1s;
    animation-fill-mode: forwards;
  }

  .expanded {
    animation: expandText 1s;
    -webkit-animation: expandText 1s;
    -moz-animation: expandText 1s;
    -o-animation: expandText 1s;
    -ms-animation: expandText 1s;
    animation-fill-mode: forwards;
  }

  .dots {
    text-align: center;
    font-weight: bold;
  }

  .noDots {
    visibility: hidden;
  }
</style>
