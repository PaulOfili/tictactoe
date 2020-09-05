class Tictactoe {
    constructor(size, piece) {
        this.board = this.generateInitialBoard(size);
        this.size = size;
        this.currentPiece = piece;
        this.isGameRunning = true;
        this.remainingSlots = size * size;
        this.winner = null;
    }

    generateInitialBoard(size) {
        const board = [];

        for (let i = 0; i < size; i++) {
            const eachRow = [];

            for (let j = 0; j < size; j++) {
                eachRow.push("");
            }

            board.push(eachRow);
        }

        return board;
    }

    playPiece(position) {
        let row = Math.floor(position / this.size);
        let col = position % this.size;
        console.log(row, col)
        if (this.board[row][col] === "") {
            this.board[row][col] = this.currentPiece;
            this.remainingSlots -= 1;
        } else {
            return;
        }

        if(this.checkForWinner(this.currentPiece)) {
            console.log(`${this.winner} is the winner`);
        }
        if(this.remainingSlots === 0) {
            this.isGameRunning = false;
            console.log("This is a draw");
        }
        if (this.isGameRunning) {
            this.changePiece();
        }
    }

    changePiece() {
        this.currentPiece = (this.currentPiece === "X") ? "O" : "X"
    }

    swap(index1, index2) {
        console.log('swap', index1, index2)
        return [index2, index1];
    }

    checkHorizontalorVertical(type, piece) {
        for (let i = 0; i < this.size; ++i) {
            let all_equal = true;
            for (let j = 0; j < this.size; ++j) {
                if(type === "horizontal") {
                    if (this.board[j][i] !== piece) {
                        all_equal = false;
                        break
                    }
                } else {
                    if (this.board[i][j] !== piece) {
                        all_equal = false;
                        break
                    }
                }
            }
            if (all_equal) {
                return piece
            }
        }
        return false
    }

    checkLeftDiagonal(piece) {
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][i] !== piece) {
                return false
            }
        }
        return piece
    }

    checkRightDiagonal(piece) {
        for (let i = 0; i < this.size; i++) {
            if (this.board[i][this.size - i - 1] !== piece) {
                return false
            }
        }
        return piece
    }

    checkForWinner(piece) {
        try {
            if (this.checkHorizontalorVertical("horizontal", piece) ||
            this.checkHorizontalorVertical("vertical", piece) ||
            this.checkLeftDiagonal(piece) ||
            this.checkRightDiagonal(piece)) {
                this.isGameRunning = false;
                this.winner = piece
                return true;
            }
        } catch (error) {
            console.log(error)
        }

    }

    checkForGameover() {
        if (this.remainingSlots === 0) {
            return true;
        }
        return false;
    }

    showBoard() {
        for(let i = 0; i < this.size; ++i) {
            let eachRow = ""
            for (let j = 0; j < this.size; ++j) {
                eachRow += ((this.board[i][j]) ? this.board[i][j] : "-" )+ "  ";
            }
            console.log(eachRow);
        }
    }
}

module.exports = Tictactoe;