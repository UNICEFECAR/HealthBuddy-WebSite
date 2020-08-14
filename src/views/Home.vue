<template>
  <div class="home">
    <Hero id="home"
          :title="heroAttrs.title"
          :subtitle="heroAttrs.subtitle"
          :bubble="heroAttrs.bubble"
    />

    <section class="home__block home__block_about">
      <text-section id="about"
                    class="home__section home__section_about">
        <h2 slot="title" class="section__title_home">
          {{commonAttrs.aboutTitle}}
        </h2>
        <div slot="text" class="section__text_home">
          <p>
            {{commonAttrs.aboutText}}
          </p>
          <div class="button_primary">
            <router-link :to="'about'" :title="commonAttrs.aboutButton">
              {{commonAttrs.aboutButton}}
            </router-link>
          </div>
        </div>
        <FeatureList v-if="isOpenCarousel" :list="features"
                     slot="content"
        />
      </text-section>
    </section>

    <div v-if="isOpenCarousel"
         id="video"
         class="home__block home__block_video"
         aria-labelledby="carouselheading">
      <text-section class="home__section_video">
        <h2 id="carouselheading" slot="title" class="section__title_home">
          {{commonAttrs.videosTitle}}
        </h2>
        <InfoVideoList
          slot="content"
          :videos="videos"
        />
      </text-section>
    </div>
  </div>
</template>

<script>
  import Hero from '@/components/Hero';
  import TextSection from '@/components/TextSection';
  import FeatureList from '@/components/FeatureList';
  import InfoVideoList from '@/components/InfoVideoList';
  import {HTTP} from '@/util/http'
  import {mapGetters} from "vuex";

  const url = `/jsonapi/node/landing_page?filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`;
  export default {
    name: 'Home',
    components: {
      Hero,
      TextSection,
      FeatureList,
      InfoVideoList,
    },
    data() {
      return {
        isOpenCarousel: true,
        //isOpen: false,
        heroAttrs: {},
        commonAttrs: {},
        videos: [],
        videosAttrs: [],
        featuresAttrs: []
      };
    },
    computed: {
      ...mapGetters([
        'getLanguage'
      ]),
      currentLanguage() {
        return this.getLanguage ? this.getLanguage : 'en'
      },
      multiplatformLogo() {
        return require("@/assets/img/svg/multiplatform.svg");
      },
      multilanguageLogo() {
        return require("@/assets/img/svg/multilanguage.svg");
      },
      covidInfoLogo() {
        return require("@/assets/img/svg/covid_info.svg");
      },
      newsLogo() {
        return require("@/assets/img/svg/news.svg");
      },
      features() {
        return this.featuresAttrs
      },
    },
    methods: {
      fetchData() {
        const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
        HTTP
          .get(lang + url + this.currentLanguage)
          .then(response => {
            this.videosAttrs = response.data.data[0].attributes;
            this.videos = [
              {
                url: this.videosAttrs.field_videos_video[0].uri,
                title: this.videosAttrs.field_videos_video[0].title,
              },
              {
                url: this.videosAttrs.field_videos_video[1].uri,
                title: this.videosAttrs.field_videos_video[1].title,
              },
              {
                url: this.videosAttrs.field_videos_video[2].uri,
                title: this.videosAttrs.field_videos_video[2].title,
              },
              {
                url: this.videosAttrs.field_videos_video[3].uri,
                title: this.videosAttrs.field_videos_video[3].title,
              },
            ];

            const attrs = response.data.data[0].attributes;
            this.heroAttrs = {
              title: attrs.field_hero_title.value,
              subtitle: attrs.field_hero_subtitle.value,
              bubble: attrs.field_hero_bubble.value,
            };
            this.commonAttrs = {
              aboutTitle: attrs.field_features_title,
              aboutText: attrs.field_features_text.value,
              aboutButton: attrs.field_features_button,
              videosTitle: attrs.field_videos_title
            }
            this.featuresAttrs = [
              {
                iconName: this.multiplatformLogo,
                title: attrs.field_features_feature_1_title,
                text: attrs.field_features_feature_1_text.value,
              },
              {
                iconName: this.multilanguageLogo,
                title:attrs.field_features_feature_2_title,
                text: attrs.field_features_feature_2_text.value,
              },
              {
                iconName: this.covidInfoLogo,
                title: attrs.field_features_feature_3_title,
                text: attrs.field_features_feature_3_text.value,
              },
              {
                iconName: this.newsLogo,
                title: attrs.field_features_feature_4_title,
                text: attrs.field_features_feature_4_text.value,
              },
            ];
          })
          //.then(() => this.initVideos())
          //.then(() => this.resetCarousel())
          .catch(error => {
            console.log(error)
          })
      },
      initVideos() {
        this.fetchData();
      },
      resetCarousel() {
        this.isOpenCarousel = false;
        setTimeout(() => this.isOpenCarousel = true, 1500);
      }
    },
    mounted() {
      this.fetchData();
      //this.resetCarousel();
      //this.initVideos();
    },
    watch: {
      getLanguage() {
        this.fetchData();
        this.resetCarousel();
        this.initVideos();
      }
      /*      '$i18n.locale'() {
              this.resetCarousel();
              this.initVideos();
            },*/
      /*      isOpen() {
              this.resetCarousel();
            },*/
    }
  }
</script>

<style lang="scss" scoped>
  $backgroundColor: $grayLightColor;
  $backgroundSecondaryColor: #EEF9F6;
  $squareColor: $whiteColor;

  .home {
    width: 100%;
    overflow: hidden;

    &__block {
      position: relative;
      &_about {
        background-color: $backgroundColor;

        &:before {
          @include square(580px, $squareColor, 1);
          left: 60px;
          top: 236px;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: 6%;
          background: url("../assets/img/svg/lamps.svg") no-repeat center center;
          width: 159px;
          height: 204px;
          display: block;
        }
      }

      &_video {
        background: $backgroundSecondaryColor;
        z-index: $baseZIndex + 2;
        margin-top: -100px;

        &:before {
          @include square(800px, $squareColor, 1);
          right: -114px;
          bottom: -300px;
          opacity: 0.6;
        }
      }

    }

    &__section {
      @include wrapper();
      padding: 60px 30px 60px 88px;
      min-height: 670px;
      position: relative;
      overflow: visible;
      z-index: $baseZIndex + 3;

      &_about {
        padding-bottom: 17px;

        &:before {
          content: "";
          position: absolute;
          bottom: -3px;
          left: -87px;
          background: url("../assets/img/svg/plant.svg") no-repeat center center;
          width: 245px;
          height: 468px;
          display: block;
          z-index: $baseZIndex + 2;
        }
      }

      &_video {
        padding-top: 130px;
        clear: both;
      }
    }
  }

  .section {
    &__title_home {
      text-align: center;
    }

    &__text_home {
      width: 45%;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: $baseZIndex + 2;
    }
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

  @media (max-width: $mobileResolution) {
    .section__text_home {
      width: 80%;
    }
    .button_primary a {
      padding: 18px 25px;
    }
    .home {
      &__section {
        padding: 30px 25px 17px 25px;

        &_video {
          padding: 30px 25px 44px;
        }
      }

      &__block {
        &_video {
          margin-top: 0;
        }
      }
    }
  }

</style>
