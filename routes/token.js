var express = require('express');
var Token = require('../models/Token');

var gameController = require('../controllers/gamecontroller');

var router = express.Router();

/*
 * Generate a token for a user and requested game if it doesn't already exist.
 * If it exists, just return that token.
 */
router.get('/:username/:game', function (req, res) {
    var username = req.params.username;
    var game = req.params.game;

    if (!gameController.doesGameExist(game)) return res.send({message: "Invalid game"});

    Token.findOne({username: username, game: game}, function (err, token) {
        if (err) return res.send(err);

        if (token) return res.send({token: token._id.toString()});

        var newToken = new Token({
            username: username,
            game: game
        });

        newToken.save(function (err, obj) {
            res.send({token: obj._id.toString()});
        });
    });
});

module.exports = router;
