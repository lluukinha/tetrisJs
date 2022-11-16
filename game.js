const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElements = document.getElementsByClassName("score");
const speedElement = document.getElementById("speed");
const homeElement = document.getElementById('home');
const gameOverElement = document.getElementById('game-over');


document.getElementById("startBtn").addEventListener('click', startGame);
document.getElementById("playAgainBtn").addEventListener('click', resetGame);
document.getElementById("quitBtn").addEventListener('click', quitGame);



const ROW = 19;
const COL = 10;
const SQ = 40;
const defaultColor = "#111111";
const defaultBorder = "rgba(255,255,255,0.1)";

let canMove = true;
let speed = 500;
let dropStart = Date.now();
let score = 0;
let board = [];
let piece = randomPiece();
