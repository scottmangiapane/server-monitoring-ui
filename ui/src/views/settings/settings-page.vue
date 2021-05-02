<template>
    <div class='row'>
        <div class='col-sm-4 col-md-3'>
            <ul>
                <li><router-link :class='isActive("/settings/account")' to='/settings/account'>
                    Account
                </router-link></li>
                <li><router-link :class='isActive("/settings/options")' to='/settings/options'>
                    Options
                </router-link></li>
                <li><router-link :class='isActive("/settings/two-factor")' to='/settings/two-factor'>
                    Two-factor
                </router-link></li>
            </ul>
        </div>
        <div class='col-sm-8 col-md-9'>
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState([ 'account' ])
    },
    methods: {
        isActive(path) {
            return (this.$route.path === path) ? 'btn' : '';
        }
    }
}
</script>

<style scoped>
::v-deep input { width: 100%; }

::v-deep hr { margin: 32px 0; }

::v-deep :not(.card-title) > h4, ::v-deep input, ::v-deep p { margin-bottom: 16px; }

::v-deep .text-success {
    display: inline-block;
    margin-bottom: 0;
    margin-left: 8px;
}

a {
    display: inline-block;
    padding-bottom: 8px;
    padding-top: 8px;
    width: 100%;
}

a:not(.btn) { padding: 8px; }

li { margin-bottom: 8px; }

ul {
    list-style-type: none;
    margin: 0 0 32px 0;
    padding: 0;
}
</style>