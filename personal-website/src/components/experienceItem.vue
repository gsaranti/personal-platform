<template>
  <div :class="{itemCollapsed: !isExpanded, itemExpanded: isExpanded}">
    <div :class="{imageHolderLeft: side === 'left', imageHolderRight: side === 'right'}">
      <v-lazy>
        <img class="image" :src=imgUrl alt=""/>
      </v-lazy>
    </div>
    <div :class="{infoLeft: side === 'left', infoRight: side === 'right'}">
      <div>
        <h2 class="placement">{{label}}</h2>
        <div class="positions">
          <p v-for="(p, index) in positions" :key="index">{{ p }}</p>
        </div>
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
      expand: Boolean,
      scrollDirection: String,
      positions: Array
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
        addEventListener('scroll', _.throttle(handler, 10), false);
      }
    },
    methods: {
      onVisibilityChange(el) {
        const self = this;
        return function () {
          const visible = self.isElementInViewport(el);
          if (visible !== self.isExpanded && visible !== undefined) {
            self.isExpanded = visible;
          }
        }
      },
      isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        if (this.scrollDirection === 'down' && this.isExpanded === false) {
          if (window.innerWidth < 1000) {
            return (
              rect.top >= 0 &&
              rect.bottom + 100 <= (window.innerHeight || document.documentElement.clientHeight)
            );
          }
          return (
            rect.top >= 0 &&
            rect.bottom + 125 <= (window.innerHeight || document.documentElement.clientHeight)
          );
        } else if (this.scrollDirection === 'up' && this.isExpanded === true) {
          if (window.innerWidth < 1000) {
            return (
              rect.top <= window.innerHeight - 625
            );
          }
          return (
            rect.top <= window.innerHeight - 350
          );
        }
      }
    }
  }
</script>

<style>
  @media (max-width: 1000px) {
    .itemExpanded {
      margin-bottom: 10px;
    }

    .itemCollapsed {
      margin-bottom: 40px;
    }

    .imageHolderLeft {
      border-radius: 25px;
      padding-right: 20px;
    }

    .imageHolderRight {
      border-radius: 25px;
      padding-left: 20px;
    }

    .infoLeft {
      margin-right: 10vw;
      margin-left: 10vw;
      margin-top: 20px;
      overflow: hidden;
      text-align: center;
    }

    .infoRight {
      margin-left: 10vw;
      margin-right: 10vw;
      margin-top: 20px;
      overflow: hidden;
      text-align: center;
    }
  }

  @media (min-width: 1000px) {
    .itemExpanded {
      margin-bottom: 30px;
    }

    .itemCollapsed {
      margin-bottom: 70px;
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
  }

  .image {
    border-radius: 25px;
    width: 400px;
    height: 250px;
    background-repeat: no-repeat;
    background-blend-mode: screen;
    background-color: rgba(192,192,192, 0.4);
  }

  .placement {
    margin-bottom: 3px;
  }

  .positions {
    font-style: italic;
    font-weight: bold;
    margin-bottom: 5px;
  }

  @keyframes expandText {
    0% {
      max-height: 155px;
    }
    100% {
      max-height: 750px;
    }
  }

  @keyframes collapseText {
    0% {
      max-height: 750px;
    }
    100% {
      max-height: 155px;
    }
  }

  .collapsed {
    max-height: 155px;
    overflow: hidden;
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
