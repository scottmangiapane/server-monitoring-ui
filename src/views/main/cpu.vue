<template>
    <div class="card">
        <p class="dark">Load Average</p>
        <div class="spacer"></div>
        <div class="inline">
            <p>{{ Math.round(loadavg[0] * 100) / 100 }}</p>
            <p class="small">1 MINUTE</p>
        </div>
        <div class="inline">
            <p>{{ Math.round(loadavg[1] * 100) / 100 }}</p>
            <p class="small">5 MINUTES</p>
        </div>
        <div class="inline">
            <p>{{ Math.round(loadavg[2] * 100) / 100 }}</p>
            <p class="small">15 MINUTES</p>
        </div>
        <div class="spacer"></div>
        <hr/>
        <div class="spacer"></div>
        <p class="dark">Core Speeds</p>
        <div class="spacer"></div>
        <div class="inline" v-for="(core, i) in cores">
            <div class="bordered">
                <p class="small">{{ (core / 1000).toFixed(2) }} GHz</p>
            </div>
            <div class="spacer"></div>
        </div>
        <div class="spacer-negative"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: mapState({
        cores: state => state.cpu.cores,
        loadavg: state => state.cpu.loadavg
    })
};
</script>
