<template>
    <div class="card">
        <p class="text-dark">Time</p>
        <div class="spacer"></div>
        <div class="bordered">
            <p class="text-small">Uptime: {{ uptime }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import humanize from 'humanize-duration';

export default {
    computed: mapState({
        uptime: state => humanize(state.time.uptime * 1000, { largest: 2 })
    })
};
</script>