import { mouse } from './click.js';
import { canvas, ctx } from './environment.js';
import { pEdge, lineThickness, numCells, turn, setTurn } from './setting.js';
import { ResizeCanvas, getBoardDimensions, PercentageToPixels } from './util.js';
import * as Ai from './ai.js';
addEventListener('resize', (event) => ResizeCanvas());
addEventListener('load', (event) => ResizeCanvas());
/*==================================================
    Square cells coordinates and X's and O's history
==================================================*/
export const squares = Array.from({ length: numCells }, (v, row) => Array.from({ length: numCells }, (v, col) => {
    let priority = 0;
    if ((row === 0 && col === 0) ||
        (row === 0 && col === numCells - 1) ||
        (row === numCells - 1 && col === 0) ||
        (row === numCells - 1 && col === numCells - 1)) {
        priority = 1;
    }
    if (numCells % 2 === 1 &&
        row === Math.floor(numCells / 2) &&
        col === Math.floor(numCells / 2)) {
        priority = 2;
    }
    return { x: 0, y: 0, priority: priority };
}));
export function setSquares(position, type, value) {
    squares[position[0]][position[1]][type] = value;
}
export const history = {
    o: [],
    x: [],
};
/*==================================================
    Image preloader
==================================================*/
const images = [
    ['o', '../assets/img/o.svg'],
    ['oHovering', '../assets/img/oHovering.svg'],
    ['x', '../assets/img/x.svg'],
    ['xHovering', '../assets/img/xHovering.svg'],
];
const preloaded = Preload();
function Preload() {
    return images.reduce((accumulator, currentValue) => {
        const img = document.createElement('img');
        img.src = currentValue[1];
        img.onload = () => {
            accumulator[currentValue[0]] = img;
            if (Object.keys(accumulator).length === images.length) {
                GameLoop();
            }
        };
        return accumulator;
    }, {});
}
/*==================================================
    GameLoop
==================================================*/
let oWon = false;
let xWon = false;
function GameLoop() {
    // overwrites previous frame with new background
    ctx.fillStyle = 'hsl(240deg 12% 10% / 100%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // gets the size of the board, padding-inline and padding-block
    const dimensions = getBoardDimensions();
    const squareSize = (dimensions.boardSize - PercentageToPixels(lineThickness) * (numCells - 1)) / numCells;
    oWon = WinConPrep('o');
    xWon = WinConPrep('x');
    const turnText = PercentageToPixels(pEdge / 3);
    ctx.fillStyle = '#fff';
    ctx.font = `${turnText}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${turn === 'PLAYER' ? (oWon ? 'AI' : turn) : xWon ? 'PLAYER' : turn} turn`.toUpperCase(), canvas.width / 2, turnText);
    // Draws the board area
    DrawBoard(dimensions.boardSize, dimensions.inlinePadding, dimensions.blockPadding, squareSize);
    // Draws all the pieces that is on the board
    for (let i = 0; i < numCells; i++) {
        DrawPieces(i, 'o', squareSize);
        DrawPieces(i, 'x', squareSize);
    }
    if (oWon || xWon) {
        ctx.fillStyle = '#fff';
        ctx.font = `${PercentageToPixels(10)}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${oWon ? 'O' : xWon ? 'X' : 'Who'} Won`, canvas.width / 2, canvas.height - turnText);
    }
    if (turn === 'PLAYER' && mouse.click) {
        outerLoop: for (let i = 0; i < numCells; i++) {
            for (let j = 0; j < numCells; j++) {
                //checks x axis
                if (mouse.x < squares[i][j].x || mouse.x > squares[i][j].x + squareSize) {
                    continue;
                }
                //check y axis
                if (mouse.y < squares[i][j].y || mouse.y > squares[i][j].y + squareSize) {
                    continue;
                }
                for (let x = 0; x < numCells; x++) {
                    //checks if index exist in history
                    if (!history.x[x]) {
                        continue;
                    }
                    //checks x axis
                    if (history.x[x].x !== i) {
                        continue;
                    }
                    //check y axis
                    if (history.x[x].y !== j) {
                        continue;
                    }
                    break outerLoop;
                }
                //checks how many pieces you have. if you have `numCells` pieces, the oldest one will get removed so you can add a new one
                if (history.x.length === numCells) {
                    history.x.splice(0, 1);
                }
                //adds new piece
                history.x.push({ x: i, y: j });
                setTurn('AI');
            }
        }
    }
    else if (turn === 'AI') {
        Ai.Play();
        setTurn('PLAYER');
    }
    mouse.click = false;
    if (!oWon && !xWon) {
        requestAnimationFrame(GameLoop);
    }
}
/*==================================================
    DrawBoard
==================================================*/
function DrawBoard(boardSize, inlinePadding, blockPadding, squareSize) {
    ctx.fillStyle = 'hsl(240deg 69% 61% / 100%)';
    ctx.fillRect(inlinePadding, blockPadding, boardSize, boardSize);
    ctx.fillStyle = 'hsl(240deg 12% 10% / 100%)';
    for (let i = 0; i < numCells; i++) {
        for (let j = 0; j < numCells; j++) {
            const xPos = inlinePadding + j * (squareSize + PercentageToPixels(lineThickness));
            const yPos = blockPadding + i * (squareSize + PercentageToPixels(lineThickness));
            ctx.fillRect(xPos, yPos, squareSize, squareSize);
            squares[i][j].x = xPos;
            squares[i][j].y = yPos;
        }
    }
}
/*==================================================
    DrawPieces
==================================================*/
function DrawPieces(n, piece, squareSize) {
    if (!history[piece][n]) {
        return;
    }
    let image = preloaded[piece];
    if (history[piece].length === numCells && n === 0 && !xWon) {
        image = preloaded[`${piece}Hovering`];
    }
    const coordinates = squares[history[piece][n].x][history[piece][n].y];
    ctx.drawImage(image, coordinates.x, coordinates.y, squareSize, squareSize);
}
/*==================================================
    WinConPrep
==================================================*/
function WinConPrep(piece) {
    for (let i = 0; i < history[piece].length; i++) {
        return WinCon(piece, [history[piece][i].x, history[piece][i].y], [0, 0], 1);
    }
}
/*==================================================
    WinCon
==================================================*/
function WinCon(piece, currentValue, direction, count) {
    const checkArray = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
    ];
    const newCount = count + 1;
    if (direction[0] === 0 && direction[1] === 0) {
        // Initial call, no direction set
        for (const dir of checkArray) {
            const nextValue = [currentValue[0] + dir[0], currentValue[1] + dir[1]];
            if (isValidMove(nextValue) && isMatchingPiece(piece, nextValue)) {
                return WinCon(piece, nextValue, dir, newCount);
            }
        }
    }
    else {
        // Direction already set, follow it
        const nextValue = [currentValue[0] + direction[0], currentValue[1] + direction[1]];
        if (isValidMove(nextValue) && isMatchingPiece(piece, nextValue)) {
            if (newCount === numCells) {
                return true;
            }
            else {
                return WinCon(piece, nextValue, direction, newCount);
            }
        }
    }
}
function isValidMove(position) {
    return position[0] >= 0 && position[0] < numCells && position[1] >= 0 && position[1] < numCells;
}
function isMatchingPiece(piece, position) {
    for (let i = 0; i < history[piece].length; i++) {
        if (position[0] === history[piece][i].x && position[1] === history[piece][i].y) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=index.js.map