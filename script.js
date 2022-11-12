const Player = () => {
    let containersArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const logInput = (row, column) => {
        containersArray[0][row] += 1;
        containersArray[1][column] += 1;

        if(row == column) {
            containersArray[2][row] += 1;
        }

        if((row == 0 && column == 2) || (row == 1 && column == 1) || (row == 2 && column == 0))  {
            containersArray[3][row] += 1;
        }
    };

    const output = () => {
        return containersArray;
    };

    const clearPlayerInputs = () => {
        containersArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    };

    return {logInput, output, clearPlayerInputs, containersArray};
};

const player1 = Player();
const player2 = Player();

const logic = (() => {
    function clearGameBoard() {
        gameboard.clearGameboard();
        player1.clearPlayerInputs();
        player2.clearPlayerInputs();
        computer.clearComputerInputs();
    };

    const checkRound = (output, row, column, round, player) => {
        if(output[0][row] == 3) {
            alert(`${player} has won the game!`);
            clearGameBoard();
            return
        };

        if(output[1][column] == 3) {
            alert(`${player} has won the game!`);
            clearGameBoard();
            return
        };

        if((output[2][0] == 1) && (output[2][1] == 1) && (output[2][2] == 1)) {
            alert(`${player} has won the game!`);
            clearGameBoard();
            return
        };

        if((output[3][0] == 1) && (output[3][1] == 1) && (output[3][2] == 1)) {
            alert(`${player} has won the game!`);
            clearGameBoard();
            return
        };

        if(round == 9) {
            alert(`We have a tie`);
            clearGameBoard();
            return
        };
    };

    return {checkRound};
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

const gameboard = (() => {
    let gameboardArray = [[], [], []];
    let round = 0;
    const cells = Array.from(document.querySelectorAll('.cell'));

    const bindEvents = () => {
        cells.forEach(cell => {
            if(computer.computerStatus == true) {
                cell.addEventListener('click', playerVScomputer);
            } else {
                cell.addEventListener('click', playerVSplayer);
            };
        });
    };

    function logRound(player, index, row, column, e, winner) {
        round += 1;
        gameboardArray[row][column] = index;
        player.logInput(row, column);
        e.target.textContent = gameboardArray[row][column];
        logic.checkRound(player.output(), row, column, round, `${winner}`);
    };

    const cellCheck = (row, column) => {
        return gameboardArray[row][column];
    };

    const logInput = (row, column, index) => {
        gameboardArray[row][column] = index;
    };

    const clearGameboard = () => {
        gameboardArray = [[], [], []];
        round = 0;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    function playerVSplayer(e) {
        let row = e.target.getAttribute('data-row');
        let column = e.target.getAttribute('data-column');

        if(round % 2 == 0 && typeof gameboardArray[row][column] === 'undefined') {
            logRound(player1, 'X', row, column, e, 'player1');
        } else if (typeof gameboardArray[row][column] === 'undefined') {
            logRound(player2, 'O', row, column, e, 'player2');
        }

        console.log(round);
        console.log(gameboardArray);
    };

    function playerVScomputer(e) {
        let row = e.target.getAttribute('data-row');
        let column = e.target.getAttribute('data-column');

        logRound(player1, 'X', row, column, e, 'player1');
        if(!round == 0) {
            computer.computerChoice(round);
            round += 1;
        };

        console.log(round);
        console.log(gameboardArray);
    };

    return {bindEvents, clearGameboard, gameboardArray, cellCheck, logInput};
})();

gameboard.bindEvents();