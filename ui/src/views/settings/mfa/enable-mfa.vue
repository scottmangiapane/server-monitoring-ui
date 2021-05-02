<template>
    <form @submit='confirmMfa' v-if='showQrCode'>
        <h4>1. Scan this QR code with an authenticator app:</h4>
        <div class='margin-auto qrcode' v-html='image'></div>
        <p class='text-break text-center text-small'>{{ secret }}</p>
        <h4>2. Enter the verification code from the app:</h4>
        <div class='row'>
            <div class='col-md-6'>
                <input
                    v-model='token'
                    @input='reset'
                    autocomplete='on'
                    placeholder='MFA token'
                    required='required'
                    type='text'
                />
            </div>
            <div class='col-md-6'></div>
        </div>
        <p v-for='error in errors' :key='error.msg' class='text-error text-small'>{{ error.msg }}</p>
        <button v-if='loading' class='btn' type='submit' disabled>Loading...</button>
        <button v-else class='btn' type='submit'>Save changes</button>
        <p v-if='saved' class='text-success text-small'>Saved!</p>
    </form>
    <form @submit='enableMfa' v-else>
        <h4>Enable two-factor</h4>
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
import QRCode from 'qrcode';
import ApiService from '@/api-service';

export default {
    data() {
        return {
            password: '',
            token: '',
            loading: false,
            errors: null,
            saved: false,
            secret: '',
            showQrCode: false,
            image: ''
        }
    },
    methods: {
        async confirmMfa(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                const mfa = await ApiService.postAuthSignIn({
                    email: this.$store.state.account.email,
                    password: this.password,
                    token: this.token
                });
                this.saved = true;
                this.$store.dispatch('setAccount');
            } catch (err) {
                this.errors = err.response.data.errors;
            };
            this.loading = false;
        },
        async enableMfa(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                const mfa = await ApiService.postAuthMfaEnable({
                    password: this.password
                });
                this.image = await QRCode.toString(mfa.url, { type: 'svg' });
                this.secret = mfa.secret;
                this.showQrCode = true;
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

<style scoped>
.qrcode {
    height: 200px;
    margin-bottom: 16px;
    width: 200px;
}
</style>