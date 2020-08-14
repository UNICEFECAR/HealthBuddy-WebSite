<template>
  <div class="info-video-list">
    <div class="info-video-overlay">
    </div>
    <carousel :items="1"
              :nav="true"
              :mouseDrag="false"
              :touchDrag="false"
              class="carousel">
      <InfoVideoItem v-for="(video, index) in videos"
                     :key="index"
                     :video="video"/>
    </carousel>
    <div class="line-decorator"></div>
  </div>
</template>

<script>
import InfoVideoItem from '@/components/InfoVideoItem.vue';
import carousel from 'vue-owl-carousel';

export default {
  name: 'InfoVideoList',
  components: {
    InfoVideoItem,
    carousel,
  },
  props: {
    videos: {
      type: Array,
    },
  },
};
</script>

<style lang="scss">
$activeColor: $textColor;
$dotColor: #89C5CC;

.info-video-overlay {
  position: absolute;
  max-width: 720px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: $baseZIndex - 1;

  &:before {
    content: "";
    position: absolute;
    background: url("../assets/img/svg/plant_white.svg") no-repeat center center;
    width: 93px;
    height: 108px;
    bottom: -28px;
    left: -35px;
  }

  &:after {
    content: "";
    position: absolute;
    background: url("../assets/img/svg/plant_blue.svg") no-repeat center center;
    width: 115px;
    height: 234px;
    bottom: -43px;
    left: 0;
  }

  .info-video-image_left {
    position: absolute;
    bottom: -106px;
    left: -41%;
    width: 245px;
    height: 468px;
    display: block;
    z-index: $baseZIndex + 2;
  }

  .info-video-image_right {
    position: absolute;
    bottom: -127px;
    right: -41%;
    width: 262px;
    height: 374px;
    display: block;
    z-index: $baseZIndex + 2;
  }
}

.info-video-list {
  position: relative;

  .carousel {
    position: relative;

    .previous-btn, .next-btn {
      position: absolute;
      top: 50%;
    }

    .next-btn {
      right: 0;
    }
  }

  .owl-theme {
    .owl-nav {
      width: 70%;
      margin: -35px auto 0;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      z-index: $baseZIndex + 2;

      [class*='owl-'] {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        background: $activeColor;
        text-indent: -99999px;
        position: absolute;
        padding: 0;

        &:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          margin: -16px auto 0;
          width: 32px;
          height: 32px;
          display: block;
        }
      }

      .owl-prev {
        left: 90px;

        &:before {
          background: url("../assets/img/svg/arrow_left.svg") no-repeat center center;
        }
      }

      .owl-next {
        right: 90px;

        &:before {
          background: url("../assets/img/svg/arrow_right.svg") no-repeat center center;
        }
      }
    }

    .owl-dots {
      margin-top: 25px;

      .owl-dot span {
        background: $dotColor;
        opacity: 0.6;
      }

      .owl-dot.active span,
      .owl-dot:hover span {
        background: $activeColor;
      }
    }

  }
}

@media (max-width: $mobileResolution) {
  .info-video-list {
    .owl-nav {
      display: none;
    }
  }
}

.line-decorator {
  height: 84px;
  width: 100%;
  background: $whiteColor;
  position: absolute;
  bottom: -111px;
  z-index: $baseZIndex - 2;
}
</style>
