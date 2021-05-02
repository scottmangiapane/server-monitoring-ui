<template>
    <div>
        <h4>Delete account</h4>
        <form @submit='deleteAccount'>
            <p>This will permanently delete all of your account data.</p>
            <div class='row'>
                <div class='col-md-6'>
                    <input
                        v-model='gotIt'
                        @input='reset'
                        placeholder='Got it'
                        required='required'
                        type='text'
                    />
                </div>
                <div class='col-md-6'>
                </div>
            </div>
            <p v-if='!confirmed' class='text-error text-small'>Type "got it" to continue</p>
            <p v-for='error in errors' :key='error.msg' class='text-error text-small'>{{ error.msg }}</p>
            <button v-if='loading' class='btn btn-red' type='submit' disabled>Loading...</button>
            <button v-else :disabled='!confirmed' class='btn btn-red' type='submit'>Delete account</button>
        </form>
    </div>
</template>

<script>
import ApiService from '@/api-service';

export default {
    computed: {
        confirmed() {
            return this.gotIt.toLowerCase() === 'got it';
        }
    },
    data() {
        return {
            gotIt: '',
            loading: false,
            errors: null
        }
    },
    methods: {
        async deleteAccount(e) {
            e.preventDefault();
            try {
                this.loading = true;
                this.errors = null;
                await ApiService.deleteAccount();
                this.$router.push('/sign-in');
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