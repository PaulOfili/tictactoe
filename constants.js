const Player = {
    FIRST_PLAYER: "X",
    SECOND_PLAYER: "O",
    EMPTY: ""
};
Object.freeze(Player);

const Winner = {
    COMPUTER: 1,
    PLAYER: -1,
    DRAW: 0
};
Object.freeze(Winner)

const MAX_DEPTH = 3;
const DEFAULT_BOARD_SIZE = 3;

 module.exports = {
     Player,
     Winner,
     MAX_DEPTH,
     DEFAULT_BOARD_SIZE
};