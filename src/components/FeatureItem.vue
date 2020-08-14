<template>
  <div class="feature-item">
    <div class="feature-item__icon">
      <img :src='iconName' />
    </div>
    <h4 class="feature-item__title">
      {{ title }}
    </h4>
    <p class="feature-item__text">
      {{ text }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'FeatureItem',
    props: {
      iconName: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      text: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="scss" scoped>
  $iconBackground: $backgroundColor;
  $secondaryBackgroundColor: $whiteColor;

  .feature-item {
    background-color: $secondaryBackgroundColor;
    margin: 0 10px;
    border-radius: 20px;
    padding: 73px 23px 36px 36px;
    width: 25%;
    max-width: 260px;
    position: relative;
    &:before {
      content: "";
      background: #255C3B;
      opacity: 0.12;
      filter: blur(64px); // TODO make crossbrowser
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      z-index: $baseZIndex - 1;
    }

    &__icon {
      width: 105px;
      height: 105px;
      margin: -120px auto 0;
      text-align: center;
      background: $iconBackground;
      border-radius: 100%;
      border: 10px solid $secondaryBackgroundColor;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__title {
      @include font(18px, bold, 160%);
      margin-bottom: 10px;
      margin-top: 10px;
    }

    &__text {
      @include font(16px, normal, 22px);
    }
  }
</style>
