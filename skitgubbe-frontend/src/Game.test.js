import * as game from "./Game.js";

function verifyAllColorsInDeck(g) {
    expect(g.state.cards.deck.filter(card => card.color === "hearts").length).toStrictEqual(13);
    expect(g.state.cards.deck.filter(card => card.color === "spades").length).toStrictEqual(13);
    expect(g.state.cards.deck.filter(card => card.color === "diamonds").length).toStrictEqual(13);
    expect(g.state.cards.deck.filter(card => card.color === "clubs").length).toStrictEqual(13);
}

test('construct game', () => {
    //Execute
    const g = new game.Game();

    //Verify
    expect(g.state.cards.deck.length).toStrictEqual(52);
    expect(JSON.stringify(g.state.cards.deck[0])).toStrictEqual(JSON.stringify(g.state.cards.deck[0]));
    expect(JSON.stringify(g.state.cards.deck[0])).not.toStrictEqual(JSON.stringify(g.state.cards.deck[1]));
    expect(JSON.stringify(g.state.cards.deck[12])).not.toStrictEqual(JSON.stringify(g.state.cards.deck[23]));
    verifyAllColorsInDeck(g);
});

test('distribute cards to players', () => {
    //Setup
    const g = new game.Game();

    //Execute
    g.distributeAllCards();

    //Verify
    expect(g.state.cards.player1hand.length).toStrictEqual(3);
    expect(g.state.cards.player1table.length).toStrictEqual(3);
    expect(g.state.cards.player2hand.length).toStrictEqual(3);
    expect(g.state.cards.player2table.length).toStrictEqual(3);
});

test('generate json from game state', () => {
    //Setup
    const g = new game.Game();
    g.distributeAllCards();

    //Execute
    let json = g.toJson();

    //Verify
    let expected_json = '{"cards":{"deck":[{"color":"hearts","value":14,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"clubs","value":14,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"spades","value":14,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false},{"color":"diamonds","value":14,"up":false}],"table":[],"tableturnedaway":[],"player1table":[{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false},{"color":"hearts","value":4,"up":false}],"player1hand":[{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true},{"color":"hearts","value":7,"up":true}],"player2table":[{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false}],"player2hand":[{"color":"hearts","value":11,"up":true},{"color":"hearts","value":12,"up":true},{"color":"hearts","value":13,"up":true}]},"activePlayer":1,"winner":null}';
    expect(json).toStrictEqual(expected_json.replace(" ", "").replace("\n",""));
});

test('construct game from json', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13},{"color":"clubs","value":14},{"color":"clubs","value":2},{"color":"clubs","value":3},{"color":"clubs","value":4},{"color":"clubs","value":5},{"color":"clubs","value":6},{"color":"clubs","value":7},{"color":"clubs","value":8},{"color":"clubs","value":9},{"color":"clubs","value":10},{"color":"clubs","value":11},{"color":"clubs","value":12},{"color":"clubs","value":13},{"color":"spades","value":14},{"color":"spades","value":2},{"color":"spades","value":3},{"color":"spades","value":4},{"color":"spades","value":5},{"color":"spades","value":6},{"color":"spades","value":7},{"color":"spades","value":8},{"color":"spades","value":9},{"color":"spades","value":10},{"color":"spades","value":11},{"color":"spades","value":12},{"color":"spades","value":13},{"color":"diamonds","value":14},{"color":"diamonds","value":2},{"color":"diamonds","value":3},{"color":"diamonds","value":4},{"color":"diamonds","value":5},{"color":"diamonds","value":6},{"color":"diamonds","value":7},{"color":"diamonds","value":8},{"color":"diamonds","value":9},{"color":"diamonds","value":10},{"color":"diamonds","value":11},{"color":"diamonds","value":12},{"color":"diamonds","value":13}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":14},{"color":"hearts","value":2},{"color":"hearts","value":3}],' +
        '"player1hand":[{"color":"hearts","value":4},{"color":"hearts","value":5},{"color":"hearts","value":6}],' +
        '"player2table":[{"color":"hearts","value":7},{"color":"hearts","value":8},{"color":"hearts","value":9}],' +
        '"player2hand":[{"color":"hearts","value":10},{"color":"hearts","value":11},{"color":"hearts","value":12}]},' +
        '"activePlayer":2}';

    //Execute
    const g = new game.Game(init_json);

    //Verify
    let json = g.toJson();
    expect(json).toStrictEqual(init_json);
});


