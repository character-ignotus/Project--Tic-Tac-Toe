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
player1.getName();

// Object that checks for a winner
const checkForWinner = (() => {
    const check = () => {
        let currentBoard = gameboard.returnBoard();
        let currentRound = gameboard.returnRound();
        let currentPlayer;
        let currentIndex;

        if(currentRound%2 == 0) {
            currentPlayer = 'player';
            currentIndex = 'X';
        } else {
            currentPlayer = 'computer';
            currentIndex = 'O';
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

const computer = (() => {
    let computerStatus = true;
    let containersArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

    function logInput(row, column) {
        containersArray[0][row] += 1;
        containersArray[1][column] += 1;

        if(row == column) {
            containersArray[2][row] += 1;
        }

        if((row == 0 && column == 2) || (row == 1 && column == 1) || (row == 2 && column == 0))  {
            containersArray[3][row] += 1;
        }
    };

    const clearComputerInputs = () => {
        containersArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    };

    const computerChoice = (round) => {
        let availableCells = [];

        for(i = 0; i < 3; i++ ) {
            for(j = 0; j < 3; j++) {
                if(typeof gameboard.cellCheck(i, j) === 'undefined') {
                    availableCells.push([i, j]);
                } 
            }
        }
        
        let random = Math.floor(Math.random() * (9 - round ));
        let move = availableCells[random]

        console.log(availableCells);
        console.log(move);

        let cell = document.querySelector(`[data-row-column="${move[0]}${move[1]}"]`);
        cell.textContent = 'O';

        gameboard.logInput(move[0], move[1], 'O');
        logInput(move[0], move[1]);
        logic.checkRound(containersArray, move[0], move[1], round, `computer`);
    };

    return {computerStatus, containersArray, computerChoice, clearComputerInputs};
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