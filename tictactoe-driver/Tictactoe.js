const { Player } = require("./constants");

class Tictactoe {
    constructor(size) {
        this.board = this.generateInitialBoard(size);
        this.size = size;
        this.currentPiece = Player.FIRST_PLAYER;
        this.isGameRunning = true;
        this.numberOfRemainingSlots = size * size;
        this.remainingSlots = [...Array(this.numberOfRemainingSlots).keys()].map((i) => i + 1);
        this.winner = null;
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

module.exports = Tictactoe;
