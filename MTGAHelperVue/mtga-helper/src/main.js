import Vue from 'vue';
import Toasted from 'vue-toasted';
import axios from 'axios';
import VueAxios from 'vue-axios';
import UniqueId from 'vue-unique-id';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.use(UniqueId);
Vue.use(VueAxios, axios);

// Add a request interceptor
axios.interceptors.request.use(function requestSuccessInterceptor(config) {
    // Do something before request is sent
    console.log(`request: ${config.method.toUpperCase()} ${config.url} ${config.data}`);
    return config;
  }, function requestErrorInterceptor(error) {
    console.warn(error);
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function responseSuccessInterceptor(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(`response: ${response.config.method.toUpperCase()} ${response.config.url} ${response.statusText}-${response.status}`);
    return response;
  }, function responseErrorInterceptor(error, ...args) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.warn(error);
    console.warn(args);
    return Promise.reject(error);
  });

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
