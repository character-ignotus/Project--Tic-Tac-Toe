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

        console.log(row);
        console.log(column);
    };

    return {bindEvents};
})();

gameboard.bindEvents();