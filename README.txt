Architecture:

    Everything is done through GET http requests for simplicity.
    Everything is persisted in MongoDB including game states.

    /routes
        - this directory has all the js to handle URL calls.
        - the games routes is what a user interacts with to start and play games

    /models
        - Defines mongodb schemas for Token, GameState and GameMetrics models
        - tokens are objectIds

    /games
        - Holds a specific implementation of a game (ex. hangman)
        - games should have methods start() and play() where play can trigger callbacks of win / lose on gamecontroller

    gamecontroller.js
        - the middle layer between the generic URL endpoints and the specific game implementations
        - /routes/game.js does basic validation of URL and then passes on to gamecontroller.js and it maps to specific game implementations.


How to add games:
  1) Add it to the games array in gamecontroller.js
  2) Add the js file to /games directory.


How gamestate and tokens work:
  So things were a bit misleading when instructions said a token per user and game id, and then a couple lines after it said token per user, so I just went with the first rule
  where we have 1 token per user and game.

  When a game is finished, a user can play another game as long as their token is valid
  If token expires while a game is in progress, that game is lost.
  (A quick fix for this would be to update the token on the gamestate to the newly generated one, this isn't implemented though just an idea)
