import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import store from './store';
import VueRouter from 'vue-router';
import router from './router';
import { getValidBrowserLanguage } from '@/util/browser';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');

store.dispatch('setLanguage', localStorage.getItem('language') || getValidBrowserLanguage() || 'en');
store.dispatch('agreeWithPolicy', localStorage.getItem('isAgreedWithPolicy'));
