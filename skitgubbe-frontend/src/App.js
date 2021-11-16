import React from 'react';
import './App.css';
import * as g from "./Game.js";
import {PlayingCard} from "./PlayingCard";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: new g.Game(),
            player: 1,
            text: "",
            myupdate: false,
            invalidMove: false
        };
        this.state.game.shuffle();
        this.state.game.distributeAllCards();
        this.handleChatInputChange = this.handleChatInputChange.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleCardTouchStart = this.handleCardTouchStart.bind(this);
        this.turnOffInvalidMove = this.turnOffInvalidMove.bind(this);
        this.handleDownReset = this.handleDownReset.bind(this);
        this.handleTouchReset = this.handleTouchReset.bind(this);

        this.isTouchDevice = false;
        this.sendEventUpdates = false;
    }

    handleDownReset() {
        if (this.isTouchDevice) {
            return;
        }
        this.doHandleReset();
    }

    handleTouchReset() {
        this.isTouchDevice = true;
        this.doHandleReset();
    }

    doHandleReset() {
        this.setState(prevState => {
            let game = new g.Game();
            game.shuffle();
            game.distributeAllCards();
            return {game: game, myupdate: true};
        });
    }

    componentDidMount() {
        this.ws = new WebSocket("ws://localhost:1337");

        this.ws.onmessage = event => {
            const message = event.data;
            if (message.includes("event")) {
                console.log(message);
                return;
            }
            let object = JSON.parse(message);
            if (object.url === "/getgamestate") {
                let message = {
                    "url": "/gamestate",
                    "object": this.state.game.state
                }
                this.ws.send(JSON.stringify(message));
            }
            if (object.url === "/gamestate") {
                this.setState(prevState => {
                    return { game: new g.Game(JSON.stringify(object.object)), myupdate: false };
                });
            }
            if (object.url === "/text") {
                this.setState(prevState => {
                    return { text: object.object, myupdate: false };
                });
            }
            if (object.url === "/player") {
                this.setState(prevState => {
                    return { player: object.object, myupdate: false };
                });
            }
        };

        this.ws.onopen = event => {
            console.log("Open connection");
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.sendEventUpdates) {
            return;
        }
        if (this.state.myupdate) {
            if (prevState.game.toJson() !== this.state.game.toJson()) {
                console.log("send cards");
                let message = {
                    "url": "/gamestate",
                    "object": this.state.game.state
                }
                this.ws.send(JSON.stringify(message));
            }
            if (JSON.stringify(prevState.text) !== JSON.stringify(this.state.text)) {
                console.log("send text");
                let message = {
                    "url": "/text",
                    "object": this.state.text
                }
                this.ws.send(JSON.stringify(message));
            }
        }
    }

    sendEventUpdate(description) {
        if (!this.sendEventUpdates) {
            return;
        }
        console.log("send event update");
        let message = {
            "url": "/event",
            "object": description
        }
        this.ws.send(JSON.stringify(message));
    }

    handleDown(type, id) {
        if (this.isTouchDevice) {
            return;
        }
        console.log("handleDown: " + id);
        this.doHandleDownOnDeck(type, id);
    }
    handleCardTouchStart(type, id) {
        this.isTouchDevice = true;
        console.log("handleCardTouchStart: " + id);
        this.doHandleDownOnDeck(type, id);
    }

    turnOffInvalidMove() {
        this.setState( prevState => {
            return {invalidMove: false};
        });
    }

    doHandleDownOnDeck(type, id) {
        let cardId = id;
        let cardType = type;
        this.setState(prevState => {
            let game = new g.Game(prevState.game.toJson());
            let moveOk = game.playCard(cardType, cardId, this.state.player);
            if (moveOk) {
                return {game: game, myupdate: true};
            } else {
                setTimeout( () => {
                   this.turnOffInvalidMove();
                }, 2000);
                return {invalidMove: true};
            }
        });
    }


    handleChatInputChange(event) {
        event.preventDefault();
        this.setState({ text: event.target.value, myupdate: true });
    }



    render() {
        let cards = [];
        this.addCards(cards, this.state.game.state.cards.deck, 100, "DECK", this.state.player);
        this.addCards(cards, this.state.game.state.cards.table, 200, "TABLE", this.state.player);
        this.addCards(cards, this.state.game.state.cards.player1hand, 300, "PLAYER1HAND", this.state.player);
        this.addCards(cards, this.state.game.state.cards.player1table, 400, "PLAYER1TABLE", this.state.player);
        this.addCards(cards, this.state.game.state.cards.player2hand, 500, "PLAYER2HAND", this.state.player);
        this.addCards(cards, this.state.game.state.cards.player2table, 600, "PLAYER2TABLE", this.state.player);
        this.addCards(cards, this.state.game.state.cards.tableturnedaway, 700, "TABLETURNEDAWAY", this.state.player);

        let invalidMoveStr = "false";
        let canvasStyle = {
            width: "100vw",
            height: "100vh"
        }
        let canvasCardsStyle = {
            width: "391px",
            height: "396px"
        }

        if (this.state.invalidMove) {
            invalidMoveStr = "true";
            canvasCardsStyle.borderStyle = "solid";
            canvasCardsStyle.borderWidth = "5px";
            canvasCardsStyle.borderColor = "red";
        }

        let message = "Du är spelare " + this.state.player + " . Det är spelare " + this.state.game.state.activePlayer + " tur.";

        if (this.state.game.state.winner !== null) {
            message = "Player " + this.state.game.state.winner + " wins!";
        }

        return (
            <div style={canvasStyle} >
                <div id="canvas-player">
                    {message}
                </div>
                <div style={{borderStyle: "solid", userSelect: "none"}} onMouseDown={this.handleDownReset} onTouchStart={this.handleTouchReset}>Reset</div>
                <div id="canvas-chat">
                    <form>
                        <input id="chat-input" onChange={this.handleChatInputChange} value={this.state.text}/>
                    </form>
                </div>
                <div id="canvas-cards" style={canvasCardsStyle}>
                    {cards}
                </div>
                <div>
                    Invalid move: {invalidMoveStr}
                </div>
            </div>
        );
    }

    addCards(cards, newCards, keyOffset, cardType, player) {
        cards.push(...newCards.map((card, index) =>
            <PlayingCard key={(keyOffset + index).toString()}
                         id={index.toString()}
                         color={card.color} value={card.value} up={card.up} player={player}
                         type={cardType} count={newCards.length}
                         handleDown={this.handleDown}
                         handleCardTouchStart={this.handleCardTouchStart}
            />));
    }
}

export default App;
