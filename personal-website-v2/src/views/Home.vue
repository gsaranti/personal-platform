<template>
  <div data-app>
    <navigation :autoScroll="autoScroll.bind('arg1')" :background-loaded="backgroundLoaded"
                :navigation-drop-down="true" :go-back="false"/>
    <intro class="intro-scroll" :autoScroll="autoScroll.bind('arg1')" :background-loaded="backgroundLoaded"/>
    <experience class="experience-scroll"/>
    <about class="about-scroll"/>
    <projects class="projects-scroll"/>
    <contact class="contact-scroll"/>
  </div>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";
import navigation from "./Navigation.vue";
import intro from "../components/intro.vue";
import experience from "../components/experience.vue";
import about from "../components/about.vue";
import projects from "../components/projects.vue";
import contact from "../components/contact.vue";

export default {
  name: 'home',
  components: {
    navigation,
    intro,
    experience,
    about,
    projects,
    contact
  },
  data: () => {
    return {
      backgroundLoaded: false,
      backgroundImage: new Image()
    }
  },
  created() {
    this.backgroundImage.src = 'https://res.cloudinary.com/df1dpirbp/image/upload/g_auto,q_auto,f_auto,e_brightness_hsb:-10/v1614833766/seaside_v5_abc.jpg';
    smoothscroll.polyfill();
  },
  mounted() {
    const self = this;
    this.backgroundImage.onload = function () {
      self.backgroundLoaded = true;
    };
  },
  methods: {
    autoScroll(selector) {
      if (window.innerWidth > 600) {
        const y = this.$el.querySelector(selector).getBoundingClientRect().top + document.documentElement.scrollTop - 55;
        window.scrollTo({top: y, behavior: 'smooth'});
      } else {
        this.$el.querySelector(selector).scrollIntoView({behavior: 'smooth'});
      }
    }
  }
}
</script>

<style>
.intro-scroll {
}

.experience-scroll {
}

.about-scroll {
}

.projects-scroll {
}

.contact-scroll {
}

.base-item {
}

.visible-item {
  animation: fadeInUp 1s ease forwards;
  -moz-animation: fadeInUp 1s ease forwards;
  -webkit-animation: fadeInUp 1s ease forwards;
  -o-animation: fadeInUp 1s ease forwards;
  -ms-animation: fadeInUp 1s ease forwards;
}

.hidden-item {
  opacity: 0;
}

@keyframes fadeInUp {
  0% {
    transform: translate3d(0, 40px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-moz-keyframes fadeInUp {
  0% {
    -moz-transform: translate3d(0, 40px, 0);
    opacity: 0;
  }
  100% {
    -moz-transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  0% {
    -webkit-transform: translate3d(0, 40px, 0);
    opacity: 0;
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-o-keyframes fadeInUp {
  0% {
    -o-transform: translate3d(0, 40px, 0);
    opacity: 0;
  }
  100% {
    -o-transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-ms-keyframes fadeInUp {
  0% {
    -ms-transform: translate3d(0, 40px, 0);
    opacity: 0;
  }
  100% {
    -ms-transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>
