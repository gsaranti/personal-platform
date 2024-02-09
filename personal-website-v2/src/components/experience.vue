<template>
  <div class="experience">
    <div :class="{ 'base-item': !animate, 'visible-item': (animate && isVisible), 'hidden-item': !isVisible }">
      <h2 class="label">Experience</h2>
    </div>
    <div class="column">
      <div class="row">
        <experienceItem imgUrl="https://res.cloudinary.com/df1dpirbp/image/upload/w_400,h_250/v1609373485/redbull_wr7wps.png"
                        label="Red Bull Media House"
                        :positions="[
                      'Senior Software Engineer: Jan 2021 - Present',
                      'Software Engineer: Jan 2019 - Dec 2020',
                      'Junior Software Engineer: Aug 2018 - Dec 2018'
                    ]"
        />
        <experienceItem imgUrl="https://res.cloudinary.com/df1dpirbp/image/upload/w_360,h_136/v1609570109/LMU1_t6sf4w.png"
                        label="Loyola Marymount University"
                        :positions="[
                      'B.S. Computer Science',
                      'Class of 2018'
                    ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import experienceItem from "./experienceItem.vue";
import _ from "lodash";

export default {
  name: 'experience',
  components: {
    experienceItem
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
          self.isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight);
        }
      }
    }
  },
  computed: {
    animate() {
      return true;
    }
  }
}
</script>

<style>
.experience {
  width: 100vw;
  top: 0;
  left: 0;
  margin-top: 100vh;
  padding-bottom: 10px;
  padding-top: 30px;
  background: #f8f6ed;
  z-index: 3;
  position: relative;
  box-shadow: 0 0 5px rgba(0,0,0,10);
}

.label {
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  margin-right: 30%;
  margin-left: 30%;
  margin-bottom: 35px;
  font-size: 30px;
}

.label:before,
.label:after {
  background-color: #000;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 50%;
}

.label:before {
  right: 0.5em;
  margin-left: -50%;
}

.label:after {
  left: 0.5em;
  margin-right: -50%;
}

.column {
  flex: 50%;
}

.row {
  width: 100vw;
  display: flex;
  justify-content: center;
}

@media (max-width: 950px) {
  .label {
    margin-bottom: 30px;
  }

  .column {
    text-align: center;
  }

  .row {
    display: inline-block;
  }
}

@media (max-width: 800px) {
  .label {
    margin-right: 22%;
    margin-left: 22%;
  }

  .label:before {
    right: 0.5em;
    margin-left: -50%;
  }

  .label:after {
    left: 0.5em;
    margin-right: -50%;
  }
}

@media (max-width: 500px) {
  .label {
    margin-right: 20%;
    margin-left: 20%;
  }

  .label:before {
    right: 0.5em;
    margin-left: -50%;
  }

  .label:after {
    left: 0.5em;
    margin-right: -50%;
  }
}
</style>
