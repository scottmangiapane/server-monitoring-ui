// set up vue.js

const app = new Vue({
	el: '#app',
	data: {
		address: 'Loading...',
		loadavg: 0,
		memory: 0,
	}
})

// set up chart

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: '',
			data: []
		}]
	},
	options: {
		legend: {
			display: false,
		},
		responsive: true,
		scales: {
			xAxes: [{
				display: false
			}],
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
});

// set up websockets

const socket = io();

socket.on('update', (data) => {
	app.address = data.address;
	app.loadavg = data.loadavg;
	app.memory = data.memory;
	if (chart.data.datasets[0].data.length > 20) {
		chart.data.labels.shift();
		chart.data.datasets[0].data.shift();
	}
	chart.data.labels.push('');
	chart.data.datasets[0].data.push(data.node);
	chart.update();
});
