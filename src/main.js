import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/plugins';
import '@/scss/base.scss';
import '@/core/components';

import '@/api';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
