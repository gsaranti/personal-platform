<template>
  <div class="experience">
    <h2>My Experience</h2>
  </div>
</template>

<script>
  export default {
    name: 'about',
    components: {
    }
  }
</script>

<style>
  .experience {
    margin-top: 105vh;
    background: white;
  }

  h2 {
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    margin-right: 30%;
    margin-left: 30%;
  }

  @media (max-width: 500px) {
    h2 {
      border-bottom: 1px solid black;
    }
  }

  h2:before,
  h2:after {
    background-color: #000;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
  }

  h2:before {
    right: 0.5em;
    margin-left: -50%;
  }

  h2:after {
    left: 0.5em;
    margin-right: -50%;
  }
</style>
