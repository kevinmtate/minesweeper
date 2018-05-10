generatePlayerBoard = function(numberOfRows, numberOfColumns) {
    var board = [];
    for (i=0; i < numberOfRows; i++) {
        var row = [];
        for (j=0; j < numberOfColumns; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

generateBombBoard = function(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];
    for (i=0; i < numberOfRows; i++) {
        var row = [];
        for (j=0; j < numberOfColumns; j++) {
            row.push(null);
        }
        board.push(row);
    }

    var numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        // Currently this functionality can add bombs on top of bombs -> this will be fixed later
        var randomRowIndex = Math.floor(Math.random() * numberOfRows); 
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] = 'B') {
            numberOfBombsPlaced++;
        }
    }

    return board;
};

getNumberOfNeighborBombs = function(bombBoard, rowIndex, columnIndex) {
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
    var numberOfRows = bombBoard.length;
    var numberOfColumns = bombBoard[0].length;
    var numberOfBombs = 0;

    neighborOffsets.forEach(function(offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) { 
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

flipTile = function(playerBoard, bombBoard, rowIndex, columnIndex) {
    if (playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    } else if (bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

printBoard = function(board) {
    var printedBoard = board.map(function(row) {
        return row.join(' | ');
    }).join('\n');
    console.log(printedBoard);
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player board: ');
printBoard(playerBoard);
console.log('Bomb board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 2);
console.log('Updated player board:');
printBoard(playerBoard);