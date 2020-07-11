<template>
    <div class="card">
        <div class="inline"><img src="/img/logo.svg" alt="Server" height="64px" width="64px" /></div>
        <div class="inline">
            <div class="left-text">
                <h2>Gemini</h2>
                <p>127.0.0.1</p>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="spacer"></div>
        <hr/>
        <div class="spacer"></div>
        <div class="inline">
            <p class="small">DISTRO</p>
            <p class="dark left">{{ distro }}</p>
            <div class="clearfix"></div>
            <p class="small">RELEASE</p>
            <p class="dark left">{{ release }}</p>
            <div class="clearfix"></div>
        </div>
        <div class="inline">
            <p class="small">KERNEL</p>
            <p class="dark left">{{ kernel }}</p>
            <div class="clearfix"></div>
            <p class="small">ARCH</p>
            <p class="dark left">{{ arch }}</p>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arch: null,
            distro: null,
            kernel: null,
            release: null
        };
    }
};
</script>