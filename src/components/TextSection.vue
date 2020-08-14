<template>
  <div class="section">
    <div class="section__title">
      <slot name="title" />
    </div>

    <div class="section__text">
      <slot name="text" />
    </div>

    <div class="section__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
    name: 'TextSection'
}
</script>

<style lang="scss" scoped>

.section {
    padding: 60px 0;
    overflow: hidden;
    font-size: 1em;
    font-weight: 400;

    strong {
        color: inherit;
    }

    &__title h2 {
      @include font(54px, 300, 130%);
      z-index: $baseZIndex + 2;
      position: relative;
      margin: 20px 0 25px 0;
    }

    &__text {
      @include font(18px, 300, 160%);
    }

    &__content {
      position: relative;
      z-index: $baseZIndex + 2;
    }

    @media only screen and (max-width: $mobileResolution) {
      &__title h2 {
        font-size: 28px;
        margin-bottom: 20px;
      }
      &__text {
        font-size: 16px;
      }
    }
}
</style>
