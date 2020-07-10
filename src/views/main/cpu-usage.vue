<template>
    <div class="card card-no-padding">
        <p class="dark" v-if="temp &gt; 0">CPU Usage ({{ temp }}°C)</p>
        <p class="dark" v-else>CPU Usage</p>
        <div class="spacer"></div><canvas id="chart"></canvas>
    </div>
</template>