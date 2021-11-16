export class Game {
    constructor(json = "") {
        if(json === "") {
            let deck = Game.generate52Cards();
            this.state = {
                cards: {
                    deck: deck,
                    table: [],
                    tableturnedaway: [],
                    player1table: [],
                    player1hand: [],
                    player2table: [],
                    player2hand: []
                }, activePlayer: 1,
                winner: null
            };
        } else {
            let obj = JSON.parse(json);
            this.state = obj;
        }
    }

    distributeAllCards() {
        this.distributeCards(this.state.cards.deck, this.state.cards.player1table, 3, false);
        this.distributeCards(this.state.cards.deck, this.state.cards.player1hand, 3, true);
        this.distributeCards(this.state.cards.deck, this.state.cards.player2table, 3, false);
        this.distributeCards(this.state.cards.deck, this.state.cards.player2hand, 3, true);
    }

    distributeCards(from, to, count, up) {
        let cardsToMove = from.slice(0, count);
        cardsToMove.forEach(card => {card.up = up;});
        to.push(...cardsToMove);
        from.splice(0, count);
    }

    playCardPlayerHand(player, expectedPlayer, cards, cardId) {
        if (player !== expectedPlayer) {
            return false;
        }
        if (!this.canPutCardOnTable(cards[cardId].value)) {
            return false;
        }
        let activePlayer = this.state.activePlayer;
        this.moveCardToTable(cards, cardId);
        if (activePlayer !== this.state.activePlayer && cards.length < 3) {
            this.pickupCardsFromDeck(cards);
        }
        return true;
    }

    playCardPlayerTable(player, expectedPlayer, cardsHand, cardsTable, cardId) {
        if (player !== expectedPlayer) {
            return false;
        }
        if (cardsHand.length > 0) {
            return false;
        }

        let cardToMove = cardsTable[cardId];

        if(cardToMove.up === false) {
            cardToMove.up = true;
            return true;
        }

        if (!this.canPutCardOnTable(cardToMove.value)) {
            return false;
        }

        this.moveCardToTable(cardsTable, cardId);
        return true;
    }

    playCard(type, cardId, player) {
        let playCardValid = true;
        if (player !== this.state.activePlayer) {
            playCardValid = false;
            return playCardValid;
        }

        switch (type) {
            case 'PLAYER1HAND':
                if (!this.playCardPlayerHand(player, 1, this.state.cards.player1hand, cardId)) {
                    playCardValid = false;
                }
                break;
            case 'PLAYER2HAND':
                if (!this.playCardPlayerHand(player, 2, this.state.cards.player2hand, cardId)) {
                    playCardValid = false;
                }
                break;
            case 'PLAYER1TABLE':
                if (!this.playCardPlayerTable(player, 1, this.state.cards.player1hand, this.state.cards.player1table, cardId)) {
                    playCardValid = false;
                }
                break;
            case 'PLAYER2TABLE':
                if (!this.playCardPlayerTable(player, 2, this.state.cards.player2hand, this.state.cards.player2table, cardId)) {
                    playCardValid = false;
                }
                break;
            case 'TABLE':
                this.playCardTable(player);
                break;
            case 'DECK':
                this.playCardDeck(cardId, player);
                break;
            default:
                console.log(`Invalid type: ${type}`);
        }

        this.checkForWinner();
        return playCardValid;
    }

    playCardDeck(cardId, player) {
        let topCardDeck = this.state.cards.deck[cardId];

        if (topCardDeck.up === false) {
            topCardDeck.up = true;
            return;
        }

        if (this.canPutCardOnTable(topCardDeck.value)) {
            this.moveCardToTable(this.state.cards.deck, cardId);
            return;
        }

        let topCardDeckCopy = JSON.parse(JSON.stringify(topCardDeck));
        this.state.cards.deck.splice(cardId, 1);
        let cardsOnTable = JSON.parse(JSON.stringify(this.state.cards.table));

        if (player === 1) {
            this.state.cards.player1hand.push(topCardDeckCopy);
            this.state.cards.player1hand.push(...cardsOnTable);
        } else {
            this.state.cards.player2hand.push(topCardDeckCopy);
            this.state.cards.player2hand.push(...cardsOnTable);
        }
        this.state.cards.table = [];
        this.changeActivePlayer();
    }

    checkForWinner() {
        if (this.state.cards.player1hand.length === 0 && this.state.cards.player1table.length === 0) {
            this.state.winner = 1;
        }

        if (this.state.cards.player2hand.length === 0 && this.state.cards.player2table.length === 0) {
            this.state.winner = 2;
        }
    }

    playCardTable(player) {
        let cardsOnTable = JSON.parse(JSON.stringify(this.state.cards.table));
        if (player === 1) {
            this.state.cards.player1hand.push(...cardsOnTable);
        } else {
            this.state.cards.player2hand.push(...cardsOnTable);
        }
        this.state.cards.table = [];
        this.changeActivePlayer();
    }

    pickupCardsFromDeck(cards) {
        let numberOfCardsFromDeck = 3 - cards.length;
        let cardsFromDeck = JSON.parse(JSON.stringify(this.state.cards.deck.slice(0, numberOfCardsFromDeck)));
        this.state.cards.deck.splice(0, numberOfCardsFromDeck);
        cards.push(...cardsFromDeck);
        cards.forEach(card => {card.up = true;});
    }

    moveCardToTable(cards, cardId) {
        let cardToMove = JSON.parse(JSON.stringify(cards[cardId]));
        cards.splice(cardId, 1);
        this.state.cards.table.unshift(cardToMove);
        if (this.state.cards.table[0].value === 2) {
            return;
        }
        if (this.state.cards.table[0].value === 10) {
            let cardsOnTable = JSON.parse(JSON.stringify(this.state.cards.table));
            this.state.cards.tableturnedaway.push(...cardsOnTable);
            this.state.cards.tableturnedaway.forEach(card => { card.up = false; });
            this.state.cards.table = [];
        }
        this.changeActivePlayer();
    }

    canPutCardOnTable(value) {
        if (this.state.cards.table.length === 0) {
            return true;
        }
        if (value === 2) {
            return true;
        }
        if (value === 10) {
            return true;
        }
        if (value >= this.state.cards.table[0].value) {
            return true;
        }
        return false;
    }

    toJson() {
        return JSON.stringify(this.state);
    }

    shuffle() {
        this.state.cards.deck.sort(() => Math.random() - 0.5);
    }

    changeActivePlayer() {
        if (this.state.activePlayer === 1) {
            this.state.activePlayer = 2;
        } else {
            this.state.activePlayer = 1;
        }
    }

    static nextColor(currentColor) {
        if(currentColor === "hearts") {
            return "clubs";
        }
        if(currentColor === "clubs") {
            return "spades";
        }
        if(currentColor === "spades") {
            return "diamonds";
        }
        return "";
    }

    static generate52Cards() {
        let cards = [];
        let color = "hearts";
        let value = 2;

        for(let i=0; i<52; i++) {
            cards.push({color: color, value:value, up:false});
            value += 1;
            if(value === 15) {
                color = this.nextColor(color);
                value = 2;
            }
        }

        return cards;
    }
}
