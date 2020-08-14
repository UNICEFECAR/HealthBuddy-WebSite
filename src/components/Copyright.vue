<template>
  <div class="copyright">
    <p class="copyright__text">{{copyright}}</p>
    <img class="copyright__image" src="../assets/img/logos/epam.svg"/>
  </div>
</template>

<script>
  export default {
    name: "Copyright",
    props: {
      copyright: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  $textColor: $blueTextColor;
  .copyright {
    display: flex;
    &__text {
      padding-right: 10px;
      color: $textColor;
      margin: 0;
    }

    &__image {
      margin-top: 2px;
    }
  }
</style>
