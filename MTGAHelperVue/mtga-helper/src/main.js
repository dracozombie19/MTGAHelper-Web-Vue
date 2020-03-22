import Vue from 'vue';
import Toasted from 'vue-toasted';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n'

Vue.use(VueAxios, axios)

// https://github.com/shakee93/vue-toasted
Vue.use(Toasted, {
  position: 'top-center',
  duration: 2000,
  keepOnHover: true
});
Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
