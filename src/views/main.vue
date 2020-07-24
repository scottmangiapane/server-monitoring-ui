<template>
    <div v-if="wsState === wsStates.OPEN" class="wrapper">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 offset-lg-1 col-md-8 offset-md-2">
                    <Info />
                    <Memory />
                </div>
                <div class="col-lg-5 offset-lg-0 col-md-8 offset-md-2">
                    <CpuUsage />
                    <Cpu />
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="wsState === wsStates.LOADING" class="center fill-screen">
        <LoadingGraphic size="lg" />
    </div>
    <div v-else-if="wsState === wsStates.ERROR" class="center fill-screen">
        <p>Could not connect to API server.</p>
    </div>
</template>

<script>
import LoadingGraphic from '@/components/loading-graphic.vue';
import Cpu from '@/views/main/cpu.vue';
import CpuUsage from '@/views/main/cpu-usage.vue';
import Info from '@/views/main/info.vue';
import Memory from '@/views/main/memory.vue';

export default {
    components: {
        Cpu,
        CpuUsage,
        Info,
        LoadingGraphic,
        Memory
    },
    created() {
        this.ws = new WebSocket(process.env.VUE_APP_WSS_API);
        this.wsState = this.wsStates.LOADING;
        this.ws.onclose = (event) => {
            this.wsState = this.wsStates.ERROR;
        };
        this.ws.onerror = (event) => {
            this.wsState = this.wsStates.ERROR;
        };
        this.ws.onmessage = (event) => {
            this.wsState = this.wsStates.OPEN;
            const { info, cpu, memory } = JSON.parse(event.data);
            this.$store.dispatch('setInfo', info);
            this.$store.dispatch('setCpu', cpu);
            this.$store.dispatch('setMemory', memory);
        };
    },
    data() {
        return {
            ws: null,
            wsState: 0,
            wsStates: {
                ERROR: 0,
                LOADING: 1,
                OPEN: 2
            }
        };
    }
};
</script>
