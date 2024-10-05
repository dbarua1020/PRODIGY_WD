const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Handle user click on each cell
cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(cell) {
    const index = cell.dataset.index;

    // Only allow move if cell is empty and game is active
    if (!board[index] && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkForWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (!board.includes(null)) {
        messageElement.textContent = 'It\'s a draw!';
        isGameActive = false;
    }
}

// Reset the game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    messageElement.textContent = '';
    currentPlayer = 'X';
    isGameActive = true;
}
