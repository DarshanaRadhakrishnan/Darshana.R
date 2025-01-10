const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;


const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');
  
    if (gameState[index] === '' && isGameActive) {
      gameState[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('taken');
  
      if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
      } else if (gameState.every(cell => cell !== '')) {
        message.textContent = `It's a draw!`;
        isGameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }
  
  
  function checkWinner() {
    return winningCombinations.some(combination => {
      return combination.every(index => gameState[index] === currentPlayer);
    });
  }
  
function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('taken');
    });
  }
  
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
  

  message.textContent = `Player ${currentPlayer}'s turn`;
  