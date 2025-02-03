const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;

// Win conditions (indices of cells)
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Handle cell click
function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }
  if (checkDraw()) {
    status.textContent = "It's a draw! 😅";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

// Check for a draw
function checkDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

// Reset game
function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);