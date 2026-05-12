let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

function getCells() {
  return Array.from(document.querySelectorAll(".cell"));}

function setStatus(message) {
  document.getElementById("status").textContent = message;}

function store() {
  const cells = getCells();

  board = cells.map(function(cell) {
    const value = cell.value.toUpperCase();

    if (value !== "X" && value !== "O") {
      cell.value = "";
      return "";}

    cell.value = value;
    return value;
  });

  return board;}

function reset() {
  getCells().forEach(function(cell) {
    cell.value = "";
    cell.disabled = false;
    cell.classList.remove("computer");
  });

  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  setStatus("Your turn. You are X.");}

function checkWin() {
  store();

  for (let i = 0; i < winningLines.length; i++) {
    const line = winningLines[i];
    const first = board[line[0]];

    if (first && first === board[line[1]] && first === board[line[2]]) {
      gameOver = true;
      disableBoard();
      setStatus(first + " wins!");
      alert(first + " wins!");
      return first;
    }
  }

  if (board.every(function(square) { return square !== ""; })) {
    gameOver = true;
    setStatus("It's a tie!");
    alert("It's a tie!");
    return "Tie";
  }

  return "";}

function darkMode() {
  document.body.classList.toggle("dark");}

function playTurn(index) {
  if (gameOver || board[index] !== "") {
    return;
  }

  const cells = getCells();
  cells[index].value = "X";
  store();

  if (checkWin()) {
    return;
  }

  setStatus("Computer is thinking...");
  setTimeout(computerMove, 350);}

function computerMove() {
  if (gameOver) {
    return;
  }

  const move = chooseComputerMove();

  if (move === -1) {
    checkWin();
    return;
  }

  const cell = document.getElementById("cell" + move);
  cell.value = "O";
  cell.classList.add("computer");
  store();

  if (!checkWin()) {
    setStatus("Your turn. You are X.");
  }}

function chooseComputerMove() {
  const openSquares = board.map(function(square, index) {
    return square === "" ? index : -1;
  }).filter(function(index) {
    return index !== -1;
  });

  if (openSquares.length === 0) {
    return -1;
  }

  // Easier computer difficulty 
  return openSquares[Math.floor(Math.random() * openSquares.length)];}

function disableBoard() {
  getCells().forEach(function(cell) {
    cell.disabled = true;
  });}
