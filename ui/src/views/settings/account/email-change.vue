<template>
    <div>
        <h4>Change email address</h4>
        <form @submit='changeEmail'>
            <div class='row'>
                <div class='col-md-6'>
                    <input
                        v-model='newEmail'
                        @input='reset'
                        autocomplete='on'
                        placeholder='Email'
                        required='required'
                        type='email'
                    />
                </div>
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
            </div>
            <p v-for='error in errors' :key='error.msg' class='text-error text-small'>{{ error.msg }}</p>
            <button v-if='loading' class='btn' type='submit' disabled>Loading...</button>
            <button v-else class='btn' type='submit'>Save changes</button>
            <p v-if='saved' class='text-success text-small'>Saved!</p>
        </form>
    </div>
</template>

<script>
import ApiService from '@/api-service';

export default {
    data() {
        return {
            newEmail: this.$store.state.account.email,
            password: '',
            loading: false,
            errors: null,
            saved: false
        }
    },
    methods: {
        async changeEmail(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                await ApiService.postAuthCredsEmail({
                    password: this.password,
                    newEmail: this.newEmail
                });
                this.password = '';
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
