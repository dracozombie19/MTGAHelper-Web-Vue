import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// https://github.com/shakee93/vue-toasted
Vue.use(Toasted, {
  position: 'top-center',
  duration: 2000,
  keepOnHover: true
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
