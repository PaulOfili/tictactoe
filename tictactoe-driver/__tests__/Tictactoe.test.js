const Tictactoe = require("../Tictactoe");
const { Player, DEFAULT_BOARD_SIZE } = require("../constants");

let game; let first; let second; let
    empty;

beforeAll(() => {
    first = Player.FIRST_PLAYER;
    second = Player.SECOND_PLAYER;
    empty = Player.EMPTY;
});

beforeEach(() => {
    game = new Tictactoe();
});

describe("Tictactoe game", () => {
    it("initializes game with right size", () => {
        expect(game).toBeInstanceOf(Tictactoe);
        expect(game.board).toHaveLength(DEFAULT_BOARD_SIZE);
    });
});

describe("Tests utility methods", () => {
    it("converts cell postion to row and col", () => {
        expect(game.getCoordinatesFromSlot(1)).toStrictEqual([0, 0]);
    });

    it("converts row and col to cell position", () => {
        expect(game.getSlotFromCoordinates(0, 2)).toEqual(3);
    });
});

describe("Tests game functionalities", () => {
    it("should not allow play into an already filled cell", () => {
        expect(game.playPiece(1)).toBeTruthy();
        expect(game.playPiece(1)).toBeFalsy();
    });

    it("should finish game with first player(X) as winner after these set of moves", () => {
        const moves = [1, 2, 5, 9, 4, 6, 7];
        moves.forEach((move) => game.playPiece(move));

        expect(game.winner).toEqual(first);
        expect(game.isGameRunning).toEqual(false);
        expect(game.numberOfRemainingSlots).toEqual(2);
        expect(game.board).toStrictEqual([[first, second, empty],
            [first, first, second],
            [first, empty, second]]);
    });

    it("should finish game with second player(O) as winner after these set of moves", () => {
        const moves = [1, 3, 2, 5, 7, 3, 4, 8, 6];
        moves.forEach((move) => game.playPiece(move));

        expect(game.winner).toEqual(second);
        expect(game.isGameRunning).toEqual(false);
        expect(game.numberOfRemainingSlots).toEqual(1);
        expect(game.board).toStrictEqual([[first, first, second],
            [second, second, second],
            [first, first, empty]]);
    });

    it("should finish game with a tie", () => {
        const moves = [1, 3, 2, 5, 7, 3, 4, 6, 8, 9];

        moves.forEach((move) => game.playPiece(move));

        expect(game.winner).toBeNull();
        expect(game.isGameRunning).toEqual(false);
        expect(game.numberOfRemainingSlots).toEqual(0);
        expect(game.board).toStrictEqual([[first, first, second],
            [second, second, first],
            [first, second, first]]);
    });
});
