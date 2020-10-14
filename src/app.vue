<template>
    <div id="app">
        <div v-if="!account && accountIsLoading" class="center fill-screen">
            <LoadingGraphic size="lg" />
        </div>
        <div v-else>
            <header>
                <nav class="container">
                    <NavBar />
                </nav>
            </header>
            <main class="container">
                <router-view />
            </main>
            <footer></footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadingGraphic from '@/components/loading-graphic.vue';
import NavBar from '@/components/nav-bar.vue';

export default {
    components: {
        LoadingGraphic,
        NavBar
    },
    computed: {
        ...mapState([ 'account', 'accountIsLoading' ])
    },
    created() {
        if (process.env.NODE_ENV === 'production') {
            console.log('%cStop!', 'color: red; font-size: 48px; font-weight: bold;');
            console.log(
                '%cThis area is for developers and researchers. '
                + 'If someone told you to copy-paste something in here, '
                + 'it is likely a scam and could compromise your account.',
                'color: black; font-size: 22px; font-weight: bold;'
            );
        }
    }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/icon?family=Roboto');
@import url(./assets/bootstrap-grid.min.css);

* {
    margin: 0;
    padding: 0;
}

h2 {
    color: #202020;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    line-height: 36px;
    text-transform: capitalize;
}

hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

p {
    color: #727272;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 24px;
}

[v-cloak] {
    display: none;
}

.bar {
    animation: bar 1s linear infinite;
    background-image: linear-gradient(
        -45deg,
        #2196f3 25%,
        #42a5f5 25%,
        #42a5f5 50%,
        #2196f3 50%,
        #2196f3 75%,
        #42a5f5 75%,
        #42a5f5
    );
    background-size: 2rem 2rem;
    border-radius: 0.25rem 0 0 0.25rem;
    height: 1rem;
}

.bar-error {
    background-image: linear-gradient(
        -45deg,
        #f44336 25%,
        #ef5350 25%,
        #ef5350 50%,
        #f44336 50%,
        #f44336 75%,
        #ef5350 75%,
        #ef5350
    );
    border-radius: 0.25rem;
}

.bar-wrapper {
    background-color: #f1f1f1;
    border-radius: 0.25rem;
    width: 100%;
}

.bordered {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
}

.card {
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin-bottom: 30px;
    padding: 32px;
}

.card-no-padding {
    padding-left: 0;
    padding-right: 0;
}

.center {
    align-items: center;
    display: flex;
    justify-content: center;
}

.clearfix {
    clear: both;
}

.dark {
    color: #202020;
}

.fill-screen {
    height: 100vh;
    width: 100vw;
}

.inline {
    display: inline-block;
    margin: 0 6px;
    vertical-align: middle;
}

.left {
    float: left;
}

.left-text {
    text-align: left;
}

.right {
    float: right;
}

.small {
    font-size: 10px;
    line-height: 15px;
    text-align: left;
}

.spacer {
    margin-top: 16px;
}

.spacer-negative {
    margin-top: -16px;
}

.wrapper {
    background-color: #fafafa;
    box-shadow: inset 0px 250px 0px 0px #2196f3;
    padding: 64px 0;
    text-align: center;
}

@keyframes bar {
    0% {
        background-position: 0;
    }

    100% {
        background-position: 2rem;
    }
}

@media all and (max-width: 991px) {
    .card {
        margin-bottom: 15px;
    }
}

@media all and (max-width: 575px) {
    .card {
        box-shadow: none;
        margin: 0;
        padding: 24px;
    }

    .card-no-padding {
        padding-left: 0;
        padding-right: 0;
    }

    .wrapper {
        background-color: white;
        box-shadow: none;
        padding: 32px 0;
    }
} */
</style>

<style>
@import url('https://fonts.googleapis.com/icon?family=Roboto');
@import url(./assets/bootstrap-grid.min.css);

/* Resets */

a, a:active, a:focus, a:hover, a:visited { text-decoration:none; }

html, body, div, h1, h2, h3, h4, h5, h6, a, p, li, button {
    margin: 0;
    padding: 0;
}

/* Font selectors */

a, button, li, h1, h2, h3, h4, h5, h6, input, label, p {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: inherit;
    font-family: 'Roboto', sans-serif;
    line-height: 1.5em;
    font-weight: 400;
}

a, button, li, input, label, p { font-size: 1em; }

h1, h2, h3, h4, h5, h6 { font-weight: 500; }

h1 {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 700;
}

p { color: #727272; }

/* Element selectors */

body { background-color: white; }

button {
    background-color: transparent;
    border: none;
    outline: none;
}

footer { margin-top: 32px; }

header {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 48px;
}

hr { border: 1px solid #e0e0e0; }

img {
    user-select: none;
    max-height: 100%;
    max-width: 100%;
}

input[type='email'], input[type='password'], input[type='text'] {
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: white;
    border: none;
    box-shadow: inset 0px 0px 0px 2px #e0e0e0;
    border-radius: 5px;
    outline: none;
    padding: 8px;
}

input[type='email']:focus,
input[type='password']:focus,
input[type='text']:focus { box-shadow: inset 0px 0px 0px 2px #2196f3; }

input[type='submit'] { border: none; }

/* Class selectors */

.bar {
    animation: bar 1s linear infinite;
    background-image: linear-gradient(
        -45deg,
        #2196f3 25%,
        #42a5f5 25%,
        #42a5f5 50%,
        #2196f3 50%,
        #2196f3 75%,
        #42a5f5 75%,
        #42a5f5
    );
    background-size: 40px 40px;
    border-radius: 5px 0 0 5px;
    box-shadow: 0 5px #1976d2;
    height: 20px;
}

.bar-wrapper {
    background-color: #f1f1f1;
    border-radius: 5px;
    box-shadow: 0 5px #e0e0e0;
    font-size: 0.6em;
    text-align: left;
    width: 100%;
}

.btn {
    background-color: #2196f3;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    padding: 8px;
}

.btn:active, .btn:active:focus { background-color: #64b5f6; }

.btn:disabled, .btn:disabled:hover { background-color: #b0bec5; cursor: not-allowed; }

.btn:hover { background-color: #42a5f5; }

.btn-red { background-color: #f44336; }

.btn-red:active, .btn-red:active:focus { background-color: #e57373; }

.btn-red:hover { background-color: #ef5350; }

.card {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.2);
    display: inline-block;
    padding: 32px;
    text-align: left;
}

.card-title {
    background-color: #263238;
    border-radius: 16px 16px 0 0;
    color: white;
    margin: -32px -32px 32px -32px;
    padding: 32px;
    text-align: center;
}

.center {
    align-items: center;
    display: flex;
    justify-content: center;
}

.clearfix::after {
    content: '';
    clear: both;
    display: table;
}

.dropdown {
    display: inline-block;
    position: relative;
}

.dropdown-right .dropdown-window { right: 0; }

.dropdown-window {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    display: block;
    padding: 8px 0;
    position: absolute;
    z-index: 1;
}

.dropdown-window a:hover {
    background-color: #f5f5f5;
    cursor: pointer;
}

.fill-screen {
    height: 100vh;
    width: 100vw;
}

.float-left { float: left; }

.float-right { float: right; }

.link { color: #1976d2; }

.link:active { color: #d32f2f; }

.link:hover { text-decoration: underline; }

.margin-auto { margin: auto; }

.text-break { overflow-wrap: break-word; }

.text-center { text-align: center; }

.text-error { color: #d32f2f; }

.text-small { font-size: 0.8em; }

.text-success { color: #388e3c; }

/* Media queries */

@media only screen and (max-width: 512px) {
    .card { box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2); }
}
</style>