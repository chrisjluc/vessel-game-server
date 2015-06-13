var mongoose = require('mongoose');

var gameStateSchema = new mongoose.Schema({
    tokenId: String,
    gameId: String,
    isFinished: Boolean,
    isStarted: Boolean,
    data: {}
});

var GameState = mongoose.model('gameState', gameStateSchema);

module.exports = GameState;
