<template>
  <div v-if="backgroundLoaded || !animate" :class="{ 'navigation-fade-in': animate, navigation: !animate }">
    <div class="right-section">
      <p :class="{ 'signature-back': goBack, signature: navigationDropDown }">George Sarantinos</p>
      <div>
        <a :class="{ 'social-logo-container': goBack }" href="https://www.linkedin.com/in/george-sarantinos-106857b5/" target="_blank">
          <v-img class="social-logo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613450422/linkedIn_yrfzuo.png"/>
        </a>
        <a :class="{ 'social-logo-container': goBack }" href="https://github.com/gsaranti" target="_blank">
          <v-img class="social-logo invert" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1618011051/github_v1.png"/>
        </a>
        <a :class="{ 'social-logo-container': goBack }" href="https://www.instagram.com/george_sarantinos/" target="_blank">
          <v-img class="social-logo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613411113/insta_cwhbqk.png"/>
        </a>
      </div>
    </div>
    <v-menu v-if="navigationDropDown">
      <template v-slot:activator="{ props }">
        <div class="drop-down-menu" v-bind="props">
          <div>
            <div class="bar-1"></div>
            <div class="bar-2"></div>
            <div class="bar-3"></div>
          </div>
        </div>
      </template>
      <v-list rounded style="z-index: 2">
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="callAutoScroll(item.scrollTo)"
            link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: 'navigation',
  components: {
  },
  props: {
    autoScroll: Function,
    backgroundLoaded: Boolean,
    navigationDropDown: Boolean,
    goBack: Boolean,
  },
  data() {
    return {
      items: [
        { title: 'Home', scrollTo: '.intro-scroll' },
        { title: 'Experience', scrollTo: '.experience-scroll' },
        { title: 'About Me', scrollTo: '.about-scroll' },
        { title: 'Projects', scrollTo: '.projects-scroll' },
        { title: 'Contact', scrollTo: '.contact-scroll' }
      ]
    }
  },
  created() {
  },
  methods: {
    callAutoScroll(selector) {
      if (selector) {
        this.autoScroll(selector);
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
.navigation-fade-in {
  background-color: rgba(104, 104, 90, 0.5);
  box-shadow: 0 0 5px rgba(0,0,0,10);
  height: 55px;
  width: 100vw;
  z-index: 3;
  top: 0;
  left: 0;
  position: fixed;
  animation: fadeIn 2s;
  -webkit-animation: fadeIn 2s;
  -moz-animation: fadeIn 2s;
  -o-animation: fadeIn 2s;
  -ms-animation: fadeIn 2s;
}

.navigation {
  background-color: rgba(104, 104, 90, 0.5);
  box-shadow: 0 0 5px rgba(0,0,0,10);
  height: 55px;
  width: 100vw;
  z-index: 3;
  top: 0;
  left: 0;
  position: fixed;
}

.drop-down-menu {
  position: fixed;
  cursor: pointer;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.drop-down-menu:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.bar-1, .bar-2, .bar-3 {
  width: 30px;
  height: 3px;
  background-color: ghostwhite;
  margin: 5px 0;
  transition: 0.2s;
  border-radius: 50px;
}

.drop-down-menu:hover .bar-1, .drop-down-menu:hover .bar-3 {
  margin: 7px 0;
}

.change .bar-1 {
  transform: rotate(-45deg) translate(-9px, 6px);
  -webkit-transform: rotate(-45deg) translate(-9px, 6px);
  -moz-transform: rotate(-45deg) translate(-9px, 6px);
  -o-transform: rotate(-45deg) translate(-9px, 6px);
  -ms-transform: rotate(-45deg) translate(-9px, 6px);

}

.change .bar-2 {
  opacity: 0;
}

.change .bar-3 {
  transform: rotate(45deg) translate(-8px, -8px);
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  -moz-transform: rotate(45deg) translate(-8px, -8px);
  -o-transform: rotate(45deg) translate(-8px, -8px);
  -ms-transform: rotate(45deg) translate(-8px, -8px);
}

.signature {
  color: ghostwhite;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 28px;
  float: right;
  margin-top: 9px;
  margin-right: 30px;
  margin-left: 10px;
  white-space: nowrap;
}

.signature-back {
  color: ghostwhite;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 28px;
  float: right;
  margin-top: 9px;
  margin-right: 30px;
  margin-left: 10px;
  white-space: nowrap;
}

.social-logo {
  width: 25px;
  height: 25px;
  margin-top: 15px;
  margin-right: 15px;
  float: right;
}

.social-logo-container {}

.invert {
  filter: invert(1);
}

@media (max-width: 600px) {
  .navigation-fade-in {
    background-color: transparent;
    box-shadow: none;
    z-index: 3;
    top: 0;
    left: 0;
    position: absolute;
    animation: fadeIn 2s;
    -webkit-animation: fadeIn 2s;
    -moz-animation: fadeIn 2s;
    -o-animation: fadeIn 2s;
    -ms-animation: fadeIn 2s;
  }

  .navigation {
    background-color: transparent;
    box-shadow: none;
    z-index: 3;
    top: 0;
    left: 0;
    position: absolute;
  }

  .drop-down-menu {
    position: fixed;
    z-index: 2;
    cursor: pointer;
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 15px;
    border-radius: 30%;
    border: 1px solid ghostwhite;
    background-color: rgba(104, 104, 90, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
  }

  .right-section {
    display: block;
    float: right;
    margin-right: 20px;
  }

  .signature {
    font-size: 25px;
    margin-top: 10px;
    margin-right: 0;
  }

  .signature-back {
    display: none;
  }

  .social-logo-container {
    display: none;
  }

  .social-logo {
    width: 22px;
    height: 22px;
    margin-top: 3px;
    margin-left: 15px;
    margin-right: 0;
    display: inline;
  }

  .invert {
    filter: invert(0);
  }
}
</style>
