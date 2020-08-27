<template>
  <section class="content">
    <div class="privacy">
      <div class="section_privacy">
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
  </section>
</template>

<script>
  import TextSection from '@/components/TextSection';
  import {HTTP} from '@/util/http'
  import {mapGetters} from "vuex";

  export default {
    name: 'Privacy',
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
        const url = `/jsonapi/node/privacy_policy_screen?fields[node--privacy_policy_screen]=langcode,title,body&filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`
        const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
        const fetchedData = (response) => {
          const attrs = response.data.data[0].attributes;
          this.pageAttrs = {
            title: attrs.title,
            content: attrs.body.value
          }
        }
        HTTP
          .get(lang + url + this.currentLanguage)
          .then(response => {
            if (!response.data.data[0]) {
              HTTP
                .get(url + 'en')
                .then(response => {
                  fetchedData(response);
                })
                .catch(error => {
                  console.log(error)
                })
            } else {
              fetchedData(response);
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
    },
  }
</script>

<style lang="scss" scoped>
  $squareColor: $whiteColor;
  .privacy {
    padding: 160px 30px;
    position: relative;
    min-height: 90vh;
    @include wrapper();

    &:before {
      content: "";
      position: absolute;
      display: block;
      bottom: 16px;
      left: 0;
      background: url("../assets/img/svg/plants_group.svg") no-repeat;
      width: 279px;
      height: 242px;
    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      bottom: 30px;
      right: 0;
      background: url("../assets/img/svg/table.svg") no-repeat;
      width: 277px;
      height: 257px;
    }

    /deep/ p strong {
      display: block;
      margin-top: 40px;
      padding-top: 80px;
      border-top: 1px solid $borderColorDarker;
    }
    /deep/ p:first-child strong {
      border-top: 0;
      padding-top: 40px;
    }

  }

  .section__text-block {
    border-bottom: 1px solid $borderColorDarker;

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  .section_privacy {
    position: relative;
    .section {
      margin: 0 auto;
      width: 720px;
      padding-top: 0;
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
      @include square(800px, $squareColor, -1);
      left: -17%;
      top: 41%;
      opacity: 0.5;
    }
  }
  .navbar__wrapper_full + .content {
    .privacy {
      margin-top: 130px;
    }
  }

  @media (max-width: $mobileResolution) {
    .privacy {
      padding: 160px 25px;
    }
    .section_privacy {
      .section {
        width: 100%;
      }
    }
  }
</style>
