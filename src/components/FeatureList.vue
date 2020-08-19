<template>
  <div>
    <div class="feature-list">
      <FeatureItem
        v-for="(feature, index) in list"
        :key="index"
        :icon-name="feature.iconName"
        :title="feature.title"
        :text="feature.text"
      />
    </div>
    <div class="feature-list feature-list_mobile">
      <carousel :items="1"
                :nav="true"
                :mouseDrag="false"
                :touchDrag="false"
                class="carousel">
        <FeatureItem
          v-for="(feature, index) in list"
          :key="index"
          :icon-name="feature.iconName"
          :title="feature.title"
          :text="feature.text"
        />
      </carousel>
    </div>
  </div>
</template>

<script>
  import FeatureItem from "@/components/FeatureItem"
  import carousel from 'vue-owl-carousel';

  export default {
    name: 'FeatureList',
    components: {
      FeatureItem,
      carousel
    },
    props: {
      list: {
        type: Array,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .feature-list {
    display: flex;
    justify-content: space-around;
    max-width: 1120px;
    margin: 97px auto 0;

    &_mobile {
      display: none;
    }
  }

  @media (max-width: $mobileResolution) {
    .feature-list {
      display: none;

      &_mobile {
        display: block;
        .feature-item {
          width: 100%;
          margin: 0 auto;
        }
      }
      /deep/ .owl-carousel .owl-stage-outer {
        overflow: visible;
      }
      /deep/ .owl-theme .owl-nav {
        display: none;
      }
    }
  }
</style>
