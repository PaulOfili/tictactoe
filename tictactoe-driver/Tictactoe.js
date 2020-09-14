const EventEmitter = require("events");
const { Player, DEFAULT_BOARD_SIZE } = require("./constants");

class Tictactoe extends EventEmitter {
    constructor(size = DEFAULT_BOARD_SIZE) {
        super();
        if (!Number.isInteger(size)) {
            throw new Error("Invalid parameter. Pass only a number.")
        }
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
        if (position < 1 || position > (this.size * this.size)) {
            return false
        }

        const [row, col] = this.getCoordinatesFromSlot(position);

        if (this.board[row][col] === Player.EMPTY) {
            this.board[row][col] = this.currentPiece;
            this.remainingSlots = this.remainingSlots.filter((item) => item !== position);
            this.numberOfRemainingSlots -= 1;
        } else {
            this.emit("cellTaken");
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

        this.emit("showBoard");
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

        if (![Player.FIRST_PLAYER, Player.SECOND_PLAYER].includes(piece)) {
            return new Error("Invalid piece");
        }

        if (this.checkHorizontalorVertical("horizontal", piece)
        || this.checkHorizontalorVertical("vertical", piece)
        || this.checkLeftDiagonal(piece)
        || this.checkRightDiagonal(piece)) {
            return true;
        }
        return false;
    }
}

module.exports = Tictactoe;
