const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");
const speedElement = document.getElementById("speed");

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
for (let currentRow = 0; currentRow < ROW; currentRow++) {
    board[currentRow] = [];
    for(let currentCol = 0; currentCol < COL; currentCol++) {
        board[currentRow][currentCol] = defaultColor;
    }
}

drawBoard();

const PIECES = [
    [Z, 'red', 'z.png'],
    [S, 'green', 's.png'],
    [T, 'yellow', 't.png'],
    [O, 'blue', 'o.png'],
    [L, 'purple', 'l.png'],
    [I, 'cyan', 'i.png'],
    [J, 'orange', 'j.png'],
];

let piece = randomPiece();
drawNextImage();
drop();

document.addEventListener("keydown", CONTROL);

function drawNextImage() {
    nextPiece = randomPiece();
    const element = document.getElementById('next-piece');
    element.src=  `images/${nextPiece.image}`;
}