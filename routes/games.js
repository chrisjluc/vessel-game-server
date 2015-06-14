var express = require('express');
var router = express.Router();

var Token = require('../models/Token');
var GameState = require('../models/GameState');
var gameController = require('../controllers/gamecontroller');

// This can be called when a user is just starting a game, no command required
router.get('/:token/', gameHandler);

// To play the user has to always send in commands
router.get('/:token/:command', gameHandler);

function gameHandler(req, res){
    var tokenId = req.params.token;
    var command = req.params.command;
    Token.findOne({_id: tokenId}, function(err, token){
        if (err) return res.send(err);
        if (token) {
            GameState.findOne({token: tokenId}, function(err, state){
                if (err) return res.send(err);
                // Gamestate doesn't exist, start our game session
                if (!state){
                    gameController.start(token, res);

                // Game state exists, and has a valid command
                } else if (command){
                    gameController.play(state, command, res);

                // Game state exists but invalid command, most likely empty string
                } else {
                    res.send({message: 'You did not give a command'});
                }
            });
        } else {
            res.send({message: 'Invalid token'});
        }
    });
}

module.exports = router;
