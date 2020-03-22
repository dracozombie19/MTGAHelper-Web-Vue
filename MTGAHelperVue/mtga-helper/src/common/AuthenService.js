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
        return (new Promise(function signOutPromise(resolve, reject) {
            ApiService.sendAjaxPost(
                '/api/Account/Signout',
                null,
                null,
                (statuscode, body) => {
                    if (statuscode === 200) {
                        resolve();
                    } else {
                        reject(new Error(`${statuscode} - ${body}`));
                    }
                });
            }));
    },
    signUp(email, password) {
        return email && password;
    }
};

export default AuthenService;
