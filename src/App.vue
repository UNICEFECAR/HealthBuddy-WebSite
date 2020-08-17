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
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

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

.button_primary {
  @include font(16px, 600, 140%);
  @include fontFamily();
  background: $textColor;
  border-radius: 70px;
  color: $whiteColor;
  border: none;
  margin-top: 30px;
  display: inline-block;

  a {
    color: $whiteColor;
    display: block;
    padding: 18px 40px;
  }
}

</style>
