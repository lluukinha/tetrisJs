const startGame = () => {
    homeElement.classList.add('hidden');

    canMove = true;
    speed = 500;
    dropStart = Date.now();
    score = 0;
    board = [];

    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        board[currentRow] = [];
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            board[currentRow][currentCol] = defaultColor;
        }
    }

    drawBoard();
    drawNext();
    drop();
    document.addEventListener("keydown", CONTROL);
    canMove = true;
}

const quitGame = () => {
    document.removeEventListener("keydown", CONTROL);
    gameOverElement.classList.add("hidden");
    homeElement.classList.remove("hidden");
}

const drawBoard = () => {
    for (let currentRow = 0; currentRow < ROW; currentRow++) {
        for(let currentCol = 0; currentCol < COL; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentRow, currentCol, currentSquareColor);
        }
    }

    for (let scoreElement of scoreElements) scoreElement.innerHTML = score;
    speedElement.innerHTML = readableSpeed[speed]
}

const drawSquare = (y, x, color) => {
    if (ctx.color == color) return;
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
    ctx.strokeStyle = defaultBorder;
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

const randomPiece = () => {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
    return new Piece(...PIECES[randomPieceNumber]);
}

const drop = () => {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed && canMove) {
        piece.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

const CONTROL = (event) => {
    if (!canMove) return false;
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
    if (!!movePiece) {
        event.preventDefault();
        movePiece();
    }
}

const updateRowAndScore = (row) => {
    canMove = false;

    for (let y = row; y > 1; y--) {
        for (let currentCol = 0; currentCol < COL; currentCol++) {
            removeRow(y, currentCol);
        }
    }

    for (let currentCol = 0; currentCol < COL; currentCol++) {
        board[0][currentCol] = defaultColor;
    }

    score += 100;
    if (speed > 60) speed -= 20;

    canMove = true;
}

const removeRow = (rowToRemove, colToRemove) => {
    board[rowToRemove][colToRemove] = board[rowToRemove - 1][colToRemove];
}

const gameOver = () => {
    gameOverElement.classList.remove('hidden');
    canMove = false;
}

const removeGameOver = () => {
    gameOverElement.classList.add('hidden');
}

const resetGame = () => {
    removeGameOver();
    canMove = true;
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
    drawNext();
    drawBoard();
}

const drawNext = () => {
    nextPiece = randomPiece();
    const element = document.getElementById('next-piece');
    element.src=  `images/${nextPiece.image}`;
}