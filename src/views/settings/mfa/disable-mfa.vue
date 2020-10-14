<template>
    <form @submit='disableMfa'>
        <h4>Disable two-factor</h4>
        <div class='row'>
            <div class='col-md-6'>
                <input
                    v-model='password'
                    @input='reset'
                    autocomplete='on'
                    placeholder='Password'
                    required='required'
                    type='password'
                />
            </div>
            <div class='col-md-6'></div>
        </div>
        <p v-for='error in errors' :key='error.msg' class='text-error text-small'>{{ error.msg }}</p>
        <button v-if='loading' class='btn' type='submit' disabled>Loading...</button>
        <button v-else class='btn' type='submit'>Continue</button>
    </form>
</template>

<script>
import ApiService from '@/api-service';

export default {
    data() {
        return {
            password: '',
            loading: false,
            errors: null,
            saved: false,
            secret: '',
            showQrCode: false,
            image: ''
        }
    },
    methods: {
        async disableMfa(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                const mfa = await ApiService.postAuthMfaDisable({
                    password: this.password
                });
                this.password = '';
                this.saved = true;
                this.$store.dispatch('setAccount');
            } catch (err) {
                this.errors = err.response.data.errors;
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