<template>
  <div>
    <h5 class="download__title">{{downloadTitle}}</h5>
    <div class="download__buttons-group">
      <div class="download__button">
        <a :href="android.uri">
          <img src="../assets/img/logos/googleplay.svg"/></a>
      </div>
      <div class="button_download">
        <a :href="ios.uri">
          <img src="../assets/img/logos/appstore.svg"/></a>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "@/util/http";
import {mapGetters} from "vuex";

export default {
  name: 'Footer',
  data() {
    return {
      attrs: [],
      downloadTitle: '',
      android: '',
      ios: ''
    }
  },
  computed: {
    ...mapGetters([
      'getLanguage'
    ]),
    currentLanguage() {
      return this.getLanguage ? this.getLanguage : 'en'
    }
  },
  methods: {
    fetchData() {
      const url = `/jsonapi/node/landing_page?filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`
      const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
      HTTP
        .get(lang + url + this.currentLanguage)
        .then(response => {
          this.attrs = response.data.data[0].attributes;
          this.downloadTitle = this.attrs.field_download_app_text.value;
          this.android = this.attrs.field_download_app_android;
          this.ios = this.attrs.field_download_app_ios;
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    getLanguage() {
      this.fetchData();
    }
  }
}
</script>

<style lang="scss" scoped>

.download {
  &__title {
    @include font(16px, normal, 160%);
    color: $textColor;
    margin-bottom: 20px;
  }
  &__buttons-group {
    display: flex;
  }
  &__button {
    margin-right: 24px;
    img {
      width: 100%;
    }
  }
}

</style>
