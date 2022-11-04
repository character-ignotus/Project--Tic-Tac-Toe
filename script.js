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
            e.target.textContent = gameboardArray[row][column];
            round += 1;
        } else {
            gameboardArray[row][column] = 'O';
            e.target.textContent = gameboardArray[row][column];
            round += 1;
        }

        console.log(row);
        console.log(column);
        console.log(gameboardArray);
    };

    return {bindEvents};
})();

gameboard.bindEvents();