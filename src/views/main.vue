<template>
    <div v-if="online" class="container">
        <div class="row">
            <div class="col-lg-5 offset-lg-1 col-md-8 offset-md-2">
                <Info />
                <Memory />
            </div>
            <div class="col-lg-5 offset-lg-0 col-md-8 offset-md-2">
                <CpuUsage />
                <Cores />
            </div>
        </div>
    </div>
    <div v-else class="center fill-screen">
        <LoadingGraphic size="lg" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadingGraphic from '@/components/loading-graphic.vue';
import Cores from '@/views/main/cores.vue';
import CpuUsage from '@/views/main/cpu-usage.vue';
import Info from '@/views/main/info.vue';
import Memory from '@/views/main/memory.vue';

export default {
    components: {
        Cores,
        CpuUsage,
        Info,
        LoadingGraphic,
        Memory
    },
    computed: {
        online() {
            return true;
        }
    }
}
</script>