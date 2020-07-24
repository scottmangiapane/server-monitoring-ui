import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        info: null,
        cpu: null,
        memory: null
    },
    getters: {},
    actions: {
        clearAll({ commit }) {
            commit('SET_INFO', null);
            commit('SET_CPU', null);
            commit('SET_MEMORY', null);
        },
        setInfo({ commit }, data) { commit('SET_INFO', data); },
        setCpu({ commit }, data) { commit('SET_CPU', data); },
        setMemory({ commit }, data) { commit('SET_MEMORY', data); }
    },
    mutations: {
        SET_INFO(state, value) { state.info = value; },
        SET_CPU(state, value) { state.cpu = value; },
        SET_MEMORY(state, value) { state.memory = value; }
    }
});
