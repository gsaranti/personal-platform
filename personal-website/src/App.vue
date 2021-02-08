<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "Archivo";
  src: local("Archivo"),
  url(./fonts/Archivo-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Archivo-Medium";
  src: local("Archivo-Medium"),
  url(./fonts/Archivo-Medium.ttf) format("truetype");
}

@font-face {
  font-family: "Archivo-Semibold";
  src: local("Archivo-Semibold"),
  url(./fonts/Archivo-SemiBold.ttf) format("truetype");
}

@font-face {
  font-family: "Archivo-Bold";
  src: local("Archivo-Bold"),
  url(./fonts/Archivo-Bold.ttf) format("truetype");
}

@font-face {
  font-family: "Archivo-Italic";
  src: local("Archivo-Italic"),
  url(./fonts/Archivo-Italic.ttf) format("truetype");
}

@font-face {
  font-family: "Archivo-Semibold-Italic";
  src: local("Archivo-Semibold-Italic"),
  url(./fonts/Archivo-SemiBoldItalic.ttf) format("truetype");
}

@font-face {
  font-family: "Baloo2-Bold";
  src: local("Baloo2-Bold"),
  url(./fonts/Baloo2-Bold.ttf) format("truetype");
}

@font-face {
  font-family: "Baloo2-Medium";
  src: local("Baloo2-Medium"),
  url(./fonts/Baloo2-Medium.ttf) format("truetype");
}

@font-face {
  font-family: "Baloo2-SemiBold";
  src: local("Baloo2-SemiBold"),
  url(./fonts/Baloo2-SemiBold.ttf) format("truetype");
}

@font-face {
  font-family: "Sacramento";
  src: local("Sacramento"),
  url(./fonts/Sacramento-Regular.ttf) format("truetype");
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  overflow-y: hidden;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
