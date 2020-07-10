import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/main.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Main },
    { path: '*', component: () => import('@/views/not-found.vue') }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
