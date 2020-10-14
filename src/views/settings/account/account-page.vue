<template>
    <div class='card'>
        <div class='card-title'>
            <h4>Account Settings</h4>
        </div>
        <EmailChange />
        <hr>
        <PasswordChange />
        <hr>
        <DeleteAccount />
    </div>
</template>

<script>
import DeleteAccount from '@/views/settings/account/delete-account.vue';
import EmailChange from '@/views/settings/account/email-change.vue';
import PasswordChange from '@/views/settings/account/password-change.vue';

export default {
    components: {
        DeleteAccount,
        EmailChange,
        PasswordChange
    }
};
</script>