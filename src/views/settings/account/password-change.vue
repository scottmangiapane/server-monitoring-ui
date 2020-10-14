<template>
    <div>
        <h4>Change password</h4>
        <form @submit='changePassword'>
            <div class='row'>
                <div class='col-md-6'>
                    <input
                        v-model='password'
                        @input='reset'
                        autocomplete='on'
                        placeholder='Current password'
                        required='required'
                        type='password'
                    />
                </div>
                <div class='col-md-6'></div>
                <div class='col-md-6'>
                    <input
                        v-model='newPassword'
                        @input='reset'
                        autocomplete='on'
                        placeholder='New password'
                        required='required'
                        type='password'
                    />
                </div>
                <div class='col-md-6'>
                    <input
                        v-model='confirmNewPassword'
                        @input='reset'
                        autocomplete='on'
                        placeholder='Confirm new password'
                        required='required'
                        type='password'
                    />
                </div>
            </div>
            <p v-if='mismatch' class='text-error text-small'>Passwords don't match</p>
            <p v-for='error in errors' :key='error.msg' class='text-error text-small'>{{ error.msg }}</p>
            <button v-if='loading' class='btn' type='submit' disabled>Loading...</button>
            <button v-else :disabled='mismatch' class='btn' type='submit'>Save changes</button>
            <p v-if='saved' class='text-success text-small'>Saved!</p>
        </form>
    </div>
</template>

<script>
import ApiService from '@/api-service';

export default {
    computed: {
        mismatch() {
            return this.newPassword !== this.confirmNewPassword;
        }
    },
    data() {
        return {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
            loading: false,
            errors: null,
            saved: false
        }
    },
    methods: {
        async changePassword(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                await ApiService.postAuthCredsPassword({
                    password: this.password,
                    newPassword: this.newPassword
                });
                this.password = '';
                this.newPassword = '';
                this.confirmNewPassword = '';
                this.saved = true;
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