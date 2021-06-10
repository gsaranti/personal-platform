<template>
  <div v-if="backgroundLoaded || !animate" :class="{navigationFadeIn: animate, navigation: !animate}">
    <p :class="{signatureBack: goBack, signature: navigationDropDown}">George Sarantinos</p>
    <a :class="{socialLogoContainer: goBack}" href="https://www.linkedin.com/in/george-sarantinos-106857b5/" target="_blank">
      <v-img class="socialLogo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613450422/linkedIn_yrfzuo.png"/>
    </a>
    <a :class="{socialLogoContainer: goBack}" href="https://github.com/gsaranti" target="_blank">
      <v-img class="socialLogo invert" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1618011051/github_v1.png"/>
    </a>
    <a :class="{socialLogoContainer: goBack}" href="https://www.instagram.com/george_sarantinos/" target="_blank">
      <v-img class="socialLogo" src="https://res.cloudinary.com/df1dpirbp/image/upload/q_auto,f_auto/v1613411113/insta_cwhbqk.png"/>
    </a>
    <v-menu v-if="navigationDropDown">
      <template v-slot:activator="{ on, attrs }">
        <div class="dropDownMenu" v-bind="attrs" v-on="on">
          <div>
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
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
          { title: 'Home', scrollTo: '.introScroll' },
          { title: 'Experience', scrollTo: '.experienceScroll' },
          { title: 'About Me', scrollTo: '.aboutScroll' },
          { title: 'Projects', scrollTo: '.projectsScroll' },
          { title: 'Contact', scrollTo: '.contactScroll' }
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
  .navigationFadeIn {
    background-color: rgba(104, 104, 90, 0.5);
    box-shadow: 0 0 5px rgba(0,0,0,10);
    height: 55px;
    width: 100vw;
    z-index: 3;
    top: 0;
    left: 0;
    position: fixed;
    opacity: 0;
    animation: fadeIn 1.5s forwards 3s;
    -webkit-animation: fadeIn 1.5s forwards 3s;
    -moz-animation: fadeIn 1.5s forwards 3s;
    -o-animation: fadeIn 1.5s forwards 3s;
    -ms-animation: fadeIn 1.5s forwards 3s;
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

  .dropDownMenu {
    position: fixed;
    cursor: pointer;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }

  .dropDownMenu:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .bar1, .bar2, .bar3 {
    width: 30px;
    height: 3px;
    background-color: ghostwhite;
    margin: 5px 0;
    transition: 0.2s;
    border-radius: 50px;
  }

  .dropDownMenu:hover .bar1, .dropDownMenu:hover .bar3 {
    margin: 7px 0;
  }

  .change .bar1 {
    transform: rotate(-45deg) translate(-9px, 6px);
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    -moz-transform: rotate(-45deg) translate(-9px, 6px);
    -o-transform: rotate(-45deg) translate(-9px, 6px);
    -ms-transform: rotate(-45deg) translate(-9px, 6px);

  }

  .change .bar2 {opacity: 0;}

  .change .bar3 {
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
    margin-left: 15px;
    white-space: nowrap;
  }

  .signatureBack {
    color: ghostwhite;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 28px;
    float: right;
    margin-top: 9px;
    margin-right: 30px;
    margin-left: 15px;
    white-space: nowrap;
  }

  .socialLogo {
    width: 25px;
    height: 25px;
    margin-top: 15px;
    margin-right: 15px;
    float: right;
  }

  .socialLogoContainer {}

  .invert {
    filter: invert(1);
  }

  @media (max-width: 600px) {
    .navigationFadeIn {
      background-color: transparent;
      box-shadow: none;
      z-index: 3;
      top: 0;
      left: 0;
      position: absolute;
      opacity: 0;
      animation: fadeIn 1.5s forwards 3s;
      -webkit-animation: fadeIn 1.5s forwards 3s;
      -moz-animation: fadeIn 1.5s forwards 3s;
      -o-animation: fadeIn 1.5s forwards 3s;
      -ms-animation: fadeIn 1.5s forwards 3s;
    }

    .navigation {
      background-color: transparent;
      box-shadow: none;
      z-index: 3;
      top: 0;
      left: 0;
      position: absolute;
    }

    .signature {
      color: ghostwhite;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-size: 28px;
      float: right;
      margin-top: 15px;
      margin-right: 25px;
      white-space: nowrap;
    }

    .signatureBack {
      display: none;
    }

    .socialLogo {
      width: 25px;
      height: 25px;
      float: right;
      margin-top: 22px;
      margin-right: 10px;
    }

    .socialLogoContainer {
      display: none;
    }

    .dropDownMenu {
      position: fixed;
      z-index: 2;
      cursor: pointer;
      width: 50px;
      height: 50px;
      margin-top: 15px;
      margin-left: 15px;
      border-radius: 30%;
      border: 1px solid ghostwhite;
      background-color: rgba(192,192,192, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      float: left;
    }

    .invert {
      filter: invert(0);
    }
  }

  @media (max-width: 500px) {
    .signature {
      font-size: 22px;
      margin-right: 20px;
    }

    .socialLogo {
      width: 20px;
      height: 20px;
      margin-top: 20px;
    }
  }
</style>
