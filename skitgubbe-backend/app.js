var SkitgubbeWebsocketServer = require("./skitgubbe-websocket-server.js");
var http = require('http');

// Callbacks for http server
var handleHttpServerRequest = function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
}

// Create http server
var server = http.createServer(handleHttpServerRequest);
server.listen(1337, function() { });

skitgubbeWebsocket = new SkitgubbeWebsocketServer(server);
