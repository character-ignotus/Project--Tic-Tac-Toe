const gameboard = (() => {
    let gameboardArray = [[], [], []];
    let round = 0;
    const cells = Array.from(document.querySelectorAll('.cell'));

    const bindEvents = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', addInput);
        });
    };

    function addInput(e) {
        let row = e.target.getAttribute('data-row');
        let column = e.target.getAttribute('data-column');

        if(round % 2 == 0) {
            gameboardArray[row][column] = 'X';
            player1.logInput(row, column);
            e.target.textContent = gameboardArray[row][column];
            logic.checkRound(player1.output(), row, column);
            round += 1;
        } else {
            gameboardArray[row][column] = 'O';
            player2.logInput(row, column);
            e.target.textContent = gameboardArray[row][column];
            logic.checkRound(player2.output(), row, column);
            round += 1;
        }
    };

    return {bindEvents};
})();

gameboard.bindEvents();


const Player = () => {
    let containersArray = [];
    let rowContainer = [0, 0, 0];
    let columnContainer = [0, 0, 0];
    let diagonalContainer = [0, 0, 0];
    let inverseDiagonalContainer = [0, 0, 0];

    const logInput = (row, column) => {
        rowContainer[row] += 1;
        columnContainer[column] += 1;
        containersArray[0] = rowContainer;
        containersArray[1] = columnContainer;
        containersArray[2] = diagonalContainer;
        containersArray[3] = inverseDiagonalContainer;

        if(row == column) {
            diagonalContainer[row] += 1;
        }

        if((row == 0 && column == 2) || (row == 1 && column == 1) || (row == 2 && column == 0))  {
            inverseDiagonalContainer[row] += 1;
        }
    };

    const output = () => {
        return containersArray;
    };

    return {containersArray, rowContainer, logInput, output};
};

const player1 = Player();
const player2 = Player();

const logic = (() => {
    const checkRound = (output, row, column) => {
        if(output[0][row] == 3) {
            alert('Winner');
        };

        if(output[1][column] == 3) {
            alert('Winner');
        };

        if((output[2][0] == 1) && (output[2][1] == 1) && (output[2][2] == 1)) {
            alert('Winner');
        };

        if((output[3][0] == 1) && (output[3][1] == 1) && (output[3][2] == 1)) {
            alert('Winner');
        };
    };

    return {checkRound};
})();




