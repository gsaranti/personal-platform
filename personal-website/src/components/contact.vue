<template>
  <div class="contactSection">
    <div :class="{baseItem: !animate, visibleItem: (animate && isVisible), hiddenItem: !isVisible}">
      <h1 class="contactLabel">Contact</h1>
      <h3 class="contactSubheading">I'm always excited to meet new people!</h3>
      <div class="contactText">
        <p>
          Want to learn more about my background in Software and/or collaborate on an innovative project?
          Feel free to reach out to me!
        </p>
        <br>
        <a href="https://www.linkedin.com/in/george-sarantinos-106857b5/" target="_blank">
          <v-img class="contactSocialLogo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613450422/linkedIn_yrfzuo.png"/>
        </a>
        <a href="https://github.com/gsaranti" target="_blank">
          <v-img class="contactSocialLogo centerLogo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1618011051/github_v1.png"/>
        </a>
        <a href="https://www.instagram.com/george_sarantinos/" target="_blank">
          <v-img class="contactSocialLogo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613411113/insta_cwhbqk.png"/>
        </a>
        <div class="contactInfo">
          <p class="fullName">George Sarantinos</p>
          <p>Software Engineer</p>
          <p>georgesarantinos18@gmail.com</p>
        </div>
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
  .contactSection {
    background-color: #68685A;
    color: ghostwhite;
    position: relative;
    padding-bottom: 30px;
  }

  .contactLabel {
    font-family: "Archivo-Bold", sans-serif;
    font-size: 50px;
    padding-top: 20px;
  }
  
  .contactSubheading {
    font-family: "Archivo-Semibold", sans-serif;
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
  }

  .contactText {
    font-family: "Archivo-Medium", sans-serif;
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
  }

  .contactSocialLogo {
    width: 100px;
    height: 100px;
    display: inline-block;
  }

  .centerLogo {
    margin-left: 10px;
    margin-right: 10px;
  }

  .contactInfo {
    line-height: 1.5;
    margin-top: 15px;
  }

  .fullName {
    font-weight: bold;
  }

  @media (max-width: 550px) {
    .contactSocialLogo {
      width: 70px;
      height: 70px;
    }
  }
</style>
