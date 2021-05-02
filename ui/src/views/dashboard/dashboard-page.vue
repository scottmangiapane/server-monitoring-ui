<template>
    <div v-if="connectionState === states.LOADING" class="center">
        <LoadingGraphic size="lg" />
    </div>
    <div v-else-if="connectionState === states.OPEN" class="row">
        <div class="col-lg-5 offset-lg-1 col-md-8 offset-md-2">
            <Info />
            <Memory />
            <Time />
        </div>
        <div class="col-lg-5 offset-lg-0 col-md-8 offset-md-2">
            <!-- <CpuUsage /> -->
            <Cpu />
        </div>
    </div>
</template>

<script>
import ApiService from '@/api-service';
import LoadingGraphic from '@/components/loading-graphic.vue';
import Cpu from '@/views/dashboard/cpu.vue';
// import CpuUsage from '@/views/dashboard/cpu-usage.vue';
import Info from '@/views/dashboard/info.vue';
import Memory from '@/views/dashboard/memory.vue';
import Time from '@/views/dashboard/time.vue';

export default {
    beforeDestroy() {
        clearInterval(this.pollInterval);
    },
    components: {
        Cpu,
        // CpuUsage,
        Info,
        LoadingGraphic,
        Memory,
        Time
    },
    async created() {
        try {
            await this.loadStatic();
            await this.loadDynamic();
            this.connectionState = this.states.OPEN;
        } catch (err) {
            this.connectionState = this.states.ERROR;
        }
        this.pollInterval = setInterval(this.loadDynamic, 1000);
    },
    data() {
        return {
            connectionState: 0,
            pollInterval: null,
            states: {
                LOADING: 0,
                ERROR: 1,
                OPEN: 2,
            }
        };
    },
    methods: {
        async loadStatic() {
            const data = await ApiService.getStatic();
            this.$store.dispatch('setInfo', data);
        },
        async loadDynamic() {
            try {
                const { cpu, memory, time } = await ApiService.getDynamic();
                this.$store.dispatch('setCpu', cpu);
                this.$store.dispatch('setMemory', memory);
                this.$store.dispatch('setTime', time);
                this.connectionState = this.states.OPEN;
            } catch (err) {
                this.connectionState = this.states.ERROR;
            }
        }
    }
};
</script>

<style scoped>
::v-deep .card {
    margin-bottom: 32px;
    text-align: center;
}

@media only screen and (max-width: 575px) {
    ::v-deep .card {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0;
        box-shadow: none;
        padding: 32px 0;
    }

    ::v-deep { margin-bottom: 0; }

    ::v-deep hr { display: none; }
}
</style>