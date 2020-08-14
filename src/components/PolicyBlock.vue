<template>
  <div class="policy-block">
    <div class="Cookie__wrapper">
      <cookie-law position="top" transitionName="fade" v-on:accept="acceptPolicy">
        <div slot="message">
          <p>{{ policyText }}</p>
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
$backgroundColor: $whiteColor;

.policy-block {
  .Cookie__wrapper {
    width: 100%;
    background: $backgroundColor;

    p {
      margin: 0;
    }

    a {
      color: $textColor;
      text-decoration: underline;
    }
  }

  .Cookie {
    position: relative;
    color: $textColor;
    @include font(18px, normal, 160%);
    padding: 40px 30px 40px 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    @include wrapper();
  }

  .Cookie--base .Cookie__button {
    background: url("../assets/img/svg/close.svg") no-repeat center center $backgroundColor;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    text-indent: -9999px;
    padding: 0;

    &:hover {
      background: url("../assets/img/svg/close.svg") no-repeat center center $backgroundColor;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
