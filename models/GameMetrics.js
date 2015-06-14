var mongoose = require('mongoose');

var gameMetrics = new mongoose.Schema({
    username : {
        type: String,
        unique: true
    },
    data: {}
});

var GameMetrics = mongoose.model('gameMetrics', gameMetrics);

module.exports = GameMetrics;
