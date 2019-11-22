function drawBoard() {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentRow, currentCol, currentSquareColor);
        }
    }

    scoreElement.innerHTML = score;
    speedElement.innerHTML = speed;
}

function drawSquare(y, x, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    if (color == defaultColor) {
        ctx.strokeStyle = defaultBorder;
    }

    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

function randomPiece() {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
    return new Piece(
        PIECES[randomPieceNumber][0],
        PIECES[randomPieceNumber][1],
    );
}

function drop() {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed) {
        piece.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

function CONTROL(event) {

    if (!canMove) {
        return false;
    }

    const moveFunctions = {
        ArrowLeft() {
            piece.moveLeft();
            dropStart = Date.now();
        },
        ArrowRight() {
            piece.moveRight();
            dropStart = Date.now();
        },
        ArrowUp() {
            piece.rotate();
            dropStart = Date.now();
        },
        ArrowDown() {
            piece.moveDown();
        }
    };

    const movePiece = moveFunctions[event.code];
    movePiece();
}

function updateRowAndScore(row) {
    canMove = false;

    for (let y = row; y > 1; y--) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            removeRow(y, currentCol);
        }
    }

    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[0][currentCol] = defaultColor;
    }

    score += 10;

    if (speed > 100) {
        speed -= 20;
    }

    canMove = true;
}

function removeRow(rowToRemove, colToRemove) {
    board[rowToRemove][colToRemove] = board[rowToRemove - 1][colToRemove];
}

function gameOver() {
    let warning = confirm("Game over! Continue?");

    if (warning) {
        resetGame();
    }
}

function resetGame() {
    speed = 500;
    dropStart = Date.now();
    score = 0;

    board = [];
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        board[currentRow] = [];
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            board[currentRow][currentCol] = defaultColor;
        }
    }

    piece = randomPiece();
    drawBoard();
}