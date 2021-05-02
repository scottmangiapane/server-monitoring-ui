<template>
    <div class="text-center">
        <div class="card">
            <div class="card-title">
                <h4>Create an Account</h4>
            </div>
            <form @submit="signUp">
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
                <input
                    v-model="confirmPassword"
                    @input="reset"
                    autocomplete="on"
                    placeholder="Confirm password"
                    required="required"
                    type="password"
                />
                <p v-if="mismatch" class="text-error text-small">Passwords don't match</p>
                <p v-for="error in errors" :key="error.msg" class="text-error text-small">{{ error.msg }}</p>
                <button v-if="loading" class="btn" type="submit" disabled>Loading...</button>
                <button v-else :disabled="mismatch" class="btn" type="submit">Continue</button>
            </form>
        </div>
        <p class="text-small">
            Already have an account?
            <router-link to="/sign-in" class="link">Sign in here.</router-link>
        </p>
    </div>
</template>

<script>
import ApiService from '@/api-service';

export default {
    computed: {
        mismatch() {
            return this.password !== this.confirmPassword;
        }
    },
    async created() {
        await ApiService.postAuthSignOut();
    },
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: null
        }
    },
    methods: {
        async signUp(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                await ApiService.postAccounts({
                    email: this.email,
                    password: this.password
                });
                const redirect = this.$route.query.redirect || '/';
                this.$router.push(redirect);
            } catch (err) {
                this.errors = err.response.data.errors;
            };
            this.loading = false;
        },
        reset() {
            this.errors = null;
            this.saved = false;
        }
    },
}
</script>

<style scoped>
button, input { width: 100%; }

button { margin-top: 16px; }

input { margin-bottom: 16px; }

.card {
    margin-bottom: 32px;
    max-width: 480px;
}
</style>