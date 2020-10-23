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

  const WebChat = window.WebChat;

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
      calcDelay(message) {
        let delay = message.length * 50;
        if (delay < 400) delay = 1000;
        return delay;
      },
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
          onWidgetEvent: {
            onChatOpen: () => {
              this.$router.push('index#webchat');
            },
            onChatClose: () => {
              this.$router.push('index');
            },
          },
          customMessageDelay: (message) => {
            this.messages.push(message);
            return this.calcDelay(this.messages[this.messages.length - 2] || message);
          },
          params: {
            images: {
              dims: {
                width: 712,
                height: 844
              }
            },
            storage: "local"
          },
        });
        this.sendInitial();
      },
      fetchData() {
        const url = `/jsonapi/node/landing_page?filter[Langcode][condition][path]=langcode&filter[Langcode][condition][value]=`
        const lang = this.currentLanguage === 'en' ? '' : '/' + this.currentLanguage;
        const fetchedData = (response) => {
          const attrs = response.data.data[0].attributes;
          this.buttonText = attrs.field_chat_button_text;
          this.inputPlaceholder = attrs.field_chat_input_placeholder;
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
