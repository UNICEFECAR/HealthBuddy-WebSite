<template>
  <a :class="{ 'is-active': dropdownActive }"
     class="dropdown navbar-item dropdown-trigger"
     @click="dropdownActive = !dropdownActive"
     :title="title">

    <span class="dropdown-navbar-item__opener">{{ this.getLanguage }}</span>

    <div class="dropdown__menu">
      <span class="dropdown__close" @click="dropdownActive = true"></span>
      <div @click="dropdownActive = false">
        <h3 class="dropdown__title">{{title}}</h3>
        <label class="dropdown__search">
          <input class="dropdown__search-input" type="text" v-model="search" :placeholder="searchPlaceholder"/>
        </label>
        <a v-for="(language, index) in filteredList"
           :key="index"
           :class="{ selected: getLanguage === language.languageBrowserCode }"
           :title="language.languageNameOriginal ? language.languageNameOriginal : language.languageNameLocalized"
           @click="setLanguage(language.languageBrowserCode)"
           class="dropdown__item">
          <span class="dropdown__language">
            {{ language.languageNameOriginal ? language.languageNameOriginal : language.languageNameLocalized }}
          </span>
        </a>
      </div>
    </div>
  </a>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {HTTP} from "@/util/http";

  const url = `/healthbuddy/languageslist`;
  export default {
    name: 'DropdownLanguage',
    props: {
      title: {
        type: String,
        default: ''
      },
      searchPlaceholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        languages: [],
        dropdownActive: false,
        search: '',
      }
    },
    computed: {
      ...mapGetters([
        'getLanguage',
      ]),
      currentLanguage() {
        return this.getLanguage ? this.getLanguage : 'en'
      },
      filteredList() {
        return this.languages.filter(language => {
          const languageName = language.languageNameOriginal ? language.languageNameOriginal : language.languageNameLocalized;
          return languageName.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    created() {
      window.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) {
          this.dropdownActive = false;
        }
      });
    },
    methods: {
      ...mapActions([
        'setLanguage',
      ]),
      fetchData() {
        const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
        HTTP
          .get(lang + url)
          .then(response => {
            this.languages = response.data;
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
  $borderColor: $backgroundColor;
  $dropdownBackgroundColor: $whiteColor;

  .dropdown {
    display: flex;
    align-items: center;
    background-color: $dropdownBackgroundColor;
    border-radius: 26px;

    &:before {
      content: "";
      background: url("../assets/img/svg/globe.svg") no-repeat center center;
      width: 24px;
      height: 24px;
      display: block;
    }

    &-navbar-item {
      display: flex;
      justify-content: space-between;

      &__country {
        margin-left: 8px;
      }

      &__opener {
        text-transform: uppercase;
        @include font(11px, normal, 140%);
        margin-left: 12px;
        margin-right: 15px;
        position: relative;
        padding-right: 15px;
        display: inline-block;

        &:after {
          content: "";
          background: url("../assets/img/svg/arrow_down.svg") center center no-repeat;
          width: 8px;
          height: 8px;
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -4px;
        }
      }
    }

    &__title {
      @include font(24px, 300, 160%);
      margin: 0 0 10px 0;
    }

    &__close {
      background: url("../assets/img/svg/close_xsmall.svg") no-repeat center center;
      width: 18px;
      height: 18px;
      display: block;
      position: absolute;
      right: 12px;
      top: 12px;
    }

    &__search {
      position: relative;
      border-bottom: 1px solid $textColor;
      display: block;

      &:before {
        content: "";
        background: url("../assets/img/svg/search.svg") no-repeat center center;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -12px;
      }

      ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: $textColor;
        @include fontFamily();
        font-size: 13px;
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: $textColor;
        @include fontFamily();
        font-size: 13px;
      }

      ::-ms-input-placeholder { /* Microsoft Edge */
        color: $textColor;
        @include fontFamily();
        font-size: 13px;
      }
    }

    &__search-input {
      border: none;
      padding: 11px 0 11px 30px;
      @include font(13px, 300, 180%);
      color: $textColor;
      width: 100%;
      @include fontFamily();
    }

    &__menu {
      display: none;
      background-color: $dropdownBackgroundColor;
      border-radius: 20px;
      position: absolute;
      right: 1%;
      left: inherit;
      top: 102%;
      width: 375px;
      padding: 20px;
      flex-direction: column;
      box-sizing: border-box;
    }

    &__item {
      font-size: 13px;
      padding: 20px 40px 20px 0;
      border-bottom: 1px solid $borderColor;
      display: flex;
      justify-content: space-between;
      position: relative;

      &:after {
        content: "";
        background: $grayDarkColor;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -16px;
        text-align: center;
        line-height: 33px;
      }

      &.selected {
        &:after {
          content: url("../assets/img/svg/mark.svg");
          background: $backgroundColor;
        }
      }
    }

    &__country {
      font-weight: 600;
    }

    &__language {
      font-weight: 600;
    }
  }

  .navbar-item.is-active {
    .dropdown__menu {
      display: flex;
    }
  }

  @media (max-width: $mobileResolution) {
    .dropdown {
      background: none;

      &.is-active {
        background: $navbarButtonsColor;
      }

      &__menu {
        position: absolute;
        right: 17px;
        left: 17px;
        top: 100%;
        width: calc(100% - 34px);
        padding: 20px;

        &:before {
          display: none;
        }

        &:after {
          content: "";
          background: $backgroundColor;
          width: 100vw;
          height: 100vh;
          z-index: $baseZIndex - 1;
          position: absolute;
          top: 0;
          left: -17px;
        }
      }
    }
    .dropdown-navbar-item__country,
    .dropdown-navbar-item__opener {
      display: none;
    }
  }
</style>
