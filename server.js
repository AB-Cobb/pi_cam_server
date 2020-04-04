
const { Server, WebSocket } = require('ws');
const express = require ('express')
const PORT = process.env.PORT || 3000;
const app = express()
server = app.listen(PORT)
const wss = new Server({ server });
const http = require('http')


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

app.post("/streamin", (req, res) => {
    console.log("pi can stream incoming")
    res.connection.setTimeout(0);
    req.on('data', data => {
        console.log("pi cam data")
		wss.broadcast(data);
		if (req.socket.recording) {
			req.socket.recording.write(data);
		}
    });
    req.on('end',function(){
		console.log('close');
		if (req.socket.recording) {
			req.socket.recording.close();
        }
    });
})//*/

app.get ('/', (req, res) => {
    res.sendFile("index.html", { root: __dirname })
})
