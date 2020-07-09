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

process.on('SIGINT', function() {
	db.stop(function(err) {
		process.exit(err ? 1 : 0);
	});
});

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

if (process.env.HIDE_IP !== 'true') {
	publicIp.v4().then(ip => {
		info.ip = ip;
	});
}

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
	// CPU cores
	data.cores = os.cpus().length;
	// load average
	data.loadavg = os.loadavg();
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
