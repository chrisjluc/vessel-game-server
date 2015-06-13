var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    tokenId : {
        type: String,
        unique: true
    },
    username: String,
    createdAt: {
        type: Date,
        expires: '1h'
    }
});

var Token = mongoose.model('token', tokenSchema);

module.exports = Token;
