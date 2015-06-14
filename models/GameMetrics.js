var mongoose = require('mongoose');

var gameMetrics = new mongoose.Schema({
    username : {
        type: String,
        unique: true
    },
    // keys will be the game with wins, losses, totals
    data: {}
});

var GameMetrics = mongoose.model('gameMetrics', gameMetrics);

module.exports = GameMetrics;
