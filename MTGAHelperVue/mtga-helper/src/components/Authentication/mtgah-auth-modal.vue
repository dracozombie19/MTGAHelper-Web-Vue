<template>
    <div class="modal" :class="isVisible ? 'is-active' : ''">
        <div class="modal-background" @click="hideModal"></div>
        <div class="modal-content box">
            <div class="columns">
                <div class="column">
                    <h3 class="title is-3">{{$t('signIn')}}</h3>
                    <div class="button">
                        <a @click="googleSignIn">
                            <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                                 style="height:1rem; margin-right:0.5rem;" alt="Google" /> {{$t('withGoogle')}} </a>
                    </div>
                    <div class="button" style="margin-top:1rem;">
                        <a @click="facebookSignIn">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico"
                                 style="height:1rem; margin-right:0.5rem;" alt="Facebook" /> {{$t('withFacebook')}} </a>
                    </div>
                    <hr />
                    <h4 class="title is-4">{{$t('orLocalAccount')}}</h4>
                    <SignInForm />
                </div>
                <div class="column" style="border-left:dashed 1px #888;">
                    <h3 class="title is-3">{{$t('signUp')}}</h3>
                    <h4 class="subtitle is-4">{{$t('withLocalAccount')}}</h4>
                    <SignInForm is-sign-up />
                </div>
            </div>
            <div class="has-text-weight-bold has-text-centered">
                <!-- <div v-if="modelAccount.message !== null">
                <span v-if="modelAccount.responseStatus !== 'Success'">
                    Error:
                </span>
                {{modelAccount.message}}
                <button v-if="modelAccount.status === 'WaitingForVerificationCode'"
                    class="button is-small is-info" :class="getClassIsLoadingData(constants.loadResendCode)"
                    :disabled="isLoadingData(constants.loadResendCode)"
                    @click="resendVerificationCode()">
                    Resend code
                </button>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { HIDE_SIGNIN_MODAL } from '@/store/mutations';
import { mapMutations } from 'vuex';
import AuthenService from '@/common/AuthenService';
import SignInForm from './mtgah-sign-in.vue';

export default {
    components: {
        SignInForm
    },
    computed: {
        isVisible() {
            return this.$store.state.isSignInModalRendered;
        }
    },
    methods: {
        ...mapMutations({
            hideModal: HIDE_SIGNIN_MODAL // map `this.hideModal()` to `this.$store.commit(HIDE_SIGNIN_MODAL)`
        }),
        googleSignIn() {
            AuthenService.googleSignIn();
        },
        facebookSignIn() {
            AuthenService.facebookSignIn();
        }
    }
};
</script>

<style scoped>
</style>