test('shuffle deck', () => {
    //Setup
    const g = new game.Game();
    let card5BeforeShuffle = JSON.stringify(g.state.cards.deck[5]);
    let card23BeforeShuffle = JSON.stringify(g.state.cards.deck[23]);


    //Execute
    g.shuffle();

    //Verify
    let card5AfterShuffle = JSON.stringify(g.state.cards.deck[5]);
    let card23AfterShuffle = JSON.stringify(g.state.cards.deck[23]);

    expect(card5AfterShuffle).not.toStrictEqual(card5BeforeShuffle);
    expect(card23AfterShuffle).not.toStrictEqual(card23BeforeShuffle);
    verifyAllColorsInDeck(g);
});

test('player1 is active player after constructing new game', () => {
    //Execute
    const g = new game.Game();

    //Verify
    expect(g.state.activePlayer).toStrictEqual(1);
});


test('player1 plays card from hand on empty table and active player is changed', () => {
    //Setup
    const g = new game.Game();
    g.distributeAllCards();
    let cardInHand = JSON.stringify(g.state.cards.player1hand[0]);


    //Execute
    g.playCard("PLAYER1HAND", 0, 1);

    //Verify
    let cardTable = JSON.stringify(g.state.cards.table[0]);
    expect(cardTable).toStrictEqual(cardInHand);
    expect(g.state.activePlayer).toStrictEqual(2);
});

test('player1 plays card from hand on card on table with higher value', () => {
    //Setup
    const g = new game.Game();
    g.distributeAllCards();

    //Execute
    expect(g.state.cards.table.length).toStrictEqual(0);
    let moveOk1 = g.playCard("PLAYER1HAND", 0, 1);
    let moveOk2 = g.playCard("PLAYER2HAND", 0, 2);
    let moveOk3 = g.playCard("PLAYER1HAND", 0, 1);

    //Verify
    expect(g.state.cards.table.length).toStrictEqual(2);
    expect(moveOk1).toStrictEqual(true);
    expect(moveOk2).toStrictEqual(true);
    expect(moveOk3).toStrictEqual(false);
});

test('player2 picks up cards on the table', () => {
    //Setup
    const g = new game.Game();
    g.distributeAllCards();
    let moveOk1 = g.playCard("PLAYER1HAND", 0, 1);
    let cardOnTable = JSON.stringify(g.state.cards.table[0]);

    //Execute
    let moveOk2 = g.playCard("TABLE", 0, 2);

    //Verify
    expect(g.state.cards.table.length).toStrictEqual(0);
    expect(g.state.cards.player2hand.length).toStrictEqual(4);
    expect(JSON.stringify(g.state.cards.player2hand[3])).toStrictEqual(cardOnTable);
});

test('player2 turns card on table', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13,"up":false},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);

    //Execute
    let moveOk2 = g.playCard("PLAYER2TABLE", 0, 2);

    //Verify
    expect(g.state.cards.player2table[0].up).toStrictEqual(true);
});

test('player turns card on deck', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13,"up":false},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);
    let topCardDeckBefore = JSON.parse(JSON.stringify(g.state.cards.deck[0]));

    //Execute
    let moveOk = g.playCard("DECK", 0, 2);
    let topCardDeckAfter = JSON.parse(JSON.stringify(g.state.cards.deck[0]));

    //Verify
    expect(topCardDeckBefore.up).toStrictEqual(false);
    expect(topCardDeckAfter.up).toStrictEqual(true);
    expect(topCardDeckBefore.color).toStrictEqual(topCardDeckAfter.color);
    expect(topCardDeckBefore.value).toStrictEqual(topCardDeckAfter.value);
});

