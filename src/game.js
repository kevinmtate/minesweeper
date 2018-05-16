import { Board } from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('Sorry! That tile had a bomb... the game is over. You suck!');
            this._board.print();
        } else if (!this._board.hasSafeTiles()) {
            console.log('Congrats! You won! Now go outside and talk to a human for a change.');
        } else {
            console.log('Current Board:');
            this._board.print();
        }
    }
}