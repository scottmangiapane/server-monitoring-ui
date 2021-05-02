<template>
    <div class='card'>
        <div class='card-title'>
            <h4>Two-Factor Authentication</h4>
        </div>
        <DisableMfa v-if='account["mfa_verified"]' />
        <EnableMfa v-else />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DisableMfa from '@/views/settings/mfa/disable-mfa.vue';
import EnableMfa from '@/views/settings/mfa/enable-mfa.vue';

export default {
    components: {
        DisableMfa,
        EnableMfa
    },
    computed: {
        ...mapState([ 'account' ])
    }
}
</script>