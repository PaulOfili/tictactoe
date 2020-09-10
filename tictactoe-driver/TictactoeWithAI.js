const { Player, Winner, MAX_DEPTH } = require("./constants");
const Tictactoe = require("./Tictactoe");

class TictactoeWithAI extends Tictactoe {
    constructor(size, computerPiece) {
        super(size);
        this.computerPiece = computerPiece;
        this.playerPiece = this.getOtherPiece(computerPiece);

        if (computerPiece === Player.FIRST_PLAYER) {
            const randomIndex = Math.floor(Math.random() * this.remainingSlots.length);
            // const computerRandomMove = this.remainingSlots[randomIndex];
            const computerBestMove = this.getComputerMove();
            super.playPiece(computerBestMove);
        }
    }

    playPiece(position) {
        const isPlayed = super.playPiece(position);

        if (isPlayed === false || this.isGameRunning === false) {
            return false;
        }

        this.showBoard();

        const computerBestMove = this.getComputerMove();
        super.playPiece(computerBestMove);

        return true;
    }

    getComputerMove() {
        const [bestResult, bestPosition] = this.minimax(MAX_DEPTH, true);

        return bestPosition;
    }

    getAvailableSlotsSimulation() {
        const availableSlots = [];
        for (let i = 0; i < this.size; ++i) {
            for (let j = 0; j < this.size; ++j) {
                if (this.board[i][j] === Player.EMPTY) {
                    availableSlots.push(this.getSlotFromCoordinates(i, j));
                }
            }
        }
        return availableSlots;
    }

    minimax(depth, maximazinglayer, currentPlayer) {
        // if (depth == 0) {
        //     return 0;
        // }

        if (this.checkForWinner(currentPlayer)) {
            return (this.computerPiece === currentPlayer) ? Winner.COMPUTER : Winner.PLAYER;
        }

        const availableSlots = this.getAvailableSlotsSimulation();

        if (availableSlots.length === 0) {
            return Winner.DRAW;
        }

        if (maximazinglayer === true) {
            let bestResult = -Infinity;
            let bestPosition = null;

            for (const slot of availableSlots) {
                const [row, col] = this.getCoordinatesFromSlot(slot);
                this.board[row][col] = this.computerPiece;
                const eachResult = this.minimax(depth - 1, false, this.computerPiece);

                if (depth === MAX_DEPTH) {
                    // console.log({slot, eachResult})
                    if (eachResult > bestResult) {
                        bestPosition = slot;
                    }
                }
                bestResult = Math.max(bestResult, eachResult);
                this.board[row][col] = Player.EMPTY;
            }
            if (depth === MAX_DEPTH) {
                return [bestResult, bestPosition];
            }
            return bestResult;
        }
        let worstResult = Infinity;

        for (const slot of availableSlots) {
            const [row, col] = this.getCoordinatesFromSlot(slot);
            this.board[row][col] = this.playerPiece;

            const eachResult = this.minimax(depth - 1, true, this.playerPiece);

            worstResult = Math.min(worstResult, eachResult);
            this.board[row][col] = Player.EMPTY;
        }
        return worstResult;
    }
}

module.exports = TictactoeWithAI;