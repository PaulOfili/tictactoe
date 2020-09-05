const gameReadline = require('readline-sync');
const TictacToe = require('./index');

// const gameReadline = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

tictactoe = new TictacToe(3, "X");

console.log(tictactoe.board);

tictactoe.showBoard()
while(tictactoe.isGameRunning) { 
    const position = gameReadline.question('Pick a position on the board to play?');
    if (Number.isNaN(position) || (position < 0 && position > 8)) {
        continue;
    }
    console.log(position);
    tictactoe.playPiece(position);
    tictactoe.showBoard()
}


