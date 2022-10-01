const drawBoard = () => {
    for (let currentRow = 0; currentRow < rowsCount; currentRow++) {
        for(let currentCol = 0; currentCol < columnsCount; currentCol++) {
            const currentSquareColor = board[currentRow][currentCol];
            drawSquare(currentRow, currentCol, currentSquareColor);
        }
    }

    scoreElement.innerHTML = score;
    speedElement.innerHTML = speed;
}

const drawSquare = (y, x, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

    if (color == defaultColor) {
        ctx.strokeStyle = defaultBorder;
    }

    ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

const randomPiece = () => {
    const randomPieceNumber = Math.floor(Math.random() * PIECES.length);
    return new Piece(
        PIECES[randomPieceNumber][0],
        PIECES[randomPieceNumber][1],
    );
}

const drop = () => {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > speed && canMove) {
        piece.moveDown();
        dropStart = Date.now();
    }

    if (canMove) requestAnimationFrame(drop);
}

const CONTROL = (event) => {
    if (!canMove) return;

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

const updateRowAndScore = (row) => {
    canMove = false;

    for (let y = row; y > 1; y--) {
        for (let currentCol = 0; currentCol < columnsCount; currentCol++) {
            removeRow(y, currentCol);
        }
    }

    for (let currentCol = 0; currentCol < columnsCount; currentCol++) {
        board[0][currentCol] = defaultColor;
    }

    score += 10;

    if (speed > 100) speed -= 20;

    canMove = true;
}

const removeRow = (rowToRemove, colToRemove) => {
    board[rowToRemove][colToRemove] = board[rowToRemove - 1][colToRemove];
}

const gameOver = async () => {
    const willContinue = await confirm("Game over! Continue?");
    if (willContinue) {
        resetGame();
    } else {
        canMove = false;
        speed = 0;
    }

}

const resetGame = () => {
    speed = 500;
    dropStart = Date.now();
    score = 0;
    board = [];

    for (let currentRow = 0; currentRow < rowsCount; currentRow++) {
        board[currentRow] = [];
        for(let currentCol = 0; currentCol < columnsCount; currentCol++) {
            board[currentRow][currentCol] = defaultColor;
        }
    }

    piece = randomPiece();
    drawBoard();
}