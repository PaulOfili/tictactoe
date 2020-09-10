const { Player, Winner, MAX_DEPTH } = require("./constants");

class Tictactoe {
    constructor(size) {
        this.board = this.generateInitialBoard(size);
        this.size = size;
        this.currentPiece = Player.FIRST_PLAYER;
        this.isGameRunning = true;
        this.numberOfRemainingSlots = size * size;
        this.winner = null;
        this.remainingSlots = [...Array(this.numberOfRemainingSlots + 1).keys()].slice(1, this.numberOfRemainingSlots + 1);
    }

    generateInitialBoard(size) {
        const board = [];

        for (let i = 0; i < size; i++) {
            const eachRow = [];

            for (let j = 0; j < size; j++) {
                eachRow.push(Player.EMPTY);
            }

            board.push(eachRow);
        }

        return board;
    }

    getCoordinatesFromSlot(slot) {
        const indexedPosition = slot - 1;
        const row = Math.floor(indexedPosition / this.size);
        const col = indexedPosition % this.size;

        return [row, col];
    }

    getSlotFromCoordinates(row, col) {
        return (row * this.size) + col + 1;
    }

    playPiece(position) {
        const [row, col] = this.getCoordinatesFromSlot(position);

        if (this.board[row][col] === Player.EMPTY) {
            this.board[row][col] = this.currentPiece;
            this.remainingSlots = this.remainingSlots.filter((item) => item !== position);
            this.numberOfRemainingSlots -= 1;
        } else {
            return false;
        }

        if (this.checkForWinner(this.currentPiece)) {
            this.isGameRunning = false;
            this.winner = this.currentPiece;
        }

        if (this.numberOfRemainingSlots === 0 && this.winner === null) {
            this.isGameRunning = false;
        }

        if (this.isGameRunning) {
            this.changePiece();
        }

        return true;
    }

    changePiece() {
        this.currentPiece = (this.currentPiece === Player.FIRST_PLAYER)
            ? Player.SECOND_PLAYER
            : Player.FIRST_PLAYER;
    }

    getOtherPiece(piece) {
        return (piece === Player.FIRST_PLAYER) ? Player.SECOND_PLAYER : Player.FIRST_PLAYER;
    }

    checkHorizontalorVertical(type, piece) {
        for (let i = 0; i < this.size; ++i) {
            let allEqual = true;
            for (let j = 0; j < this.size; ++j) {
                if (((type === "horizontal") ? this.board[i][j] : this.board[j][i]) !== piece) {
                    allEqual = false;
                    break;
                }
            }
            if (allEqual) {
                return piece;
            }
        }
        return false;
    }

    checkLeftDiagonal(piece) {
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][i] !== piece) {
                return false;
            }
        }
        return piece;
    }

    checkRightDiagonal(piece) {
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][this.size - i - 1] !== piece) {
                return false;
            }
        }
        return piece;
    }

    checkForWinner(piece) {
        if (this.checkHorizontalorVertical("horizontal", piece)
        || this.checkHorizontalorVertical("vertical", piece)
        || this.checkLeftDiagonal(piece)
        || this.checkRightDiagonal(piece)) {
            return true;
        }
        return false;
    }

    checkForGameover() {
        if (this.numberOfRemainingSlots === 0) {
            return true;
        }
        return false;
    }

    showBoard() {
        let board = "\n";
        for (let i = 0; i < this.size; ++i) {
            let eachRow = " ";
            for (let j = 0; j < this.size; ++j) {
                eachRow += `${(this.board[i][j]) ? this.board[i][j] : "-"}`;
                if (j < this.size - 1) {
                    eachRow += " | ";
                }
            }
            if (i < this.size - 1) {
                eachRow += "\n-----------\n";
            }
            board += eachRow;
        }
        board += "\n";
        console.log(board);
    }
}

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

module.exports = {
    Tictactoe,
    TictactoeWithAI,
};
