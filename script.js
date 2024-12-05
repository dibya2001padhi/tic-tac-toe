const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const newGameButton = document.getElementById("newGame");
const message = document.getElementById("message");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cellIndex = event.target.getAttribute("data-index");
    
    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWinner()) {
        message.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (isDraw()) {
        message.innerText = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `Player ${currentPlayer}'s turn`;
    }
};

const checkWinner = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const isDraw = () => {
    return gameState.every(cell => cell !== "");
};

const startNewGame = () => {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.innerText = ""));
    message.innerText = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
newGameButton.addEventListener("click", startNewGame);
startNewGame(); // Initialize game on load
