
const { Server } = require('ws');
const express = require ('express')
const PORT = process.env.PORT || 3000;
const app = express()
server = app.listen(PORT)
const wss = new Server({ server });

wss.connectionCount = 0;
wss.on('connection', function(socket, upgradeReq) {
    wss.connectionCount++;
    console.log(
		'New WebSocket Connection: ', 
		(upgradeReq || socket.upgradeReq).socket.remoteAddress,
		(upgradeReq || socket.upgradeReq).headers['user-agent'],
		'('+wss.connectionCount+' total)'
	);
	socket.on('close', function(code, message){
        wss.connectionCount--;
        console.log(
			'Disconnected WebSocket ('+wss.connectionCount+' total)'
		);
	});
});
wss.broadcast = function(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

app.http("/streamin", (req, res) => {
    res.connection.setTimeout(0);
    res.on('data', data => {
        console.log("pi cam data")
		wss.broadcast(data);
		if (req.socket.recording) {
			req.socket.recording.write(data);
		}
	});
})

app.get ('/', (req, res) => {
    res.sendFile("index.html", { root: __dirname })
})
