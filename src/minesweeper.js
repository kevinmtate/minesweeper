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
    console.log(board.map(function(row) {
        row.join(' | ');
    }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player board: ');
printBoard(playerBoard);
console.log('Bomb board: ');
printBoard(bombBoard);