test('player puts top card in deck on table', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13,"up":true},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);
    let topCardDeckBefore = JSON.parse(JSON.stringify(g.state.cards.deck[0]));
    let deckCountBefore = g.state.cards.deck.length;

    //Execute
    let moveOk = g.playCard("DECK", 0, 2);

    //Verify
    let topCardTableAfter = JSON.parse(JSON.stringify(g.state.cards.table[0]));
    let deckCountAfter = g.state.cards.deck.length;
    expect(deckCountAfter + 1).toStrictEqual(deckCountBefore);
    expect(topCardDeckBefore.color).toStrictEqual(topCardTableAfter.color);
    expect(topCardDeckBefore.value).toStrictEqual(topCardTableAfter.value);
    expect(g.state.cards.table.length).toStrictEqual(1);
});

test('player puts top card in deck in her hand together with all the cards on the table since it is too low to put on table', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"clubs","value":1,"up":true},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[{"color":"hearts","value":13,"up":true}],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);
    let topCardDeckBefore = JSON.parse(JSON.stringify(g.state.cards.deck[0]));
    let deckCountBefore = g.state.cards.deck.length;
    let tableCountBefore = g.state.cards.table.length;
    let player2HandCountBefore = g.state.cards.player2hand.length;

    //Execute
    let moveOk = g.playCard("DECK", 0, 2);

    //Verify
    let deckCountAfter = g.state.cards.deck.length;
    let tableCountAfter = g.state.cards.table.length;
    let player2HandCountAfter = g.state.cards.player2hand.length;
    expect(player2HandCountAfter).toStrictEqual(player2HandCountBefore + tableCountBefore + 1);
    expect(deckCountAfter).toStrictEqual(deckCountBefore - 1);
    expect(g.state.cards.table.length).toStrictEqual(0);
});

test('player2 wins', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"clubs","value":1,"up":true},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false},{"color":"hearts","value":4,"up":false},{"color":"hearts","value":5,"up":false},{"color":"hearts","value":6,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"table":[{"color":"hearts","value":7,"up":true}],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[],' +
        '"player2table":[{"color":"hearts","value":13,"up":true}],' +
        '"player2hand":[]},' +
        '"activePlayer":2,' +
        '"winner":null}';
    const g = new game.Game(init_json);


    //Execute
    let moveOk = g.playCard("PLAYER2TABLE", 0, 2);

    //Verify
    expect(g.state.cards.player2table.length).toStrictEqual(0);
    expect(g.state.winner).toStrictEqual(2);
});

test('can play card with value 2 on any card', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13,"up":false},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[{"color":"hearts","value":8,"up":true}],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[{"color":"hearts","value":2,"up":true}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);

    //Execute
    let moveOk = g.playCard("PLAYER2HAND", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(true);
    expect(g.state.cards.table.length).toStrictEqual(2);
    expect(g.state.cards.player2hand.length).toStrictEqual(0);
    expect(g.state.cards.table[0].value).toStrictEqual(2);
    expect(g.state.cards.table[0].color).toStrictEqual("hearts");
    expect(g.state.activePlayer).toStrictEqual(2);
});

test('can play card with value 2 on any card from deck', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":2,"up":true},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[{"color":"hearts","value":8,"up":true}],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[{"color":"hearts","value":13,"up":true}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);
    let deckCountBefore = g.state.cards.deck.length;

    //Execute
    let moveOk = g.playCard("DECK", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(true);
    expect(g.state.cards.table.length).toStrictEqual(2);
    expect(g.state.cards.deck.length).toStrictEqual(deckCountBefore - 1);
    expect(g.state.cards.table[0].value).toStrictEqual(2);
    expect(g.state.cards.table[0].color).toStrictEqual("hearts");
    expect(g.state.activePlayer).toStrictEqual(2);
});

test('playing card with value 10 turns away alla cards on table', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13,"up":false},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[{"color":"hearts","value":8,"up":true}],' +
        '"tableturnedaway":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[{"color":"hearts","value":10,"up":false},{"color":"hearts","value":2,"up":true}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);

    //Execute
    let moveOk = g.playCard("PLAYER2HAND", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(true);
    expect(g.state.cards.table.length).toStrictEqual(0);
    expect(g.state.cards.tableturnedaway.length).toStrictEqual(2);
    expect(g.state.cards.player2hand.length).toStrictEqual(3);
});

