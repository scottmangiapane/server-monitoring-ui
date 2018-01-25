const socket = io();

socket.on('update', (data) => {
	app.address = data.address;
	app.loadavg = data.loadavg;
	app.memory = data.memory;
});

var app = new Vue({
	el: '#app',
	data: {
		address: 'Loading...',
		loadavg: 0,
		memory: 0
	}
})
