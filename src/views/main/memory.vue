<template>
    <div class="card">
        <p class="dark">Memory Usage</p>
        <div>
            <div class="spacer"></div>
            <p class="small left">MEMORY</p>
            <p class="small right">{{ memUsed }} / {{ memTotal }} MB</p>
            <div class="clearfix"></div>
            <div class="bar-wrapper">
                <div class="bar" v-bind:style="{ width: this.memPercent + '%' }"></div>
            </div>
        </div>
        <div v-if="swapTotal > 0">
            <div class="spacer"></div>
            <p class="small left">SWAP</p>
            <p class="small right">{{ swapUsed }} / {{ swapTotal }} MB</p>
            <div class="clearfix"></div>
            <div class="bar-wrapper">
                <div class="bar" v-bind:style="{ width: this.swapPercent + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: mapState({
        memUsed: state => state.memory.memUsed,
        memTotal: state => state.memory.memTotal,
        memPercent() { return 100 * this.memUsed / this.memTotal; },
        swapUsed: state => state.memory.swapUsed,
        swapTotal: state => state.memory.swapTotal,
        swapPercent() { return 100 * this.swapUsed / this.swapTotal; }
    })
};
</script>