test('playing card with value 10 from deck turns away all cards on table', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":10,"up":true},{"color":"hearts","value":13,"up":false},{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[{"color":"hearts","value":8,"up":true}],' +
        '"tableturnedaway":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[{"color":"hearts","value":2,"up":true}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);
    let deckLengthBefore = g.state.cards.deck.length;

    //Execute
    let moveOk = g.playCard("DECK", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(true);
    expect(g.state.cards.table.length).toStrictEqual(0);
    expect(g.state.cards.tableturnedaway.length).toStrictEqual(2);
    expect(g.state.cards.tableturnedaway.filter(card => card.up === true).length).toStrictEqual(0);
    expect(g.state.cards.deck.length).toStrictEqual(deckLengthBefore - 1);
});

test('player2 cannot turn card on table since hand is not empty', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[{"color":"hearts","value":13,"up":false}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);

    //Execute
    let moveOk = g.playCard("PLAYER2TABLE", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(false);
    expect(g.state.cards.player2table[0].up).toStrictEqual(false);
});

test('player1 cannot turn card on table since hand is not empty', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"clubs","value":1,"up":false},{"color":"clubs","value":2,"up":false},{"color":"clubs","value":3,"up":false},{"color":"clubs","value":4,"up":false},{"color":"clubs","value":5,"up":false},{"color":"clubs","value":6,"up":false},{"color":"clubs","value":7,"up":false},{"color":"clubs","value":8,"up":false},{"color":"clubs","value":9,"up":false},{"color":"clubs","value":10,"up":false},{"color":"clubs","value":11,"up":false},{"color":"clubs","value":12,"up":false},{"color":"clubs","value":13,"up":false},{"color":"spades","value":1,"up":false},{"color":"spades","value":2,"up":false},{"color":"spades","value":3,"up":false},{"color":"spades","value":4,"up":false},{"color":"spades","value":5,"up":false},{"color":"spades","value":6,"up":false},{"color":"spades","value":7,"up":false},{"color":"spades","value":8,"up":false},{"color":"spades","value":9,"up":false},{"color":"spades","value":10,"up":false},{"color":"spades","value":11,"up":false},{"color":"spades","value":12,"up":false},{"color":"spades","value":13,"up":false},{"color":"diamonds","value":1,"up":false},{"color":"diamonds","value":2,"up":false},{"color":"diamonds","value":3,"up":false},{"color":"diamonds","value":4,"up":false},{"color":"diamonds","value":5,"up":false},{"color":"diamonds","value":6,"up":false},{"color":"diamonds","value":7,"up":false},{"color":"diamonds","value":8,"up":false},{"color":"diamonds","value":9,"up":false},{"color":"diamonds","value":10,"up":false},{"color":"diamonds","value":11,"up":false},{"color":"diamonds","value":12,"up":false},{"color":"diamonds","value":13,"up":false}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":1,"up":false},{"color":"hearts","value":2,"up":false},{"color":"hearts","value":3,"up":false}],' +
        '"player1hand":[{"color":"hearts","value":4,"up":true},{"color":"hearts","value":5,"up":true},{"color":"hearts","value":6,"up":true}],' +
        '"player2table":[{"color":"hearts","value":7,"up":false},{"color":"hearts","value":8,"up":false},{"color":"hearts","value":9,"up":false},{"color":"hearts","value":10,"up":false},{"color":"hearts","value":11,"up":false},{"color":"hearts","value":12,"up":false}],' +
        '"player2hand":[{"color":"hearts","value":13,"up":false}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);

    //Execute
    let moveOk = g.playCard("PLAYER1TABLE", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(false);
    expect(g.state.cards.player1table[0].up).toStrictEqual(false);
});


