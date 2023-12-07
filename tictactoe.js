document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const message = document.getElementById('message');
  const cells = [];

  let currentPlayer = 'X';
  let winner = null;

  // Create the TicTacToe board
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.addEventListener('click', handleCellClick);
          board.appendChild(cell);
          cells.push(cell);
      }
  }

  // Handle cell click event
  function handleCellClick() {
      const selectedCell = this;

      if (selectedCell.innerHTML === '' && !winner) {
          selectedCell.innerHTML = currentPlayer;
          checkForWinner();
          switchPlayer();
      }
  }

  // Switch players (X to O, O to X)
  function switchPlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  // Check for a winner or a tie
  function checkForWinner() {
      const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
      const cols = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
      const diagonals = [[0, 4, 8], [2, 4, 6]];

      // Check rows, columns, and diagonals for a winner
      for (const line of [...rows, ...cols, ...diagonals]) {
          const [a, b, c] = line;
          if (cells[a].innerHTML !== '' && cells[a].innerHTML === cells[b].innerHTML && cells[b].innerHTML === cells[c].innerHTML) {
              winner = currentPlayer;
              message.innerHTML = `${winner} is the winner!`;
              highlightWinnerCells(line);
              return;
          }
      }

      // Check for a tie
      if (cells.every(cell => cell.innerHTML !== '')) {
          message.innerHTML = 'It\'s a tie!';
      }
  }

  // Highlight the cells that form the winning line
  function highlightWinnerCells(line) {
      for (const index of line) {
          cells[index].style.backgroundColor = '#8cff8c';
      }
  }

  // Reset the game
  window.resetGame = function() {
      cells.forEach(cell => {
          cell.innerHTML = '';
          cell.style.backgroundColor = '#ddd';
      });
      currentPlayer = 'X';
      winner = null;
      message.innerHTML = '';
  };
});
