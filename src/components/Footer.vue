<template>
  <div class="footer">
    <div class="footer__wrapper">
      <div class="footer__info">
        <Download />
      </div>
      <div class="footer__links">
        <div class="footer__item footer__item_copyright">
          <Copyright :copyright="copyright"/>
        </div>
        <div class="footer__item footer__item_rights">
          {{ attrs.field_footer_copyright }}
        </div>
        <div class="footer__item">
          <router-link :to="'privacy'" :title="attrs.field_footer_policy" class="footer__menu-link">
            {{ attrs.field_footer_policy }}
          </router-link>
          <router-link :to="'about'" :title="attrs.field_footer_about" class="footer__menu-link">
            {{ attrs.field_footer_about }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Copyright from "@/components/Copyright";
import Download from "@/components/Download";
import {HTTP} from "@/util/http";
import {mapGetters} from "vuex";

export default {
  name: 'Footer',
  components: {
    Copyright,
    Download
  },
  data() {
    return {
      attrs: [],
      copyright: ''
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
          this.copyright = this.attrs.field_footer_support;
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
$img-height: 9vh;

.footer {
  width: 100%;
  font-size: 1em;
  background: white;
  padding: 0;
  color: $secondaryColor;
  margin-top: -30px;

  &__wrapper {
    @include wrapper();
    padding: 0 30px 0 88px;
    display: flex;
    flex-direction: column;
  }

  &__info {
    padding: 30px 0 30px;
    display: flex;
  }

  &__links {
    padding: 35px 0 30px;
    display: flex;
    align-items: center;
    border-top: 1px solid $lightBlueColor;
    width: 100%;
  }

  &__item {
    display: flex;
    margin-right: 16px;
    padding-right: 16px;
    border-right: 1px solid $borderColorLighter;
    font-size: 13px;

    &:last-child {
      border: none;
      margin-right: 0;
      padding-right: 0;
    }

    p {
      margin: 0;
      font-size: 16px;
    }

    a {
      color: $blackTextColor;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }

    img {
      margin-top: 4px;
      margin-left: 10px;
    }
  }

  /deep/ &__menu-link {
    margin-right: 16px;
    padding-right: 16px;
    border-right: 1px solid $borderColorLighter;

    &:last-child {
      border-right: none;
      margin-right: 0;
      padding-right: 0;
    }
  }

  @media (max-width: $mobileResolution) {
    &__wrapper {
      padding: 0 25px;
    }
    &__info {
      padding: 25px 0;
    }
    &__links {
      flex-wrap: wrap;
      padding: 20px 0 100px 0;
      line-height: 24px;
    }
    &__item {
      border-right: none;

      &_copyright {
        flex-grow: 1;
      }

      &_rights {
        flex-grow: 1;
        order: 3;
        width: 100%;
      }
    }
  }
}
</style>
