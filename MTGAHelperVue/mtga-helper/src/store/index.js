import Vue from 'vue';
import Vuex from 'vuex';
import {SHOW_SIGNIN_MODAL, HIDE_SIGNIN_MODAL, SET_USER_DATA, RESET_USER_DATA} from '@/store/mutations';
import {USER_SIGNIN_SUCCESS} from '@/store/actions';
import util from '@/common/util';

Vue.use(Vuex);

const emptyUser = {
    mtgaHelperUserId: null,
    provider: null,
    email: null,
    isAuthenticated: false,
    status: null,
    responseStatus: null,
    message: null
};

export default new Vuex.Store({
    state: {
        user: util.getObjectFromCache('userData') || emptyUser,
        isSignInModalRendered: false
    },
    mutations: {
        [SHOW_SIGNIN_MODAL](state) {
            console.log(SHOW_SIGNIN_MODAL);
            state.isSignInModalRendered = true;
        },
        [HIDE_SIGNIN_MODAL](state) {
            console.log(HIDE_SIGNIN_MODAL);
            state.isSignInModalRendered = false;
        },
        [SET_USER_DATA] (state, user) {
            console.log(HIDE_SIGNIN_MODAL, user);
            util.setObjectInCache('userData', user);
            state.user = user;
        },
        [RESET_USER_DATA] (state) {
            console.log(RESET_USER_DATA);
            util.setObjectInCache('userData', emptyUser);
            state.user = emptyUser;
            // TODO: reload page?
        }
    },
    actions: {
        // {commit} means to get the 'commit' property from the context object passed in as the first arg
        [USER_SIGNIN_SUCCESS]({commit}, user) {
            commit(SET_USER_DATA, user);
            commit(HIDE_SIGNIN_MODAL);
            // TODO: reload page?
        }
    },
    modules: {
    },
});
