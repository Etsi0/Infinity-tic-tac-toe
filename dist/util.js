import { canvas } from './environment.js';
import { settings, history, squares } from './setting.js';
import { GameLoop } from './index.js';
/**
 * Resizes the canvas to ensure it always fits on the screen.
 */
export function ResizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const { squareSize, inlinePadding, blockPadding } = GetBoardDimensions();
    for (let i = 0; i < settings.numCells; i++) {
        for (let j = 0; j < settings.numCells; j++) {
            const temp = squareSize + PercentageToPixels(settings.lineThickness);
            squares[i][j].x = inlinePadding + j * temp;
            squares[i][j].y = blockPadding + i * temp;
        }
    }
}
/**
 * Calculates the size of the board and the padding needed to center it within a canvas.
 * This function depends on the global variables `canvas` (with width and height properties) and `pEdge` (percentage for edge padding).
 * @returns {Object} An object containing properties for board size, horizontal padding, and vertical padding.
 * @example
 * const sizeInfo = getBoardDimensions();
 * console.log(sizeInfo.boardSize); // Outputs the computed board size
 */
export function GetBoardDimensions() {
    const smallestSide = Math.min(canvas.width, canvas.height);
    const boardSize = smallestSide - (smallestSide / 100) * settings.pEdge;
    const squareSize = (boardSize -
        PercentageToPixels(settings.lineThickness, boardSize) * (settings.numCells - 1)) /
        settings.numCells;
    const inlinePadding = Padding(canvas.width);
    const blockPadding = Padding(canvas.height);
    function Padding(n) {
        return (n - boardSize) / 2;
    }
    return {
        boardSize,
        squareSize,
        inlinePadding,
        blockPadding,
    };
}
/**
 * converts object size from percent to pixels
 * @param {Number} n object size in percent
 * @param {Number} boardSize optional param with the size of the board
 * @returns {Number} object size in pixels
 */
export function PercentageToPixels(n, boardSize) {
    return (boardSize ?? GetBoardDimensions().boardSize) * (n / 100);
}
/**
 *
 * @returns {HTMLImageElement}
 */
export function Preload(images) {
    return images.reduce((accumulator, currentValue) => {
        const img = document.createElement('img');
        img.src = currentValue[1];
        img.onload = () => {
            accumulator[currentValue[0]] = img;
            if (Object.keys(accumulator).length === images.length) {
                GameLoop();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
        };
        return accumulator;
    }, {});
}
export function HasWon() {
    return Object.keys(history).some((piece) => {
        return history[piece].won;
    });
}
export function ChangeTurn() {
    Object.keys(history).forEach((piece) => {
        history[piece].turn = !history[piece].turn;
    });
}
export function IsCellOccupied(x, y) {
    return Object.keys(history).some((piece) => {
        return history[piece].coords.some((coord) => coord.x === x && coord.y === y);
    });
}
//# sourceMappingURL=util.js.map