require('dotenv').config();

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
		arch: info.arch,
		distro: info.distro,
		hostname: info.hostname,
		release: info.release,
		kernel: info.kernel
	});
});

app.get('*', (req, res) => {
	res.status(404).render('404');
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
	console.log(`Server running on ${ port }`);
});

// setup websockets

let clients = {};
let data = {};

const io = socket(httpServer, { cookie: false, path: '/socket.io' });

io.on('connection', client => {
	client.emit('update', data);
	clients[client.id] = client;
	client.on('diconnect', () => {
		delete clients[client.id];
	});
});

// build static info object

info.hostname = os.hostname();

if (process.env.HIDE_IP !== 'true') {
	publicIp.v4().then(ip => {
		info.ip = ip;
	});
}

si.osInfo(o => {
	info.arch = o.arch;
	info.distro = o.distro;
	info.release = o.release;
	info.kernel = o.kernel;
});

// build dynamic data object

const nodes = [];

setInterval(() => {
	// CPU cores
	data.cores = os.cpus().map(c => c.speed);
	// CPU load average
	data.loadavg = os.loadavg();
	// CPU usage
	const ps = spawn('sh', [
		'-c',
		'top -bn1 | '
			+ 'grep "Cpu(s)" | '
			+ 'sed "s/.*, *\\([0-9.]*\\)%* id.*/\\1/" | '
			+ 'awk "{print 100 - \\$1}"'
	]);
	ps.stdout.on('data', value => {
		while (nodes.length >= 60) {
			nodes.shift();
		}
		nodes.push(parseFloat(value));
	});
	data.nodes = nodes;
	// CPU temperature
	si.cpuTemperature(o => {
		o.main = Math.round(o.main);
		data.temp = o.main;
	});
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
