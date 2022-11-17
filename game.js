const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElements = document.getElementsByClassName("score");
const speedElement = document.getElementById("speed");
const homeElement = document.getElementById('home');
const gameOverElement = document.getElementById('game-over');

const ROW = 19;
const COL = 10;
const SQ = 40;
const defaultColor = "#111222";

let isGameOver = false;
let isHomeScreen = true;
let canMove = true;
let speed = 500;
let dropStart = Date.now();
let score = 0;
let board = [];
let piece = randomPiece();

const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const quitBtn = document.getElementById("quitBtn");

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', resetGame);
quitBtn.addEventListener('click', quitGame);
document.addEventListener("keydown", CONTROL);
