const { spawn } = require('child_process');
const express = require('express');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const publicIp = require('public-ip');
const socket = require('socket.io');
const si = require('systeminformation');

let info = {};

// run webserver

const app = express();
const httpServer = http.createServer(app);

app.use('/', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('index', {
		address: info.ip,
		distro: info.distro,
		release: info.release,
		kernel: info.kernel,
		arch: info.arch
	});
});

app.get('*', (req, res) => {
	res.status(404).render('404');
});

httpServer.listen(8008, () => {
	console.log('Server running on 8008');
});

// setup websockets

let clients = {};
let data = {};

const io = socket(httpServer, { path: '/socket.io' });

io.on('connection', client => {
	client.emit('update', data);
	clients[client.id] = client;
	client.on('diconnect', () => {
		delete clients[client.id];
	});
});

// build static info object

publicIp.v4().then(ip => {
	info.ip = ip;
});

si.osInfo(o => {
	info.distro = o.distro;
	info.release = o.release;
	info.kernel = o.kernel;
	info.arch = o.arch;
});

// build dynamic data object

const nodes = [];

setInterval(() => {
	// CPU temperature
	si.cpuTemperature(o => {
		o.main = Math.round(o.main);
		data.temp = o.main;
	});
	// CPU usage
	const ps = spawn('sh', ['-c', 'top -bn1 | grep "Cpu(s)" | sed "s/.*, *\\([0-9.]*\\)%* id.*/\\1/" | awk "{print 100 - \\$1}"']);
	ps.stdout.on('data', value => {
		while (nodes.length >= 30) {
			nodes.shift();
		}
		nodes.push(parseFloat(value));
	});
	data.nodes = nodes;
	// load average
	const cpus = os.cpus();
	const loadavg = os.loadavg();
	for (const i in loadavg) {
		const value = Math.round(100 * loadavg[i] / cpus.length);
		loadavg[i] = { value: value };
	}
	loadavg[0].text = '1 minute';
	loadavg[1].text = '5 minutes';
	loadavg[2].text = '15 minutes';
	data.loadavg = loadavg;
	// memory
	si.mem(o => {
		data.memUsed = Math.round(o.active / 1000000);
		data.memTotal = Math.round(o.total / 1000000);
		data.swapUsed = Math.round(o.swapused / 1000000);
		data.swapTotal = Math.round(o.swaptotal / 1000000);
	});
	// send data to clients
	for (const key in clients) {
		clients[key].emit('update', data);
	}
}, 1000);
