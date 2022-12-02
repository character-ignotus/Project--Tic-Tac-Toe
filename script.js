// Player Object
const Player = () => {
    let playerName;

    const getName = () => {
        playerName = prompt('Enter your name');
    };

    const returnName = () => {
        return playerName;
    };

    return {getName, returnName};
};

const player1 = Player();
const player2 = Player();

// Computer Object
const computer = (() => {
    const computerStatus = true;

    const computerMove = (board) => {
        let optimalScore = Infinity;
        let optimalMove;
        for(let i = 0; i < 3; i++ ) {
            for(let j = 0; j < 3; j++) {
                if(typeof board[i][j] === 'undefined' || board[i][j] === '') {
                    gameboard.logComputerRound(i, j, 'O');
                    let score = minimax(board, true);
                    gameboard.logComputerRound(i, j, '');
                    if(score < optimalScore) {
                        optimalScore = score;
                        optimalMove = [i, j];
                    }
                } 
            }
        };
        let cell = document.querySelector(`[data-row-column="${optimalMove[0]}${optimalMove[1]}"]`);
        cell.textContent = 'O';
        gameboard.logComputerRound(optimalMove[0], optimalMove[1], 'O');
    };

    const returnStatus = () => {
        return computerStatus;
    };

    return {computerMove, returnStatus};
})();

// Object that checks for a winner
const checkForWinner = (() => {
    const check = () => {
        let currentBoard = gameboard.returnBoard();
        let currentRound = gameboard.returnRound();
        let currentPlayer;
        let currentIndex;

        if (computer.returnStatus()) {
            if(currentRound%2 == 0) {
                currentPlayer = 'player';
                currentIndex = 'X';
            } else {
                currentPlayer = 'computer';
                currentIndex = 'O';
            } 
        } else {
            if(currentRound%2 == 0) {
                currentPlayer = player1.returnName();
                currentIndex = 'X';
            } else {
                currentPlayer = player2.returnName();
                currentIndex = 'O';
            } 
        };

        for(i=0; i<3; i++) {
            if (helperFunctions.equals(currentBoard, i, 0, i, 1, i, 2, currentIndex)) return currentPlayer;
        };

        for(i=0; i<3; i++) {
            if (helperFunctions.equals(currentBoard, 0, i, 1, i, 2, i, currentIndex)) return currentPlayer;
        };

        if (helperFunctions.equals(currentBoard, 0, 0, 1, 1, 2, 2, currentIndex)) return currentPlayer;

        if (helperFunctions.equals(currentBoard, 0, 2, 1, 1, 2, 0, currentIndex)) return currentPlayer;

        if(currentRound == 8) return 'tie';

        return null;
    };

    return {check};
})();

// Gameboard object
const gameboard = (() => {
    let board = [[], [], []];
    let round = 0;
    let scores = {
        'player': 1,
        'computer': -1,
        'tie': 0
    };

    const cells = Array.from(document.querySelectorAll('.cell'));

    const bindEvents = () => {
        cells.forEach(cell => {
            if(computer.returnStatus() === true) {
                cell.addEventListener('click', playerVScomputer);
            } else {
                cell.addEventListener('click', playerVSplayer);
            };
        });
    };

    function logPlayerRound(row, column, e, index) {
        board[row][column] = index;
        e.target.textContent = board[row][column];
        let result = checkForWinner.check();
        if(result !== null) {
            alert(`${result} has won!`);
        };
        round += 1;
    };

    const logComputerRound = (row, column, index) => {
        board[row][column] = index;
    };

    const increaseRound = () => {
        round += 1;
    };

    const decreaseRound = () => {
        round -= 1;
    };

    const returnBoard = () => {
        return board;
    };

    const returnRound = () => {
        return round;
    };

    const returnScores = () => {
        return scores;
    };

    function playerVScomputer(e) {
        let row = e.target.getAttribute('data-row');
        let column = e.target.getAttribute('data-column');

        if(e.target.textContent == '') {
            logPlayerRound(row, column, e, 'X');
            computer.computerMove(board);
            let result = checkForWinner.check();
            if(result !== null) {
                alert(`${result} has won!`);
            };
            round += 1;
        };
    };

    function playerVSplayer(e) {
        let row = e.target.getAttribute('data-row');
        let column = e.target.getAttribute('data-column');

        if(round % 2 == 0 && typeof board[row][column] === 'undefined') {
            logPlayerRound(row, column, e, 'X');
        } else if (typeof board[row][column] === 'undefined') {
            logPlayerRound(row, column, e, 'O');
        };
    };

    return {bindEvents, logComputerRound, returnBoard, returnRound, increaseRound, decreaseRound, returnScores};
})();

gameboard.bindEvents();

//Minimax algorithm
function minimax(board, isMaximazing) {
    let result = checkForWinner.check();
    
    if(result !== null) {
        let score = gameboard.returnScores()[result];
        return score;
    };

    if(isMaximazing) {
        let optimalScore = -Infinity;
        for(let i = 0; i < 3; i++ ) {
            for(let j = 0; j < 3; j++) {
                if(typeof board[i][j] === 'undefined' || board[i][j] === '') {
                    let k = i;
                    let l = j;
                    gameboard.logComputerRound(i, j, 'X');
                    gameboard.increaseRound();
                    let score = minimax(board, false);
                    // Clear board and return actual round
                    gameboard.logComputerRound(i, j, '');
                    gameboard.decreaseRound();
                    if(score > optimalScore) {
                        optimalScore = score;
                    };
                }; 
            };
        };
        return optimalScore;
    } else {
        let optimalScore = Infinity;
        for(let i = 0; i < 3; i++ ) {
            for(let j = 0; j < 3; j++) {
                if(typeof board[i][j] === 'undefined' || board[i][j] === '') {
                    let k = i;
                    let l = j;
                    gameboard.logComputerRound(i, j, 'O');
                    gameboard.increaseRound();
                    let score = minimax(board, true);
                    // Clear board and return actual round
                    gameboard.logComputerRound(i, j, '');
                    gameboard.decreaseRound();
                    if(score < optimalScore) {
                        optimalScore = score;
                    };
                }; 
            };
        };
        return optimalScore;
    }
};

const helperFunctions = (() => {
    const equals = (args, a, b, c, d, e, f, g) => {
        if(args[a][b] == g && args[c][d] == g && args[e][f] == g) {
            return true;
        };
    };

    const gameMode = () => {
        if(!computer.returnStatus()) {
            player1.getName();
            player2.getName();
        } else {
            player1.getName();
        };
    };

    return {equals, gameMode};
})();

helperFunctions.gameMode()