import {ApiService} from './ApiService';

export const AuthenService = {
    signIn(email, password) {
        let returnPromise;
        console.log('signIn', email);

        if (!email || !email.trim() || !password || !password.trim()) {
            returnPromise = (new Promise((resolve) => {resolve({status: 'error', data: 'Please provide an email and password'});}));
        } else {
            returnPromise = ApiService.sendAjaxGet(`/api/Account/Signin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        }

        return returnPromise;
    },
    signOut() {
        console.log('signOut');
        return ApiService.sendAjaxPost('/api/Account/Signout');
    },
    signUp(email, password) {
        return email && password;
    },
    googleSignIn() {
        console.log('googleSignIn');
        ApiService.goToURL(`/External/Challenge?provider=Google&returnUrl=%2F`, true);
    },
    facebookSignIn() {
        console.log('facebookSignIn');
        ApiService.goToURL(`/External/Challenge?provider=Facebook&returnUrl=%2F`, true);
    }
};

export default AuthenService;
