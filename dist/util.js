import { canvas } from './environment.js';
import { pEdge } from './setting.js';
/**
 * Resizes the canvas so it's always fullscreen
 */
export function ResizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
/**
 * Calculates the size of the board and the padding needed to center it within a canvas.
 * This function depends on the global variables `canvas` (with width and height properties) and `pEdge` (percentage for edge padding).
 * @returns {Object} An object containing properties for board size, horizontal padding, and vertical padding.
 * @example
 * const sizeInfo = getBoardDimensions();
 * console.log(sizeInfo.boardSize); // Outputs the computed board size
 */
export function getBoardDimensions() {
    const boardSize = Math.min(canvas.width, canvas.height) -
        (Math.min(canvas.width, canvas.height) / 100) * pEdge;
    const inlinePadding = (canvas.width - boardSize) / 2;
    const blockPadding = (canvas.height - boardSize) / 2;
    return {
        boardSize,
        inlinePadding,
        blockPadding,
    };
}
/**
 * converts object size from percent to pixels
 * @param n | object size in percent
 * @returns object size in pixels
 */
export function PercentageToPixels(n) {
    return getBoardDimensions().boardSize * (n / 100);
}
//# sourceMappingURL=util.js.map