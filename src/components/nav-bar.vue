<template>
    <ul v-if='account'>
        <div class='float-left'>
            <li><router-link to='/'>Dashboard</router-link></li>
        </div>
        <div class='float-right'>
            <li><button @click='toggleDropdown' class='dropdown dropdown-right' ref='button'>
                Account ▾
                <div
                    v-show='isDropdownOpen'
                    v-closable='{ exclude: ["button"], handler: "closeDropdown" }'
                    class='dropdown-window'
                >
                    <router-link to='/settings/account'>Settings</router-link>
                    <router-link to='/sign-in'>Sign out</router-link>
                </div>
            </button></li>
        </div>
        <div class='clearfix'></div>
    </ul>
    <ul v-else>
        <div class='float-left'>
            <li><router-link to='/about'>About</router-link></li>
        </div>
        <div class='float-right'>
            <li><router-link to='/sign-in'>Sign in</router-link></li>
            <li><router-link class='btn' to='/sign-up' tag='button'>Sign up</router-link></li>
        </div>
        <div class='clearfix'></div>
    </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState([ 'account' ])
    },
    data() {
        return {
            isDropdownOpen: false
        };
    },
    methods: {
        closeDropdown() {
            this.isDropdownOpen = false;
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        }
    }
}
</script>

<style scoped>
a, button:not(.btn) {
    display: block;
    padding: 8px 0;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 16px 0;
}

li {
    float: left;
    padding: 0 16px;
}

li:first-of-type { padding-left: 0; }

li:last-of-type { padding-right: 0; }

.dropdown-window { margin-top: 10px; }

.dropdown-window a {
    display: block;
    padding: 8px 16px;
}
</style>