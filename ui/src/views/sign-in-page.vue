<template>
    <div class="text-center">
        <div class="card">
            <div class="card-title">
                <h4>Sign in to Server Monitoring</h4>
            </div>
            <form @submit="signIn">
                <div v-if="showMfaInput">
                    <input
                        v-focus
                        v-model="token"
                        @input="reset"
                        autocomplete="on"
                        placeholder="MFA token"
                        required="required"
                        type="text"
                    />
                </div>
                <div v-else>
                    <input
                        v-focus
                        v-model="email"
                        @input="reset"
                        autocomplete="on"
                        placeholder="Email"
                        required="required"
                        type="email"
                    />
                    <input
                        v-model="password"
                        @input="reset"
                        autocomplete="on"
                        placeholder="Password"
                        required="required"
                        type="password"
                    />
                    <input id="remember" type="checkbox" v-model="rememberEmail">
                    <label for="remember">Remember me</label>
                </div>
                <p v-for="error in errors" :key="error.msg" class="text-error text-small">{{ error.msg }}</p>
                <button v-if="loading" class="btn" type="submit" disabled>Loading...</button>
                <button v-else class="btn" type="submit">Continue</button>
            </form>
        </div>
        <p v-if="isSignUpEnabled" class="text-small">
            Don't have an account?
            <router-link to="/sign-up" class="link">Create one here.</router-link>
        </p>
    </div>
</template>

<script>
import ApiService from '@/api-service';

export default {
    async created() {
        await ApiService.postAuthSignOut();
        this.$store.dispatch('clearAccount');
    },
    data() {
        const cachedEmail = localStorage.getItem('email');
        return {
            email: cachedEmail,
            password: '',
            token: '',
            isSignUpEnabled: process.env.ALLOW_SIGN_UP !== 'false',
            rememberEmail: !!cachedEmail,
            showMfaInput: false,
            loading: false,
            errors: null
        }
    },
    methods: {
        async signIn(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                const res = await ApiService.postAuthSignIn({
                    email: this.email,
                    password: this.password,
                    token: this.token || undefined
                });
                localStorage.setItem('id', res.id);
                (this.rememberEmail)
                    ? localStorage.setItem('email', this.email)
                    : localStorage.removeItem('email');
                const redirect = this.$route.query.redirect || '/';
                this.$router.push(redirect);
            } catch (err) {
                const messages = err.response.data.errors;
                if (messages.length === 1 && messages[0].msg === 'MFA token is required') {
                    this.showMfaInput = true;
                } else {
                    this.errors = messages;
                }
            };
            this.loading = false;
        },
        reset() {
            this.errors = null;
            this.saved = false;
        }
    }
}
</script>

<style scoped>
button, input:not([type='checkbox']) { width: 100%; }

button { margin-top: 16px; }

input { margin-bottom: 16px; }

.card {
    margin-bottom: 32px;
    max-width: 480px;
}
</style>