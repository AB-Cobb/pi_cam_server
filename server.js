
const { Server } = require('ws');
const express = require ('express')
const PORT = process.env.PORT || 3000;
const app = express()
server = app.listen(PORT)
const wss = new Server({ server });

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

app.POST("/streamin", (req, res) => {
    res.connection.setTimeout(0);
    res.on('data', data => {
		wss.broadcast(data);
		if (req.socket.recording) {
			req.socket.recording.write(data);
		}
	});
})

app.get ('/', (req, res) => {
    res.render('index')
})
