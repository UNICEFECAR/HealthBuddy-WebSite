<template>
  <ul class="social">
    <li class="social-item" v-if="twitter">
      <a :href="twitter" class="" target="_blank"><img src="../assets/img/logos/twitter.svg"/></a>
    </li>
    <li class="social-item" v-if="instagram">
      <a :href="instagram" class="" target="_blank"><img src="../assets/img/logos/instagram.svg"/></a>
    </li>
    <li class="social-item" v-if="facebook">
      <a :href="facebook" class="" target="_blank"><img src="../assets/img/logos/facebook.svg"/></a>
    </li>
    <li class="social-item" v-if="youtube">
      <a :href="youtube" class="" target="_blank"><img src="../assets/img/logos/youtube.svg"/></a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Social",
  props: {
    twitter: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.social {
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0 auto;
  padding: 0;

  &-item {
    width: 48px;
    height: 48px;
    background: $lightBlueColor;
    margin: 0 7px;
    border-radius: 50%;
  }
}
</style>
