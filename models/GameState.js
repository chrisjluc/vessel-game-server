var mongoose = require('mongoose');

var gameStateSchema = new mongoose.Schema({
    token: String,
    game: String,
    username: String,
    data: {}
});

var GameState = mongoose.model('gameState', gameStateSchema);

module.exports = GameState;
