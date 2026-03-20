const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let mode = "pvp";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }

  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleMove(index) {
  if (!gameActive || cells[index].textContent !== "") return;

  cells[index].textContent = currentPlayer;

  if (checkWin()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  if (mode === "ai" && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  let empty = cells.map((c, i) => c.textContent === "" ? i : null).filter(v => v !== null);
  let move = empty[Math.floor(Math.random() * empty.length)];
  handleMove(move);
}

function checkWin() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
      return true;
    }
  }

  if (cells.every(cell => cell.textContent !== "")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return true;
  }

  return false;
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  createBoard();
}

function setMode(selectedMode) {
  mode = selectedMode;
  restartGame();
}

createBoard();