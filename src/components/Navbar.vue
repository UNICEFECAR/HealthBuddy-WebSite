<template>
  <div class="navbar__wrapper" :class="{ 'navbar__wrapper_full': (getAgreeWithPolicy !== 'true')}">
    <PolicyBlock :policyText="policyText"/>
    <div>
      <nav class="navbar"
           role="navigation"
           aria-label="dropdown navigation">
        <div class="navbar__brand">
          <router-link :to="'/'" class="footer__menu-link">
            <img
              src="@/assets/img/svg/logo.svg"
              alt="HealthBuddy logo">
          </router-link>
        </div>
        <div class="navbar__nav">
          <div class="navbar-menu">
            <router-link v-for="item in items"
                         :key="item.id"
                         :to="`index#${item.id}`"
                         :title="item.title"
                         class="navbar-item">
              {{ item.title }}
            </router-link>
          </div>
          <LanguageDropdown
            :title="attrs.field_dropdown_title"
            :searchPlaceholder="attrs.field_dropdown_search"
          />
        </div>

        <div class="navbar__nav navbar__nav_mobile">
          <LanguageDropdown
            :title="attrs.field_dropdown_title"
            :searchPlaceholder="attrs.field_dropdown_search"/>
          <a :class="{ 'is-active': menuActive }"
             class="navbar-menu__opener"
             @click="menuActive = !menuActive">
            <div @click="menuActive = false"
                 class="navbar-menu navbar-menu_mobile">
              <router-link v-for="item in items"
                           :key="item.id"
                           :to="`index#${item.id}`"
                           :title="item.title"
                           class="navbar-modal-item">
                {{ item.title }}
              </router-link>
            </div>
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from '@/components/LanguageDropdown';
import PolicyBlock from "@/components/PolicyBlock";
import {mapGetters} from "vuex";
import {HTTP} from "@/util/http";

export default {
  name: 'Navbar',
  components: {
    PolicyBlock,
    LanguageDropdown,
  },
  data() {
    return {
      menuActive: false,
      attrs: [],
      items: null,
      policyText: ''
    }
  },
  computed: {
    ...mapGetters([
      'getAgreeWithPolicy',
      'getLanguage'
    ]),
    currentLanguage() {
      return this.getLanguage ? this.getLanguage : 'en'
    }
  },
  created() {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropdown-trigger')) {
        this.menuActive = false;
      }
    });
  },
  methods: {
    fetchData() {
      const url = `/jsonapi/node/landing_page?filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`
      const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
      const fetchedData = (response) => {
        this.attrs = response.data.data[0].attributes;
        this.policyText = this.attrs.field_policyblock_text.value;
        this.items = [
          {
            id: "about",
            title: this.attrs.field_navbar_about,
          },
          {
            id: "video",
            title: this.attrs.field_navbar_videos,
          },
        ];
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
  }
}
</script>

<style lang="scss" scoped>
.modal-item {
  display: block;
  margin: 0.75rem;
}

.animatable {
  transition: all .1s;
}

.animatable:hover {
  font-weight: bold;
  transform: scale(1.1);
}

.navbar {
  @include wrapper();
  padding: 40px 30px 0 30px;
  display: flex;
  justify-content: space-between;

  &__wrapper {
    background-color: $backgroundColor;
    left: 0;
    position: fixed;
    right: 0;
    z-index: $baseZIndex + 6;
    top: 0;
  }

  &__brand {
    display: flex;
    padding-bottom: 20px;
  }

  &__logo {
    margin-left: 18px;
    margin-top: 7px;
  }

  &__logo, /deep/ {
    img {
      width: 100%;
    }
  }

  &__nav {
    display: flex;

    &_mobile {
      display: none;
    }
  }

  &-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-item {
    margin: 0 30px;
    @include font(1em, 600, 1.9);
    text-align: left;
    display: flex;
    align-content: center;
    color: $textColor;
    padding: 20px 6px;

    &:focus {
      background-color: inherit;
    }

    &:hover {
      color: $hoverLinkColor;
    }

    &.router-link-active {
      border-bottom: 2px solid $textColor;
    }

    &.dropdown {
      @include font(13px, 600, 140%);
      cursor: pointer;
      padding: 6px;
      align-self: center;
      margin-right: 0;

      &.is-active {
        /deep/ .dropdown-navbar-item__opener {
          &:before {
            content: "";
            background: url("../assets/img/corner.png") no-repeat;
            width: 36px;
            height: 18px;
            display: block;
            position: absolute;
            bottom: -31px;
            right: 50%;
            margin-right: -10px;
          }
        }
      }
    }
  }

  &__title {
    text-decoration: none;
    @include font(30px, 400, 1.5);
    letter-spacing: 2px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
    @media (max-width: 350px) {
      font-size: 15px;
    }
    @media (max-width: 310px) {
      font-size: 12px;
    }
  }
}

@media (max-width: $mobileResolution) {
  .navbar {
    margin: 7px 16px 0;
    padding: 20px 0;

    &__nav {
      display: none;

      &_mobile {
        display: flex;
        align-items: center;
      }
    }

    &-menu {
      display: none;

      &_mobile {
        display: none;
        align-items: center;
        position: relative;
        background-color: $whiteColor;
        border-radius: 26px;
      }

      &__opener {
        background: url("../assets/img/svg/menu.svg") no-repeat center center;
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 50%;

        &.is-active {
          background: url("../assets/img/svg/close_small.svg") no-repeat center center $navbarButtonsColor;

          .navbar-menu_mobile {
            display: flex;
            flex-direction: column;
            background-color: $whiteColor;
            border-radius: 20px;
            position: absolute;
            right: 17px;
            left: 17px;
            top: 100%;
            width: calc(100% - 34px);
            padding: 20px;
            box-sizing: border-box;
            height: 87vh;
            justify-content: center;

            &:before {
              content: "";
              background: $backgroundColor;
              width: 100vw;
              height: 100vh;
              z-index: $baseZIndex - 1;
              position: absolute;
              top: 0;
            }
          }
        }
      }
    }

    &__brand {
      width: 60%;
      margin-left: 0;
      padding-bottom: 0;
    }

    &-item {
      margin-right: 16px;
    }

    &-modal-item {
      @include fontFamily();
      @include font(28px, 300, 130%);
      border-bottom: 1px solid $backgroundColor;
      color: $textColor;
      padding: 20px 40px;
      text-align: center;
    }

    .navbar-item.dropdown {
      position: static;
    }

  }

}
</style>
