var _ = require('lodash');

var words = [
    'alligator',
    'canada',
    'russia',
    'acronym',
    'directory',
    'perfect',
    'laundry',
    'machine',
    'controller',
    'mountain',
    'anniversary'
    ];

var guessesToStart = 4;

var hangman = {

    start: function(state, res) {
        var index = Math.floor(Math.random() * words.length);
        var data = {
            lettersGuessed: [],
            guessesLeft: guessesToStart,
            word: words[index]
        };

        data.lettersLeft = _.reduce(data.word.split(''), function(result, letter){
            if (!_.contains(result, letter)) {
                result.push(letter);
            }
            return result;
        }, []);

        state.data = data;
        state.save();

        res.send({
            instructions: 'Welcome to Hangman! ' +
                'To make a guess, input a letter as a command. You have '
                + guessesToStart + ' guesses.',
            hangmanString: printHangmanString(data)
        });
    },

    play: function(state, command, winCallback, loseCallback, res) {
        command = command.toLowerCase();

        if (!isLetter(command)) return res.send({message: 'Command has to be a single letter'});

        var data = state.data;
        if (_.contains(data.lettersGuessed, command)) return res.send({message: 'That letter was already guessed'});

        data.lettersGuessed.push(command);

        var index = data.lettersLeft.indexOf(command);
        if (index !== -1) {
            data.lettersLeft.splice(index, 1);
        } else{
            data.guessesLeft--;
        }

        state.data = data;

        if (isGameWon(data)){
            return winCallback(state, res);
        } else if (isGameLost(data)){
            return loseCallback(state, res);
        }

        state.markModified('data');
        state.save();

        res.send({
            lettersGuessed: data.lettersGuessed,
            guessesLeft: data.guessesLeft,
            hangmanString: printHangmanString(data)
        });
    }
};

function isGameWon(data){
    return data.lettersLeft.length === 0;
}

function isGameLost(data){
    return data.guessesLeft === 0;
}

function printHangmanString(data){
    return _.reduce(data.word.split(''), function(result, letter){
        if (_.contains(data.lettersLeft, letter)) {
            result += '_ ';
        } else {
            result += letter + ' ';
        }
        return result;
    }, '');
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

module.exports = hangman;
