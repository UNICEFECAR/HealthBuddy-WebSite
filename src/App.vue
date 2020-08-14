<template>
  <div id="app">
    <Chat />
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Chat from '@/components/Chat'

export default {
  name: 'App',
  components: {
    Chat,
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss">
@import "~typeface-open-sans/index.css";

* {
  outline: none;
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}
body {
  @include fontFamily();
  background: $backgroundColor;
  margin: 0;
  color: $textColor;
}
body.opened.mobile {
  #home, #how, #about, #video {
    display: none;
  }
}
button {
  cursor: pointer;
}

a {
  text-decoration: none;
}

#app {
  overflow: hidden;
}

</style>
