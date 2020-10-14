import Vue from 'vue';
import App from '@/app.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

let handleOutsideClick;
Vue.directive('closable', {
    bind(el, binding, vnode) {
        handleOutsideClick = (event) => {
            event.stopPropagation();
            const { handler, exclude } = binding.value;
            let clickedOnExcludedEl = false;
            exclude.forEach((refName) => {
                if (!clickedOnExcludedEl) {
                    const excludedEl = vnode.context.$refs[refName];
                    clickedOnExcludedEl = excludedEl.contains(event.target);
                }
            });
            if (!el.contains(event.target) && !clickedOnExcludedEl) {
                vnode.context[handler]();
            }
        }
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
    },
    unbind() {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
    }
});

Vue.directive('focus', {
    inserted: el => el.focus()
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');