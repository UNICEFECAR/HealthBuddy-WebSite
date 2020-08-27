<template>
  <div class="policy-block">
    <div class="Cookie__wrapper">
      <cookie-law position="top" transitionName="fade" v-on:accept="acceptPolicy">
        <div slot="message">
          <p v-html="policyText"/>
        </div>
      </cookie-law>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import CookieLaw from 'vue-cookie-law'

export default {
  name: "PolicyBlock",
  components: {CookieLaw},
  props: {
    policyText: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions([
      'agreeWithPolicy',
    ]),
    acceptPolicy() {
      this.agreeWithPolicy(localStorage.getItem('cookie:accepted'));
    }
  }
}
</script>

<style lang="scss">
$blockBackgroundColor: $whiteColor;

.policy-block {
  .Cookie__wrapper {
    width: 100%;
    background: $blockBackgroundColor;

    p {
      margin: 0;
    }

    a {
      color: $textColor;
      font-weight: 600;
      border-bottom: 1px solid $textColor;
    }
  }

  .Cookie {
    position: relative;
    color: $textColor;
    @include font(18px, normal, 160%);
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    margin: 0 auto;
  }

  .Cookie--base .Cookie__button {
    background: url("../assets/img/svg/mark.svg") no-repeat center center $backgroundColor;
    background-size: 15px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    text-indent: -9999px;
    padding: 0;

    &:hover {
      background: url("../assets/img/svg/mark.svg") no-repeat center center $backgroundColor;
    }

    &:last-child {
      margin-right: 0;
    }
  }
  @media (max-width: $mobileResolution) {
    .Cookie {
      padding: 16px;
      flex-direction: row;
    }
    .Cookie__wrapper {

      p {
        @include font(13px, normal, 160%);
      }
    }
    .Cookie--base .Cookie__button {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
