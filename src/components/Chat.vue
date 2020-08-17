<template>
  <div class="webchat-container">
    <div
      id="webchat"
      @click="updateOpenStatus()"
    />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {isMobile} from '@/util/browser';
  import {HTTP} from "@/util/http";

  const WebChat = require('@/assets/js/bot.js');

  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      ...mapGetters([
        'getLanguage',
      ]),
      initialPayload() {
        return `chat ${this.getLanguage || 'en'}`;
      },
      currentLanguage() {
        return this.getLanguage ? this.getLanguage : 'en'
      }
    },
    data() {
      return {
        initalized: false,
        buttonText: '',
        inputPlaceholder: ''
      };
    },
    watch: {
      getLanguage() {
        this.fetchData();
        if (!this.initalized) {
          this.initalized = true;
          this.setupChat();
          this.updateOpenStatus();
        } else {
          this.sendInitial()
        }
      },
    },
    methods: {
      sendInitial() {
        WebChat.send(this.initialPayload);
      },
      openChat() {
        if (!isMobile() || this.$router.currentRoute.hash.indexOf('webchat') !== -1) {
          setTimeout(() => WebChat.open(), 150);
        }

      },
      updateOpenStatus() {
        if (!WebChat.isOpen() && isMobile()) {
          setTimeout(() => {
            document.querySelectorAll('.push-sender .push-new-message')[0].blur();
          }, 0);
        }

        setTimeout(() => {
          if (WebChat.isOpen() === this.isOpen) return;
          this.$emit('update:isOpen', WebChat.isOpen());
          this.$el.getElementsByClassName("push-new-message")[0].setAttribute("placeholder", this.inputPlaceholder);
        }, 100);
      },
      setupChat() {
        WebChat.default.init({
          selector: '#webchat',
          initPayload: this.initialPayload,
          channelUuid: process.env.VUE_APP_CHANNEL_UUID,
          host: process.env.VUE_APP_HOST,
          title: 'HealthBuddy',
          inputTextFieldHint: this.inputPlaceholder,
          profileAvatar: require('@/assets/img/svg/chat-avatar.svg'),
          disableTooltips: true,
          docViewer: true,
          showFullScreenButton: true,
          hideWhenNotConnected: false,
          params: {
            images: {
              dims: {
                width: 712,
                height: 844
              }
            },
            storage: "session"
          },
        });
        this.sendInitial();
      },
      fetchData() {
        const url = `/jsonapi/node/landing_page?filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`
        const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
        HTTP
          .get(lang + url + this.currentLanguage)
          .then(response => {
            const attrs = response.data.data[0].attributes;
            this.buttonText = attrs.field_chat_button_text;
            this.inputPlaceholder = attrs.field_chat_input_placeholder;
          })
          .then(() => {
            const paragraph = document.createElement("p");

            this.$el.getElementsByClassName("push-launcher")[0].appendChild(paragraph);
            this.$el.getElementsByClassName("push-launcher")[0].getElementsByTagName("p")[0].innerText = this.buttonText;
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="scss">
  $header-height: 90px;
  $sender-height: 80px;
  $border-radius: 19px;
  $avatarSize: 36px;
  $fontSize: 16px;
  $theme-color1: $backgroundColor;
  $theme-color2: $textColor;
  $theme-color3: $blueTextColor;
  $chatBackground: $grayLightColor;

  #webchat {
    .push-launcher {
      @include fontFamily();
      padding: 20px 75px 20px 30px;
      background: $textColor;
      border-radius: 66px;
      color: $whiteColor;
      height: 66px;
      width: auto;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      box-shadow: none;
      position: relative;
      z-index: $baseZIndex + 4;
      border: none;

      .push-close-launcher.push-default {
        display: none;
      }

      img {
        display: none;
      }

      &:after {
        content: "";
        background: url("../assets/img/svg/chat-logo.svg") no-repeat center center;
        width: 51px;
        height: 51px;
        display: block;
        position: absolute;
        right: 8px;
        top: 8px;
      }
    }
    .push-widget-container {
      bottom: 110px;
      right: 20px;
      &.push-chat-open {
        height: 98vh;
        bottom: 10px;
      }
      &.push-full-screen.push-chat-open {
        right: 20px;
        left: 20px;
        width: calc(100% - 40px);
        .push-group-message.push-from-response {
          width: 65%;
          margin: 0 auto;
        }

        .push-messages-container {
          height: 100%;
        }

        .push-new-message {
          margin-left: 20%;
        }

        .push-send {
          margin-right: 20%;
        }
      }
    }

    .push-messages-container {
      padding: 18px !important;
      //height: 65vh;
      max-height: none;
      min-height: inherit;
      background-color: $chatBackground;

      .push-avatar {
        width: $avatarSize;
        height: $avatarSize;
        border-radius: 0;
        margin-top: 4px;
      }

      .push-message {
        margin: 10px 0;
      }
    }

    .push-conversation-container {
      box-shadow: 0 44px 124px rgba(0, 0, 0, 0.19);

      .push-poweredby-container {
        display: none;
      }

      .push-header {
        background: url("../assets/img/svg/chat-header-logo.svg") no-repeat 18px center $whiteColor;
        height: 90px;

        .push-avatar,
        .push-title {
          display: none;
        }
      }

      .push-close-button,
      .push-toggle-fullscreen-button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        width: 40px;
        height: 20px;
        cursor: pointer;

        img {
          display: none;
        }
      }

      .push-close-button {
        background: url("../assets/img/svg/chat-close.svg") no-repeat center center $whiteColor;
      }

      .push-toggle-fullscreen-button {
        background: url("../assets/img/svg/fullscreen.svg") no-repeat center center $whiteColor;
      }

      .push-close-button:focus,
      .push-close-button:active,
      .push-close-button:hover {
        outline: none;
      }

      .push-close-button::-moz-focus-inner {
        border: 0;
      }

      .push-close {
        display: inline-block;
        width: 20px;
        height: 20px;
      }

      .push-hide-sm {
        display: none;
      }

      .push-response {
        border-radius: 0 $border-radius $border-radius $border-radius;
        background-color: $theme-color1;
        font-family: "Open Sans", sans-serif;
        font-size: $fontSize;
        line-height: 26px;
        color: $theme-color2;
        padding: 15px 19px;
        overflow: visible;
        min-height: 36px;
      }

      .push-group-message.push-from-response {
        .push-message {
          &:not(:first-child):not(:last-child):not(:last-child) {
            margin-top: 8px;
            margin-bottom: 8px;
          }

          &:not(:first-child) .push-response {
            border-radius: $border-radius;
          }

          &:first-child:not(:only-child) .push-response {
            border-radius: 0 $border-radius $border-radius $border-radius;
          }

          &:first-child:not(:only-child) {
            margin-bottom: 12px;
          }

          &:not(:first-child):not(:only-child).push-with-avatar {
            margin-left: 43px;
          }
        }
      }

      .push-replies {
        margin: 15px 0 0 0;
      }

      .push-reply {
        width: 100%;
        border-radius: $border-radius;
        border: 2px solid $theme-color2;
        font-family: "Open Sans", sans-serif;
        font-size: $fontSize;
        color: $theme-color2;
        padding: 15px;
        justify-content: center;
      }

      .push-client {
        background-color: $theme-color2;
        border-radius: $border-radius;
        font-family: "Open Sans", sans-serif;
        font-size: $fontSize;
        line-height: 26px;
        color: $whiteColor;
        padding: 15px 19px;
        position: relative;
        margin: 10px 46px 20px auto;
        overflow: visible;

        &:before {
          content: "";
          //background: url('../images/userAvatar.svg') no-repeat center center;
          width: $avatarSize;
          height: $avatarSize;
          display: block;
          position: absolute;
          right: 0;
          bottom: 0;
          margin-right: -46px;
        }
      }
    }

    div#push-wave {
      display: flex;
      align-items: center;
      align-content: center;
      .push-dot {
        background-color: $secondaryColor;
      }

      .push-dot:nth-child(2) {
        background-color: $theme-color2;
      }

      .push-dot:nth-child(3) {
        background-color: $theme-color3;
      }
    }

    .push-sender {
      background-color: $whiteColor;
      padding: 0;
      height: 80px;
      box-shadow: 0px -8px 40px rgba(24, 42, 142, 0.08);
    }

    .push-new-message {
      font-family: "Open Sans", sans-serif;
      background-color: inherit;
      color: $theme-color2;
      font-weight: normal;
      font-size: 16px;
      line-height: 160%;
      padding: 0 28px;
    }

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: $theme-color2;
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $theme-color2;
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: $theme-color2;
      font-family: "Open Sans", sans-serif;
      font-size: 16px;
    }

    .push-send {
      background: url("../assets/img/svg/send.svg") no-repeat center center $whiteColor;
      width: 29px;
      height: 29px;
      margin-right: 30px;

      img {
        display: none;
      }
    }

    @media (max-width: $mobileResolution) {
      .push-widget-container {
        margin: 0 auto;
        left: 0;
        right: 0;
        z-index: $baseZIndex + 5;
        padding: 0;
        bottom: 0;
      }
      .push-launcher {
        margin: 20px auto;
        right: 0;
        left: 0;
      }
    }
  }

</style>
