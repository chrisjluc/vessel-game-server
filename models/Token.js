var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    username: String,
    game: String,
    createdAt: {
        type: Date,
        expires: '1h',
        default: Date.now
    }
});

tokenSchema.index({ username: 1, game: 1}, { unique: true });

var Token = mongoose.model('token', tokenSchema);

module.exports = Token;