test('dont allow active player to play with other players cards', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13},{"color":"clubs","value":14},{"color":"clubs","value":2},{"color":"clubs","value":3},{"color":"clubs","value":4},{"color":"clubs","value":5},{"color":"clubs","value":6},{"color":"clubs","value":7},{"color":"clubs","value":8},{"color":"clubs","value":9},{"color":"clubs","value":10},{"color":"clubs","value":11},{"color":"clubs","value":12},{"color":"clubs","value":13},{"color":"spades","value":14},{"color":"spades","value":2},{"color":"spades","value":3},{"color":"spades","value":4},{"color":"spades","value":5},{"color":"spades","value":6},{"color":"spades","value":7},{"color":"spades","value":8},{"color":"spades","value":9},{"color":"spades","value":10},{"color":"spades","value":11},{"color":"spades","value":12},{"color":"spades","value":13},{"color":"diamonds","value":14},{"color":"diamonds","value":2},{"color":"diamonds","value":3},{"color":"diamonds","value":4},{"color":"diamonds","value":5},{"color":"diamonds","value":6},{"color":"diamonds","value":7},{"color":"diamonds","value":8},{"color":"diamonds","value":9},{"color":"diamonds","value":10},{"color":"diamonds","value":11},{"color":"diamonds","value":12},{"color":"diamonds","value":13}],' +
        '"table":[],' +
        '"player1table":[{"color":"hearts","value":14},{"color":"hearts","value":2},{"color":"hearts","value":3}],' +
        '"player1hand":[{"color":"hearts","value":4},{"color":"hearts","value":5},{"color":"hearts","value":6}],' +
        '"player2table":[{"color":"hearts","value":7},{"color":"hearts","value":8},{"color":"hearts","value":9}],' +
        '"player2hand":[{"color":"hearts","value":10},{"color":"hearts","value":11},{"color":"hearts","value":12}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);

    //Execute
    let moveOk = g.playCard("PLAYER1HAND", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(false);
});

test('deal out new cards from deck', () => {
    //Setup
    let init_json = '{"cards":{"deck":[{"color":"hearts","value":13},{"color":"clubs","value":14},{"color":"clubs","value":2},{"color":"clubs","value":3},{"color":"clubs","value":4},{"color":"clubs","value":5},{"color":"clubs","value":6},{"color":"clubs","value":7},{"color":"clubs","value":8},{"color":"clubs","value":9},{"color":"clubs","value":10},{"color":"clubs","value":11},{"color":"clubs","value":12},{"color":"clubs","value":13},{"color":"spades","value":14},{"color":"spades","value":2},{"color":"spades","value":3},{"color":"spades","value":4},{"color":"spades","value":5},{"color":"spades","value":6},{"color":"spades","value":7},{"color":"spades","value":8},{"color":"spades","value":9},{"color":"spades","value":10},{"color":"spades","value":11},{"color":"spades","value":12},{"color":"spades","value":13},{"color":"diamonds","value":14},{"color":"diamonds","value":2},{"color":"diamonds","value":3},{"color":"diamonds","value":4},{"color":"diamonds","value":5},{"color":"diamonds","value":6},{"color":"diamonds","value":7},{"color":"diamonds","value":8},{"color":"diamonds","value":9},{"color":"diamonds","value":10},{"color":"diamonds","value":11},{"color":"diamonds","value":12},{"color":"diamonds","value":13}],' +
        '"table":[],' +
        '"tableturnedaway":[],' +
        '"player1table":[{"color":"hearts","value":14},{"color":"hearts","value":2},{"color":"hearts","value":3}],' +
        '"player1hand":[{"color":"hearts","value":4},{"color":"hearts","value":5},{"color":"hearts","value":6}],' +
        '"player2table":[{"color":"hearts","value":7},{"color":"hearts","value":8},{"color":"hearts","value":9}],' +
        '"player2hand":[{"color":"hearts","value":10},{"color":"hearts","value":11},{"color":"hearts","value":12}]},' +
        '"activePlayer":2}';
    const g = new game.Game(init_json);
    let deckLengthBefore = g.state.cards.deck.length;

    //Execute
    let moveOk = g.playCard("PLAYER2HAND", 0, 2);

    //Verify
    expect(moveOk).toStrictEqual(true);
    expect(deckLengthBefore - 1).toStrictEqual(g.state.cards.deck.length);
    expect(g.state.cards.player2hand.length).toStrictEqual(3);
});
