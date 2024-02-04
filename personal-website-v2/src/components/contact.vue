<template>
  <div class="contact-section">
    <div :class="{ 'base-item': !animate, 'visible-item': (animate && isVisible), 'hidden-item': !isVisible }">
      <h1 class="contact-label">Contact</h1>
      <h3 class="contact-subheading">I'm always excited to meet new people!</h3>
      <div class="contact-text">
        <p>
          Want to learn more about my background in software and/or collaborate on an innovative project?
          Feel free to reach out to me!
        </p>
      </div>
      <div class="social-logos-section">
        <a href="https://www.linkedin.com/in/george-sarantinos-106857b5/" target="_blank">
          <v-img class="contact-social-logo"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613450422/linkedIn_yrfzuo.png"/>
        </a>
        <a href="https://github.com/gsaranti" target="_blank">
          <v-img class="contact-social-logo center-logo"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1618011051/github_v1.png"/>
        </a>
        <a href="https://www.instagram.com/george_sarantinos/" target="_blank">
          <v-img class="contact-social-logo"
                 src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613411113/insta_cwhbqk.png"/>
        </a>
      </div>
      <div class="contact-info">
        <p class="full-name">George Sarantinos</p>
        <p>Software Engineer</p>
        <p>georgesarantinos18@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: 'contact',
  components: {},
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
      return this.$store.state.animate;
    }
  }
}
</script>

<style>
.contact-section {
  text-align: center;
  background-color: #68685A;
  color: ghostwhite;
  position: relative;
  padding-bottom: 30px;
}

.contact-label {
  font-weight: bolder;
  font-size: 50px;
  padding-top: 20px;
}

.contact-subheading {
  font-weight: bold;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}

.contact-text {
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
}

.social-logos-section a {
  display: inline-block;
  margin-top: 20px;
}

.contact-social-logo {
  width: 100px;
  height: 100px;
  align-content: center;
}

.center-logo {
  margin-left: 15px;
  margin-right: 15px;
}

.contact-info {
  line-height: 1.5;
  margin-top: 15px;
}

.full-name {
  font-weight: bold;
}

@media (max-width: 550px) {
  .contact-social-logo {
    width: 70px;
    height: 70px;
  }
}
</style>
