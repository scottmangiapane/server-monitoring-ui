import axios from 'axios';
import store from '@/store';
import router from '@/router';

axios.interceptors.response.use(res => res, err => {
    if (err.response.status === 401) {
        _redirectToSignIn();
    }
    return Promise.reject(err);
});

const _redirectToSignIn = () => {
    const path = router.currentRoute.path;
    // TODO get correct path on itital page load (beforeEach listener)
    router.push({
        path: '/sign-in',
        query: { redirect: (path !== '/') ? path : undefined }
    });
};

export default {
    postAccounts(payload) {
        const url = '/api/accounts';
        return axios.post(url, payload).then(res => {
            localStorage.setItem('id', res.data.id);
            store.dispatch('setAccount');
            return res.data;
        });
    },
    deleteAccount() {
        const accountId = localStorage.getItem('id');
        if (!accountId) {
            _redirectToSignIn();
            return Promise.reject('Unknown account ID');
        }
        const url = `/api/accounts/${ accountId }`;
        return axios.delete(url).then(res => res.data);
    },
    getAccount() {
        const accountId = localStorage.getItem('id');
        if (!accountId) {
            _redirectToSignIn();
            return Promise.reject('Unknown account ID');
        }
        const url = `/api/accounts/${ accountId }`;
        return axios.get(url).then(res => res.data);
    },
    postAuthCredsEmail(payload) {
        const url = '/api/auth/creds/email';
        return axios.post(url, payload).then(res => res.data);
    },
    postAuthCredsPassword(payload) {
        const url = '/api/auth/creds/password';
        return axios.post(url, payload).then(res => res.data);
    },
    postAuthMfaDisable(payload) {
        const url = '/api/auth/mfa/disable';
        return axios.post(url, payload).then(res => res.data);
    },
    postAuthMfaEnable(payload) {
        const url = '/api/auth/mfa/enable';
        return axios.post(url, payload).then(res => res.data);
    },
    postAuthSignIn(payload) {
        const url = '/api/auth/sign-in';
        return axios.post(url, payload).then(res => {
            localStorage.setItem('id', res.data.id);
            store.dispatch('setAccount');
            return res.data;
        });
    },
    postAuthSignOut() {
        const url = '/api/auth/sign-out';
        return axios.post(url).then(res => {
            localStorage.removeItem('id');
            store.dispatch('clearAccount');
            return res.data;
        });
    },
    getDynamic(payload) {
        const url = '/api/info/dynamic';
        return axios.get(url, payload).then(res => res.data);
    },
    getStatic(payload) {
        const url = '/api/info/static';
        return axios.get(url, payload).then(res => res.data);
    }
};