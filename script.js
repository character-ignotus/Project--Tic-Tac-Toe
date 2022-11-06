const gameboard = (() => {
    let gameboardArray = [[], [], []];
    let round = 0;
    const cells = Array.from(document.querySelectorAll('.cell'));

    const bindEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', addInput);
        });
    };

    function logRound(player, index, row, column, e, winner) {
        round += 1;
        gameboardArray[row][column] = index;
        player.logInput(row, column);
        e.target.textContent = gameboardArray[row][column];
        logic.checkRound(player.output(), row, column, round, `${winner}`);
    };

    const clearGameboard = () => {
        gameboardArray = [[], [], []];
        round = 0;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    function addInput(e) {
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

    return {bindEvents, clearGameboard, gameboardArray};
})();

gameboard.bindEvents();


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