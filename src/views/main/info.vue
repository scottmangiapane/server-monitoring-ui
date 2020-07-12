<template>
    <div class="card">
        <div v-if="info">
            <div class="inline">
                <img src="@/assets/logo.svg" alt="Server" height="64px" width="64px" />
            </div>
            <div class="inline">
                <div class="left-text">
                    <h2>{{ info.hostname }}</h2>
                    <p>{{ info.ip }}</p>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="spacer"></div>
            <hr/>
            <div class="spacer"></div>
            <div class="inline">
                <p class="small">DISTRO</p>
                <p class="dark left">{{ info.distro }}</p>
                <div class="clearfix"></div>
                <p class="small">RELEASE</p>
                <p class="dark left">{{ info.release }}</p>
                <div class="clearfix"></div>
            </div>
            <div class="inline">
                <p class="small">KERNEL</p>
                <p class="dark left">{{ info.kernel }}</p>
                <div class="clearfix"></div>
                <p class="small">ARCH</p>
                <p class="dark left">{{ info.arch }}</p>
                <div class="clearfix"></div>
            </div>
        </div>
        <LoadingGraphic v-else size="sm" />
    </div>
</template>

<script>
import APIService from '@/api-service';
import LoadingGraphic from '@/components/loading-graphic.vue';

export default {
    components: {
        LoadingGraphic
    },
    async created() {
        this.info = await APIService.getInfo();
    },
    data() {
        return {
            info: null
        };
    }
};
</script>