import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  }, {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
      component: () => import( /* webpackChunkName: "PrivacyPolicy" */ '../views/PrivacyPolicy.vue'),
  }, {
    path: '/TermsOfUse',
    name: 'TermsOfUse',
      component: () => import( /* webpackChunkName: "TermsOfUse" */ '../views/TermsOfUse.vue'),
  }, {
    path: '/Contact',
    name: 'Contact',
      component: () => import( /* webpackChunkName: "Contact" */ '../views/Contact.vue'),
  }, {
    path: '/Articles',
    name: 'Articles',
      component: () => import( /* webpackChunkName: "Articles" */ '../views/Articles.vue'),
  }, {
    path: '/News',
    name: 'News',
      component: () => import( /* webpackChunkName: "News" */ '../views/News.vue'),
  }, {
    path: '/Decks',
    name: 'Decks',
      component: () => import( /* webpackChunkName: "Decks" */ '../views/Decks.vue'),
  }, {
    path: '/Meta',
    name: 'Meta',
      component: () => import( /* webpackChunkName: "Meta" */ '../views/Meta.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
