import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Dashboard from '@/views/dashboard/dashboard-page.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Dashboard },
    {
        path: '/settings',
        component: () => import('@/views/settings/settings-page.vue'),
        children: [
            { path: 'account', component: () => import('@/views/settings/account/account-page.vue') },
            { path: 'options', component: () => import('@/views/settings/options/options-page.vue') },
            { path: 'two-factor', component: () => import('@/views/settings/mfa/mfa-page.vue') }
        ]
    },
    { path: '/sign-in', component: () => import('@/views/sign-in-page.vue') },
    { path: '/sign-up', component: () => import('@/views/sign-up-page.vue') },
    { path: '*', component: () => import('@/views/not-found-page.vue') }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.afterEach((to, from) => {
    if (![ '/about', '/sign-in', '/sign-up' ].includes(to.path)) {
        store.dispatch('setAccount');
    }
});

export default router;
