var mongoose = require('mongoose');

var gameStateSchema = new mongoose.Schema({
    token: String,
    game: String,
    username: String,
    // Custom stateful data for a specific game
    data: {}
});

var GameState = mongoose.model('gameState', gameStateSchema);

module.exports = GameState;
