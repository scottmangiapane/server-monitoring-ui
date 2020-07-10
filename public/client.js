// set up vue.js

const app = new Vue({
	el: '#app',
	data: {
		online: true,
		cores: [],
		loadavg: [],
		temp: 0,
		memUsed: 0,
		memTotal: 0,
		swapUsed: 0,
		swapTotal: 0
	}
});

// set up chart

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			borderWidth: 2,
			label: '',
			backgroundColor: 'rgba(76, 175, 80, 0.4)',
			borderColor: 'rgba(76, 175, 80, 1)',
			data: [],
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

// set up websockets

const socket = io({ path: '/socket.io' });

socket.on('connect', () => {
	app.online = true;
});

socket.on('disconnect', () => {
	app.online = false;
});

socket.on('update', (data) => {
	app.cores = data.cores;
	app.loadavg = data.loadavg;
	app.temp = data.temp;
	app.memUsed = data.memUsed;
	app.memTotal = data.memTotal;
	app.swapUsed = data.swapUsed;
	app.swapTotal = data.swapTotal;
	chart.data.datasets[0].data = data.nodes;
	chart.data.labels = [];
	for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
		chart.data.labels.unshift(Date.now() - i * 1000);
	}
	chart.update();
});
