'use strict';

require('approvals')
    .mocha();

var Game = require("./game.js");

describe('Game approval tests', function () {
    it('Game should say Im game', function () {
        let game = new Game();
        let data = game.val;
        this.verify(data);  // or this.verifyAsJSON(data)
    });
});
