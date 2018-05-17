
export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('This tile has already been flipped!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this.playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    }

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        var neighborOffsets = [
            [-1, -1], 
            [-1, 0], 
            [-1, 1], 
            [0, -1], 
            [0, 1], 
            [1, -1], 
            [1, 0], 
            [1, 1]
        ];
        var numberOfRows = this._bombBoard.length;
        var numberOfColumns = this._bombBoard[0].length;
        var numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
            var neighborRowIndex = rowIndex + offset[0];
            var neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) { 
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }

    hasSafeTiles() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print() {
        var printedBoard = this.playerBoard.map(function(row) {
            return row.join(' | ');
        }).join('\n');
        console.log(printedBoard);
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        var board = [];
        for (var i=0; i < numberOfRows; i++) {
            var row = [];
            for (var j=0; j < numberOfColumns; j++) {
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        var board = [];
        for (var i=0; i < numberOfRows; i++) {
            var row = [];
            for (var j=0; j < numberOfColumns; j++) {
                row.push(null);
            }
            board.push(row);
        }
        var numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
            var randomRowIndex = Math.floor(Math.random() * numberOfRows); 
            var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }
}