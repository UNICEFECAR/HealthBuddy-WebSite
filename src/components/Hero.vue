<template>
  <div class="banner">
    <div class="banner__wrapper animated animatedFadeInUp fadeInUp">
      <div class="banner__content">
        <h1 class="banner__title">
          {{ title }}
        </h1>
        <p class="banner__subtitle">
          {{ subtitle }}
        </p>
      </div>
      <div class="banner__image">
        <img class="banner__image-img" src="../assets/img/svg/hero2.svg"/>
        <div class="banner__image-bubble">
          {{ bubble }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Hero',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    bubble: {
      type: String,
      default: ''
    }
  }

}
</script>

<style lang="scss" scoped>
$bubbleColor: $grayDarkColor;
$squareColor: $whiteColor;

.banner {
  position: relative;
  overflow: hidden;
  @include font(1rem, 400, 1.5);
  min-height: 600px;
  margin-top: 120px;
  display: flex;

  &::before {
    @include square(800px, $squareColor, -1);
    right: 45px;
    bottom: -53%;
  }

  &__wrapper {
    height: inherit;
    display: flex;
    padding: 0 30px 0 88px;
    @include wrapper();
  }

  &__content {
    width: 40%;
    padding-top: 70px;
    z-index: $baseZIndex + 3;
  }

  &__title {
    margin-bottom: 25px;
    margin-top: 0;
    @include font(51px, 300, 130%);
  }

  &__subtitle {
    @include font(18px, 300, 160%);
    width: 89%;
  }

  &__image {
    position: absolute;
    bottom: 0;
    right: 0;

    &-bubble {
      @include font(18px, bold, 160%);
      background: $bubbleColor;
      border-radius: 70px;
      padding: 40px;
      position: absolute;
      bottom: 83%;
      right: 18%;
      width: 49%;
      z-index: $baseZIndex + 1;

      &:before {
        content: "";
        background: url("../assets/img/svg/corner_gray.svg") no-repeat;
        width: 40px;
        height: 22px;
        display: block;
        position: absolute;
        bottom: -22px;
        left: 35%;
      }
    }

    &-img {
      position: relative;
      z-index: $baseZIndex + 2;
      display: block;
      width: 100%;
    }
  }

}

.navbar__wrapper_full + .home {
  .banner {
    margin-top: 280px;
  }
}

@media (max-width: $mobileResolution) {
  .banner {
    margin-top: 120px;
    height: calc(100vh - 120px);
    min-height: initial;

    &::before {
      width: 524px;
      height: 524px;
      right: -65%;
      bottom: -17%;
    }

    &__wrapper {
      padding: 0;
    }

    &__content {
      width: 100%;
      text-align: left;
      margin: 0 25px;
      padding-top: 0;
    }

    &__title {
      font-size: 28px;
    }

    &__subtitle {
      font-size: 16px;
    }

    &__image {
      width: 100%;
      display: flex;
      justify-content: center;

      &-bubble {
        font-size: 12px;
        padding: 27px;
        border-radius: 44px;
        top: -66px;
      }
    }
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0)
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0)
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1
  }
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: both
}

.animatedFadeInUp {
  opacity: 0
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

</style>
