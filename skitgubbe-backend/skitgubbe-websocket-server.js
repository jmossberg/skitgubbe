var WebSocketServer = require('websocket').server;

class SkitgubbeWebsocketServer {

    constructor(server) {
        this.myconnections = [];
        this.wsServer = new WebSocketServer({httpServer: server});
        this.wsServer.on('connect', this.wsServerHandleConnect);
        this.wsServer.on('close', this.wsServerHandleClose);
        this.wsServer.on('request', this.wsServerHandleRequest);
        this.lastText = {};
        this.lastGameState = {};
        this.player = 1;
    }

    wsServerHandleClose = (connection, closeReason, description) => {
        console.log("[server] close connection");
        const index = this.myconnections.indexOf(connection);
        if (index > -1) {
            console.log("Matching connection at index " + index);
            this.myconnections.splice(index, 1);
        }
    }

    isNotEmpty(obj) {
        return Object.keys(obj).length > 0;
    }

    wsServerHandleConnect = (connection) => {
        console.log("new connection " + this.myconnections.length);
        this.myconnections.push(connection);
        if (this.isNotEmpty(this.lastGameState)) {
            let message = {
                "url": "/gamestate",
                "object": this.lastGameState
            };
            connection.send(JSON.stringify(message));
        } else {
            console.log("request gamestate");
            let message = {
                "url": "/getgamestate",
                "object": {}
            };
            connection.send(JSON.stringify(message));
        }
        if (this.isNotEmpty(this.lastText)) {
            let message = {
                "url": "/text",
                "object": this.lastText
            };
            connection.send(JSON.stringify(message));
        }
        let message = {
            "url": "/player",
            "object": this.player
        };
        connection.send(JSON.stringify(message));
        if (this.player === 1) {
            this.player = 2;
        } else {
            this.player = 1;
        }
    }

    wsServerHandleRequest = (request) => {
        let connection = request.accept(null, request.origin);
        connection.on('message', this.makeWsConnectionMessageHandler());
        connection.on('close', this.makeWsConnectionCloseHandler());
    }

    makeWsConnectionMessageHandler = () => {
        let connections = this.myconnections;
        return (message) => {
            if (message.type === 'utf8') {
                let object = JSON.parse(message.utf8Data);
                if (object.url === "/gamestate") {
                    this.lastGameState = JSON.parse(JSON.stringify(object.object));
                }
                if (object.url === "/text") {
                    this.lastText = JSON.parse(JSON.stringify(object.object))
                }

                if (object.url === "/event") {
                    console.log("event: " + object.object)
                }

                connections.forEach(connection => {
                    if(this != connection) {
                        connection.send(message.utf8Data);
                    }
                });
            }
        }
    }

    makeWsConnectionCloseHandler() {
        return function(connection) {
            console.log("[connection] close connection");
        }
    }
}

module.exports = SkitgubbeWebsocketServer;
