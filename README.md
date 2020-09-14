# Remote Multiplayer tictactoe game with AI mode

## Desciption

A 3-part project of the implementation of an online tic-tac-toe game with AI mode written in JavaScript. This repository is made of the main tic-tac-toe driver, the command line interface of the game and the multiplayer web version.

## Installation:

#### Game Driver:
To install all necessary dependecies, navigate to the game driver implementation of the game. 

Ensure you are in the root directory, then run this command:

    cd tictactoe-driver

After doing this, run the next command:

    npm install

or if you prefer Yarn:

    yarn install

After this completes you can move on to play the game.

#### CLI:
To install all necessary dependecies, navigate to the command line implementation of the game. 

Just follow the steps for the game driver installation above but replace `tictactoe-driver` with `tictactoe-cli`.

After this completes you can move on to play the game.

## Usage

#### Game Driver:
I made this into a package so that it can be used on any node platform, the CLI, web or app platform.

To install it, checkout the documentation [here](https://www.npmjs.com/package/@paulofili/tictactoe).

If you wish to add to the functionality of the game, do send a shout out.

You can run the already written tests to check out the coverage while you write your new code.

Ensure you are in the `tictactoe-driver` directory and run any of these commands `npm run test`, `npm run test:watch`, or `npm run test:coverage` depending on your preference.

Of course, you need to install the dev dependecies first.



#### CLI:
Ensure you are in the `tictactoe-cli` directory, and run `npm run start`. 

This shows you some information about the game and shows you the different modes.

Picking `1. PvP Local` would start a local multiplayer game where the user and any other player can play against each other.

Picking `2. PvAI` would prompt the user to decide who plays first, the player or the AI.

After making your choice, the game board is shown and the game continues on.

