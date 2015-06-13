var mongoose = require('mongoose');

var gameMetrics = new mongoose.Schema({
    username : {
        type: String,
        unique: true
    }
});

var GameMetrics = mongoose.model('gameMetrics', gameMetrics);

module.exports = GameMetrics;
