<template>
    <div class="card card-no-padding">
        <p class="dark" v-if="temp > 0">CPU Usage ({{ temp }}°C)</p>
        <p class="dark" v-else>CPU Usage</p>
        <div class="spacer"></div>
        <canvas id="cpu-graph"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';
import { mapState } from 'vuex';

export default {
    computed: mapState({
        labels(state) {
            const labels = [];
            for (let i = 0; i < state.cpu.nodes.length; i++) {
                labels.unshift(Date.now() - i * 1000);
            }
            return labels;
        },
        nodes: state => state.cpu.nodes,
        temp: state => state.cpu.temp
    }),
    methods: {
        drawChart() {
            const ctx = document.getElementById('cpu-graph');
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [{
                        backgroundColor: 'rgba(76, 175, 80, 0.4)',
                        borderColor: 'rgba(76, 175, 80, 1)',
                        borderWidth: 2,
                        data: this.nodes,
                        label: '',
                        pointRadius: 0
                    }]
                },
                options: {
                    animation: false,
                    events: [],
                    legend: {
                        display: false
                    },
                    layout: {
                        padding: {
                            left: 24,
                            right: 32
                        }
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontFamily: 'Roboto',
                                maxRotation: 0
                            },
                            time: {
                                displayFormats: {
                                    minute: 'h:mm:ss a'
                                },
                                unit: 'minute',
                                unitStepSize: 0.25
                            },
                            type: 'time'
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: (value) => {
                                    if (value % 1 === 0) {
                                        return value + '%';
                                    }
                                },
                                fontFamily: 'Roboto',
                                maxTicksLimit: 6,
                                suggestedMax: 100
                            }
                        }]
                    }
                }
            });
        }
    },
    mounted() {
        this.drawChart();
    },
    watch: {
        nodes() {
            this.drawChart()
        }
    }
};
</script>
