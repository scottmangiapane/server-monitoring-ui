<template>
    <div class="card">
        <div v-if="info">
            <div class="inline">
                <img src="@/assets/logo.svg" alt="Server" height="64px" width="64px" />
            </div>
            <div class="inline">
                <div class="text-left">
                    <h2>{{ info.hostname }}</h2>
                    <p>{{ info.ip }}</p>
                </div>
            </div>
            <div class="spacer"></div>
            <hr/>
            <div class="spacer"></div>
            <div class="inline">
                <p class="text-small">DISTRO</p>
                <p class="text-dark">{{ info.distro }}</p>
                <p class="text-small">RELEASE</p>
                <p class="text-dark">{{ info.release }}</p>
            </div>
            <div class="inline">
                <p class="text-small">KERNEL</p>
                <p class="text-dark">{{ info.kernel }}</p>
                <p class="text-small">ARCH</p>
                <p class="text-dark">{{ info.arch }}</p>
            </div>
        </div>
        <LoadingGraphic v-else size="sm" />
    </div>
</template>

<script>
import ApiService from '@/api-service';
import LoadingGraphic from '@/components/loading-graphic.vue';

export default {
    components: {
        LoadingGraphic
    },
    async created() {
        this.info = await ApiService.getStatic();
    },
    data() {
        return {
            info: null
        };
    }
};
</script>