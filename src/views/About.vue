<template>
  <section class="content">
    <div class="about">
      <div class="section_about">
        <div class="section__text-block">
          <text-section>
            <h2 slot="title">
              {{pageAttrs.title}}
            </h2>
            <div slot="text">
              <div class="section__text-block" v-html=pageAttrs.content></div>
            </div>
          </text-section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import TextSection from '@/components/TextSection';
  import {HTTP} from '@/util/http';
  import {mapGetters} from "vuex";

  export default {
    name: 'About',
    components: {
      TextSection,
    },
    computed: {
      ...mapGetters([
        'getLanguage'
      ]),
      currentLanguage() {
        return this.getLanguage ? this.getLanguage : 'en'
      }
    },
    data() {
      return {
        pageAttrs: {}
      }
    },
    methods: {
      fetchData() {
        const url = `/jsonapi/node/about_us_screen?fields[node--about_us_screen]=langcode,title,body&filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`
        const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
        HTTP
          .get(lang + url + this.currentLanguage)
          .then(response => {
            const attrs = response.data.data[0].attributes;
            this.pageAttrs = {
              title: attrs.title,
              content: attrs.body.value
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted() {
      this.fetchData();
    },
    watch: {
      getLanguage() {
        this.fetchData();
      }
    }
  }
</script>

<style lang="scss" scoped>
  $squareColor: $whiteColor;
  .about {
    padding: 160px 30px 50px;
    position: relative;
    min-height: 90vh;
    @include wrapper();

    &:before {
      content: "";
      position: absolute;
      display: block;
      bottom: 22%;
      left: -15%;
      background: url("../assets/img/svg/clock.svg") no-repeat;
      width: 108px;
      height: 108px;
    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      bottom: -10px;
      right: 6%;
      background: url("../assets/img/svg/plants_light.svg") no-repeat;
      width: 149px;
      height: 240px;
    }

    @media (max-width: $mobileResolution) {
      padding: 24px;
      .section_about {
        .section {
          width: 100%;
        }
      }
    }
  }

  .section__text-block {
    padding-bottom: 10px;
  }

  .section_about {
    position: relative;
    padding-bottom: 140px;

    .section {
      margin: 0 auto;
      max-width: 720px;
      padding: 0;
    }
  }

  .content {
    position: relative;

    &:before {
      @include square(800px, $squareColor, -1);
      right: 45px;
      top: 250px;
    }

    &:after {
      @include square(968px, $squareColor, -1);
      left: -30%;
      top: 57%;
      opacity: 0.5;
    }
  }
  /deep/ strong {
    font-weight: 600;
  }
  .navbar__wrapper_full + .content {
    .about {
      margin-top: 130px;
    }
  }
  @media (max-width: $mobileResolution) {
    .about {
      padding: 160px 25px 50px;
    }
  }

</style>
