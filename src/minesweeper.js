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
    return board;

    var numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        // Currently this functionality can add bombs on top of bombs -> this will be fixed later
        var randomRowIndex = Math.floor(Math.random() * numberOfRows); 
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
    }
};

printBoard = function(board) {
    var printedBoard = board.map(function(row) {
        return row.join(' | ');
    }).join('\n');
    console.log(printedBoard);
};

var playerBoard = generatePlayerBoard(3, 3);
var bombBoard = generateBombBoard(3, 4, 5);

console.log(playerBoard);

console.log('Player board: ');
printBoard(playerBoard);