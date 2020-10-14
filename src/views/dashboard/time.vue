<template>
    <div class="card">
        <p class="dark">Time</p>
        <div class="spacer"></div>
        <div class="bordered">
            <p class="small">Uptime: {{ time.uptime }} seconds</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: mapState({
        time: state => state.time
    })
};
</script>