import Vue from 'vue';
import Vuex from 'vuex';
import ApiService from '@/api-service';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        account: null,
        accountIsLoading: false,
        info: null,
        cpu: null,
        memory: null,
        time: null
    },
    getters: {},
    actions: {
        clearAccount(context) {
            context.commit('SET_ACCOUNT', null);
            context.commit('SET_ACCOUNT_LOADING', false);
        },
        async setAccount(context) {
            try {
                context.commit('SET_ACCOUNT_LOADING', true);
                context.commit('SET_ACCOUNT', await ApiService.getAccount());
            } finally {
                context.commit('SET_ACCOUNT_LOADING', false);
            }
        },
        setInfo({ commit }, data) { commit('SET_INFO', data); },
        setCpu({ commit }, data) { commit('SET_CPU', data); },
        setMemory({ commit }, data) { commit('SET_MEMORY', data); },
        setTime({ commit }, data) { commit('SET_TIME', data); }
    },
    mutations: {
        SET_ACCOUNT(state, value) { state.account = value; },
        SET_ACCOUNT_LOADING(state, value) { state.accountIsLoading = value; },
        SET_INFO(state, value) { state.info = value; },
        SET_CPU(state, value) { state.cpu = value; },
        SET_MEMORY(state, value) { state.memory = value; },
        SET_TIME(state, value) { state.time = value; }
    }
});
