const fs = require('fs'),
	http = require('http'),
	WebSocket = require('ws')
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({
    port: PORT, perMessageDeflate: false
});

wss.connectionCount = 0;
wss.on('connection', function(socket, upgradeReq) {
	wss.connectionCount++;
	socket.on('close', function(code, message){
		wss.connectionCount--;
	});
});
wss.broadcast = function(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
var picamStreamServer = http.createServer((req, res) => {
    res.connection.setTimeout(0);
    res.on('data', data => {
		wss.broadcast(data);
		if (req.socket.recording) {
			req.socket.recording.write(data);
		}
	});
}).listen(8081)