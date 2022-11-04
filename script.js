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
            round += 1;
        } else {
            gameboardArray[row][column] = 'O';
            player2.logInput(row, column);
            e.target.textContent = gameboardArray[row][column];
            round += 1;
        }
    
        console.log(gameboardArray);
        console.log(player1.array);
        console.log(player2.array);
    };

    return {bindEvents};
})();

gameboard.bindEvents();


const Player = () => {
    let array = [[], [], []];

    const logInput = (row, column) => {
        array[row][column] = 1;
    };

    return {array, logInput};
};

const player1 = Player();
const player2 = Player();