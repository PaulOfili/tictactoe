const gameReadline = require('readline-sync');
const {Tictactoe, TictactoeWithAI} = require('../tictactoe-driver/index');

const DEFAULT_BOARD_SIZE = 3;

const getCorrectResponse = () => {
    let response;

    while (true) {
        response = gameReadline.questionInt("Choose your medicine: ");
        if ([1,2].includes(Number(response))) {
            return response;
        }
    }
}

console.log("Welcome to tictactoe");
console.log("Hint: X is usually the first player but you can decide who goes first.")
console.log("There are two modes.\n1. PvP Local\n2. PvAI\nI am sure you know what these mean.")

let tictactoe;

let response;
response = getCorrectResponse();

if (response === 1) {
    tictactoe = new Tictactoe(DEFAULT_BOARD_SIZE)
} else {

    console.log("I see you got some guts, I like that. Do you want computer to play first.\n1. Yes (I am a rockstar)\n2. No ( scaredy cat)\n")

    response = getCorrectResponse();

    if (response === 1) {
        tictactoe = new TictactoeWithAI(DEFAULT_BOARD_SIZE, "X");
    } else {
        tictactoe = new TictactoeWithAI(DEFAULT_BOARD_SIZE, "O")
    }
}

tictactoe.showBoard()

while(tictactoe.isGameRunning) { 
    let position = gameReadline.questionInt('Pick a position on the board to play? ');
    position = Number(position)
    if (!Number.isInteger(position) || (position < 1 || position > 9)) {
        console.log("Invalid position");
        continue;
    }

    if(tictactoe.playPiece(position) === false){
        // console.log("Cell already taken, choose a different!")    
    }

    tictactoe.showBoard();
}

if (tictactoe.winner !== null) {
    console.log(`${tictactoe.winner} is the winner`);
} else {
    console.log("This is a draw");
}