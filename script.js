// Constants to represent players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Variables to track game state
let currentPlayer = PLAYER_X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Function to create the game board
function createBoard() {
    const boardElement = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }

    // Add container for restart button and winner message
    const bottomContainer = document.createElement('div');
    bottomContainer.classList.add('bottom-container');

    // Add restart button in the middle
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', restartGame);
    bottomContainer.appendChild(restartButton);

    // Add message element to display winner
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    bottomContainer.appendChild(messageElement);

    boardElement.appendChild(bottomContainer);
}

// Function to handle a cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            displayWinner();
        } else if (gameBoard.every(cell => cell !== '')) {
            displayTie();
        } else {
            currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X;
        }
    }
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
        gameBoard[pattern[0]] !== '' &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[1]] === gameBoard[pattern[2]]
    );
}

// Function to display the winner
function displayWinner() {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = `Player ${currentPlayer} wins!`;
}

// Function to display a tie
function displayTie() {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = 'It\'s a tie!';
}

// Function to restart the game
function restartGame() {
    currentPlayer = PLAYER_X;
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    // Clear cell text content
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Clear winner/tie message
    const messageElement = document.querySelector('.message');
    messageElement.textContent = '';
}

// Initialize the game board
createBoard();
