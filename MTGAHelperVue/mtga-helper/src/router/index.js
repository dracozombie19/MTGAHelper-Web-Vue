import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import i18n from '../i18n';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: i18n.t('home'),
    component: Home,
  },
  {
    path: '/about',
    name: i18n.t('about'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  }, {
    path: '/PrivacyPolicy',
    name: i18n.t('privacyPolicy'),
      component: () => import( /* webpackChunkName: "PrivacyPolicy" */ '../views/PrivacyPolicy.vue'),
  }, {
    path: '/TermsOfUse',
    name: i18n.t('termsOfUse'),
      component: () => import( /* webpackChunkName: "TermsOfUse" */ '../views/TermsOfUse.vue'),
  }, {
    path: '/Contact',
    name: i18n.t('contact'),
      component: () => import( /* webpackChunkName: "Contact" */ '../views/Contact.vue'),
  }, {
    path: '/Articles',
    name: i18n.t('articles'),
      component: () => import( /* webpackChunkName: "Articles" */ '../views/Articles.vue'),
  }, {
    path: '/News',
    name: i18n.t('news'),
      component: () => import( /* webpackChunkName: "News" */ '../views/News.vue'),
  }, {
    path: '/Decks',
    name: i18n.t('decks'),
      component: () => import( /* webpackChunkName: "Decks" */ '../views/Decks.vue'),
  }, {
    path: '/Meta',
    name: i18n.t('meta'),
      component: () => import( /* webpackChunkName: "Meta" */ '../views/Meta.vue'),
  }, {
    path: '/Lands',
    name: i18n.t('lands'),
      component: () => import( /* webpackChunkName: "Lands" */ '../views/Lands.vue'),
  }, {
    path: '/Profile',
    name: i18n.t('profile'),
      component: () => import( /* webpackChunkName: "Profile" */ '../views/Profile.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
