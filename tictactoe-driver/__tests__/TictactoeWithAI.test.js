const TictactoeWithAI = require("../TictactoeWithAI");
const { Player, DEFAULT_BOARD_SIZE } = require("../constants");

let game; let first; let second; let
    empty;

beforeAll(() => {
    first = Player.FIRST_PLAYER;
    second = Player.SECOND_PLAYER;
    empty = Player.EMPTY;
});

describe("Tictactoe with AI game", () => {
    it("initializes game with right size", () => {
        game = new TictactoeWithAI(1);
        expect(game).toBeInstanceOf(TictactoeWithAI);
        expect(game.board).toHaveLength(DEFAULT_BOARD_SIZE);
    });
});

describe("Tests game functionalities", () => {
    describe("When computer plays first", () => {
        it("should finish game with first player(X) as winner after these set of moves by player", () => {
            game = new TictactoeWithAI(1);
            const moves = [3, 3, 5];
            moves.forEach((move) => game.playPiece(move));

            expect(game.winner).toEqual(first);
            expect(game.isGameRunning).toEqual(false);
            expect(game.numberOfRemainingSlots).toEqual(4);

            expect(game.playPiece(3)).toBeFalsy();
        });
    });

    describe("When computer plays second", () => {
        it("should finish game with with a draw after these set of moves by player", () => {
            game = new TictactoeWithAI(2);
            const moves = [5, 2, 7, 4, 9];
            moves.forEach((move) => game.playPiece(move));

            expect(game.winner).toBeNull();
            expect(game.isGameRunning).toEqual(false);
            expect(game.numberOfRemainingSlots).toEqual(0);
        });
    });
});
