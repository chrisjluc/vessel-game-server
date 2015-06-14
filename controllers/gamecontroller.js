var _ = require('lodash');

var GameState = require('./../models/GameState');
var GameMetrics = require('./../models/GameMetrics');

var games = ['hangman'];

var gameController = {

    doesGameExist: function (game) {
        return _.contains(games, game);
    },

    /*
     * Handles the initialization of the game
     * Maps to the specific game and calls it's start()
     *
     * Prints instructions
     */
    start: function (token, res){
        var state = GameState({
            token: token.id,
            username: token.username,
            game: token.game
        });
        var game = require('../games/' + token.game);
            game.start(state, res);
    },

    /*
     * Handles every command for game play
     * Maps to the specific game calls it's play()
     *
     * If the player wins or loses,
     * game should call one of the win/lose callbacks
     * and then game state is deleted.
     */
    play: function (state, command, res){
        var game = require('../games/' + state.game);
        game.play(state, command, win, lose, res);
    }
};

function win(state, res) {
    updateMetrics(state.username, state.game, true);
    state.remove();
    res.send({message: 'Congratulations! You have won!'});
}

function lose(state, res) {
    updateMetrics(state.username, state.game, false);
    state.remove();
    res.send({message: 'Aw :( you lost.'});
}

function updateMetrics(username, game, isWin){
    GameMetrics.findOne({username: username}, function(err, metrics){
        if (metrics) {
            if(!metrics.data.hasOwnProperty(game)) {
                metrics.data[game] = {
                    wins: 0,
                    losses: 0,
                    total: 0
                };
            }
            if (isWin) {
                metrics.data[game].wins++;
            } else {
                metrics.data[game].losses++;
            }
            metrics.data[game].total++;
            metrics.markModified('data');
            metrics.save();
        } else {
            var gameMetric = {
                username: username,
                data: {}
            };
            gameMetric.data[game] =  {
                wins: isWin ? 1 : 0,
                losses: isWin ? 0 : 1,
                total: 1
            };
            GameMetrics.create(gameMetric);
        }
    });
}

module.exports = gameController;
