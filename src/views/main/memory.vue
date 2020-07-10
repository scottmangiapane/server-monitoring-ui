<template>
    <div class="card" v-if="memTotal &gt; 0 || swapTotal &gt; 0">
        <p class="dark">Memory Usage</p>
        <div v-if="memTotal &gt; 0">
            <div class="spacer"></div>
            <p class="small left">MEMORY</p>
            <p class="small right">{{ memUsed }} / {{ memTotal }} MB</p>
            <div class="clearfix"></div>
            <div class="bar-wrapper">
                <div class="bar" v-bind:style="{ width: (100 * memUsed / memTotal) + &quot;%&quot; }"></div>
            </div>
        </div>
        <div v-if="swapTotal &gt; 0">
            <div class="spacer"></div>
            <p class="small left">SWAP</p>
            <p class="small right">{{ swapUsed }} / {{ swapTotal }} MB</p>
            <div class="clearfix"></div>
            <div class="bar-wrapper">
                <div class="bar" v-bind:style="{ width: (100 * swapUsed / swapTotal) + &quot;%&quot; }"></div>
            </div>
        </div>
    </div>
</template>