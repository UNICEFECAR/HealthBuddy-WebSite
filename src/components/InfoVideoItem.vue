<template>
  <div class="info-video-item">
    <div class="info-video-item__wrapper">
      <div class="info-video-item__content">
        <iframe
          class="info-video-item__item"
          :title="video.title"
          :src="video.url"
          allowfullscreen
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'InfoVideoItem',
    props: {
        video: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style lang="scss" scoped>
  .info-video-item {
    margin: auto;
    max-width: 45%;

    &__wrapper {
      display: flex;
      align-items: center;
      box-sizing: content-box;
      min-height: 200px;
      position: relative;
    }

    &__content {
      position: relative;
      display: block;
      width: 100%;
      padding: 0;
      overflow: hidden;
    }

    &__content::before {
      padding-top: 56.25%;
      display: block;
      content: "";
      box-sizing: border-box;
    }

    &__item {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    @media (max-width: $mobileResolution) {
      max-width: 100%;
    }
    @media (max-width: 500px) {
      &__wrapper {
        padding: 10px;
      }
    }
  }

</style>
