// Player Object
const Player = () => {
    let playerName;

    const getName = (name) => {
        playerName = name;
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
    let computerStatus;

    const toggleStatus = () => {
        if(computerStatus === true) {
            computerStatus = false;
        } else {
            computerStatus = true;
        };
    };

    const getCurrentStatus = () => computerStatus;

    const computerMove = (board) => {
        let optimalScore = Infinity;
        let optimalMove;
        for(let i = 0; i < 3; i++ ) {
            for(let j = 0; j < 3; j++) {
                if(typeof board[i][j] === 'undefined' || board[i][j] === '') {
                    gameboard.logComputerRound(i, j, 'O');
                    let score = algorithm.minimax(board, true);
                    gameboard.logComputerRound(i, j, '');
                    if(score < optimalScore) {
                        optimalScore = score;
                        optimalMove = [i, j];
                    }
                } 
            }
        };
        let cell = document.querySelector(`[data-row-column="${optimalMove[0]}${optimalMove[1]}"]`);
        setTimeout(function(){
            cell.textContent = 'O';
        }, 750);
        gameboard.logComputerRound(optimalMove[0], optimalMove[1], 'O');
    };

    const returnStatus = () => {
        return computerStatus;
    };

    return {computerMove, returnStatus, toggleStatus, getCurrentStatus};
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

    const winnerAnnouncement = document.querySelector('.winner');

    let cells = Array.from(document.querySelectorAll('.cell'));

    let bindEvents = () => {
        cells.forEach(cell => {
            if(computer.getCurrentStatus()) {
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
            // alert(`${result} has won!`);
            winnerAnnouncement.textContent = `${result} has won!`;
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
                // alert(`${result} has won!`);
                setTimeout(function(){
                    winnerAnnouncement.textContent = `${result} has won!`;
                }, 750);
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

    const restartBoard = () => {
        board = [[], [], []];
        round = 0;
        cells.forEach(cell => {
            if(!computer.getCurrentStatus()) {
                cell.removeEventListener('click', playerVScomputer);
                cell.textContent = '';
            } else {
                cell.removeEventListener('click', playerVSplayer);
                cell.textContent = '';
            };
        });
    };

    return {bindEvents, logComputerRound, returnBoard, returnRound, increaseRound, decreaseRound, returnScores, restartBoard};
})();

//Minimax algorithm
const algorithm = (() => {
    const minimax = (board, isMaximazing) => {
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

    return {minimax};
})();

const helperFunctions = (() => {
    const equals = (args, a, b, c, d, e, f, g) => {
        if(args[a][b] == g && args[c][d] == g && args[e][f] == g) {
            return true;
        };
    };

    return {equals};
})();

// DOM Manipulation
const domObject = (() => {
    const mainSection = document.querySelector('.main-section');
    const btnSection = document.querySelector('.button-section');
    const initSection = document.querySelector('.initial-section'); 

    mainSection.style.display = 'none';
    btnSection.style.display = 'none';

    const modalOne = document.querySelector('.modal-1');
    const modalTwo = document.querySelector('.modal-2');
    const initialInputOne = document.querySelector('.PvP-Mode');
    const initialInputTwo = document.querySelector('.PvC-Mode');
    const gameModeBtn = document.querySelector('.game-mode');
    const restartBtn = document.querySelector('.restart-btn');
    const playerInput = document.querySelector('#player');
    const initPlayerInput = document.querySelector('#playerInit');
    const playerOneInput = document.querySelector('#playerOne');
    const playerTwoInput = document.querySelector('#playerTwo');
    const initPlayerOneInput = document.querySelector('#playerOneInit');
    const initPlayerTwoInput = document.querySelector('#playerTwoInit');
    const submitBtnOne = document.querySelector('.submit-player-names');
    const submitBtnTwo = document.querySelector('.submit-player-name');
    const closeModalOne = document.querySelector('.close-button-1');
    const closeModalTwo = document.querySelector('.close-button-2');
    const winnerAnnouncement = document.querySelector('.winner');

    const pvP = document.querySelector('.PvP');
    const pvC = document.querySelector('.PvC');

    pvP.addEventListener('click', () => {
        if(initPlayerOneInput.value !== '' && initPlayerTwoInput.value !== '') {
            player1.getName(initPlayerOneInput.value);
            player2.getName(initPlayerTwoInput.value);
            initSection.style.display = 'none';
            gameModeBtn.textContent = 'PvC';
            mainSection.style.display = null;
            btnSection.style.display = null;
            gameboard.bindEvents();
        };
    });

    pvC.addEventListener('click', () => {
        if(initPlayerInput.value !== '') {
            player1.getName(initPlayerInput.value);
            initSection.style.display = 'none';
            gameModeBtn.textContent = 'PvP';
            mainSection.style.display = null;
            btnSection.style.display = null;
            computer.toggleStatus();
            gameboard.bindEvents();
        };
    });

    gameModeBtn.addEventListener('click', () => {
        if(gameModeBtn.textContent == 'PvP') {
            gameModeBtn.textContent = 'PvC';
            modalOne.showModal();
        } else {
            gameModeBtn.textContent = 'PvP';
            modalTwo.showModal();
        };
    });

    if(submitBtnOne) {
        submitBtnOne.addEventListener('click', () => {
            if(playerOneInput.value !== '' && playerTwoInput.value !== '') {
                winnerAnnouncement.textContent = '';
                player1.getName(playerOneInput.value);
                player2.getName(playerTwoInput.value);
                computer.toggleStatus();
                gameboard.restartBoard();
                gameboard.bindEvents();
            };
        });
    };

    if(submitBtnTwo) {
        submitBtnTwo.addEventListener('click', () => {
            if(playerInput.value !== '') {
                winnerAnnouncement.textContent = '';
                player1.getName(playerInput.value);
                computer.toggleStatus();
                gameboard.restartBoard();
                gameboard.bindEvents();
            };
        });
    };

    closeModalOne.addEventListener('click', () => {
        modalOne.close();
    });
    
    closeModalTwo.addEventListener('click', () => {
        modalTwo.close();
    });

    restartBtn.addEventListener('click', () => {
        winnerAnnouncement.textContent = '';
        gameboard.restartBoard();
        gameboard.bindEvents();
    });

    return {gameModeBtn};
})();









