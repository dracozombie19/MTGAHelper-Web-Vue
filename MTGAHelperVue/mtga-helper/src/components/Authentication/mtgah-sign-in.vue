<template>
    <form action="javascript:void(0);">
        <div class="field">
            <div class="control">
                <label class="label is-small">{{$t('email')}}</label>
                <input :id="$id('txtSigninEmail')"
                       v-model="email"
                       name="txtSigninInEmail"
                       class="input is-small"
                       type="email"
                       size="16"
                       autocomplete="username"
                       @keyup="keyUp" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label is-small">{{$t('password')}}</label>
                <input v-model="password"
                       class="input is-small"
                       type="password"
                       size="16"
                       autocomplete="current-password"
                       @keyup="keyUp" />
            </div>
        </div>
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <button class="button is-info" @click="buttonClick">{{$t(buttonLabel)}}</button>
                </div>
                <div v-if="!isSignUp"
                     class="level-item tooltip is-tooltip-bottom"
                     data-tooltip="Initiate a password reset request"
                     style="margin-left:1rem;">
                    <a @click="resetPassword">{{$t('forgotPassword')}}</a>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import { HIDE_SIGNIN_MODAL } from '@/store/mutations';
import { USER_SIGNIN_SUCCESS } from '@/store/actions';
import { mapMutations, mapActions } from 'vuex';
import AuthenService from '@/common/AuthenService';

export default {
    props: {
        isSignUp: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            email: '',
            password: ''
        };
    },
    computed: {
        buttonLabel() {
            return this.isSignUp ? 'signUp' : 'signIn';
        }
    },
    methods: {
        ...mapMutations({
            hideModal: HIDE_SIGNIN_MODAL // map `this.hideModal()` to `this.$store.commit(HIDE_SIGNIN_MODAL)`
        }),
        ...mapActions({
            setUserData: USER_SIGNIN_SUCCESS // map `this.setUserData(userData)` to `this.$store.dispatch(USER_SIGNIN_SUCCESS, userData)`
        }),
        buttonClick() {
            console.log('buttonClick', this.isSignUp);
            const self = this;

            if (this.isSignUp) {
                AuthenService.signUp(this.email, this.password);
            } else {
                AuthenService.signIn(this.email, this.password).then(function signInSuccess(response) {
                    console.log(response);
                    if (response.status === 'success') {
                        self.setUserData(response.data);
                    } else {
                        self.$toasted.show(`${response.data.message}`, {
                            type: 'error'
                        });
                    }
                });
            }
        },
        resetPassword() {
            console.warn('resetPassword');
        },
        keyUp(e) {
            if (e.keyCode === 13) {
                this.signIn();
            }
        }
    }
};
</script>

<style scoped>
</style>
