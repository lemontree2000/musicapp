import 'babel-polyfill';
import Vue from 'vue';
import store from './store';
import App from './App';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';

import 'common/less/index.less';

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png'),
  error: require('common/image/default.1.png')
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
