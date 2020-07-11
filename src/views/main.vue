<template>
    <div v-if="online" class="container">
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
    <div v-else class="center fill-screen">
        <LoadingGraphic size="lg" />
    </div>
</template>

<script>
import LoadingGraphic from '@/components/loading-graphic.vue';
import Cpu from '@/views/main/cpu.vue';
import CpuUsage from '@/views/main/cpu-usage.vue';
import Info from '@/views/main/info.vue';
import Memory from '@/views/main/memory.vue';

export default {
    created() {
        console.log(`Connecting to WS server ${ process.env.VUE_APP_WSS_API }`);
        this.connection = new WebSocket(process.env.VUE_APP_WSS_API);
        this.connection.onopen = (event) => {
            console.log('WS connection opened');
        };
        this.connection.onclose = (event) => {
            console.log('WS connection closed');
            this.online = false;
        };
        this.connection.onmessage = (event) => {
            const { info, cpu, memory } = JSON.parse(event.data);
            this.$store.dispatch('setInfo', info);
            this.$store.dispatch('setCpu', cpu);
            this.$store.dispatch('setMemory', memory);
            this.online = true;
        };
        this.connection.onerror = (event) => {
            console.log('WS error');
        };
    },
    components: {
        Cpu,
        CpuUsage,
        Info,
        LoadingGraphic,
        Memory
    },
    data() {
        return {
            connection: null,
            online: false
        };
    }
};
</script>
