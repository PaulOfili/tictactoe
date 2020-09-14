# Remote Multiplayer tictactoe game with AI mode

## Desciption

An implemetation of the Tic-Tac-Toe game complete with the state and methods for both multiplayer and AI modes.

## Installation:

To install this packages, simply run this command:

    npm install @paulofili/tictactoe

or if you prefer Yarn,

    yarn add @paulofili/tictactoe

## Usage:

To use simply, import `Tictactoe` and `TictactoeWithAI` classes from `@paulofili\tictactoe` module

```javascript
const { Tictactoe, TictactoeWithAi } = require("@paulofili\tictactoe");

const game = Tictactoe()
// const game = new TictactoeWithAi(1")
// const game = new TictactoeWithAi(2")

```

### Tictactoe class
This takes in an optional argument of the size of the board game. Default is 3.

#### Attributes
- board(array) = 2D representation of the game.
- size(number) = Size of the board as specfied by the user. Default is 3.
- currentPiece(string) = Current user to play piece. Initial value is X. X starts first.
- isGameRunning(boolen) = Status of game
- numberOfRemainingSlots(number) = Number of available slots
- remainingSlots(array) = Array containing value of available slots. Values range from 1 - 9 for a 3*3 board denoting the position of the cells.
- winner(string | null) = Winner after game ends. Initial value is null. If draw, winner remains null.


#### Methods
- playPiece(position): Places the current piece into the input position. This method also checks for a winner and if not checks for a draw. At the end, it changes the currentPiece attribute to the next player by calling changePiece(). It returns `true` if currentPiece is able to be placed unto the board at the specified position, else `false`. Accepts number.

- changePiece(): Switches the currentPiece variable to the next piece. Returns void.

<!-- 
- getOtherPiece(piece): Returns the other player playing against the input piece. Accepts string


- checkForWinner(piece): Checks the board and returns `true` if the last played piece has won the game, else `false`. Accepts string -->



