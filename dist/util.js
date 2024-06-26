import { canvas } from './environment.js';
import { settings, history, squares, icons } from './setting.js';
import { GameLoop } from './index.js';
/**
 * Loads images from specified paths and returns a map of `img` elements indexed by name.
 * Images are loaded asynchronously.
 * @param { Readonly<string> | string } basePath - The base path to the images.
 * @param { Readonly<string[][]> | string[][] } images - An array of `[imageName, imagePath]` pairs.
 * @param { Function } [callback] - Optional callback that gets executed when all images are loaded.
 * @returns { TImageObj } An object mapping each `imageName` to its corresponding loaded `HTMLImageElement`.
 * @throws { Error } Logs an error to the console if an image fails to load.
 * @example
 * const images = Preload('./path/to/', [['imageName', 'image.extension']], () => {
 *     console.log(images) // Outputs all the images that got loaded
 * });
 */
export function Preload(basePath, images, callback) {
    return [...images].reduce((accumulator, [name, path]) => {
        // Creates new element
        const img = new Image();
        img.src = basePath + path;
        // Checks if the image got loaded or not
        img.onload = () => {
            accumulator[name] = img;
            if (Object.keys(accumulator).length === images.length) {
                GameLoop();
                callback?.();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
        };
        return accumulator;
    }, {});
}
/**
 * Resizes the canvas to fill the current window size.
 * Adjusts square positions based on the new dimensions.
 * Adjusts icons position and size based on the new dimensions.
 * This function should be called on window `load` and window `resize` to ensure the canvas always uses all the available space.
 * @example
 * addEventListener('load', ResizeCanvas);
 * addEventListener('resize', ResizeCanvas);
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
    Object.keys(icons).forEach((icon, index) => {
        const iconSize = PercentageToPixels(settings.pEdge / 3);
        const gap = PercentageToPixels(settings.lineThickness);
        const totalWidth = iconSize * Object.keys(icons).length + gap * (Object.keys(icons).length - 1);
        const x = canvas.width / 2 - totalWidth / 2 + (iconSize + gap) * index;
        icons[icon].x = x;
        icons[icon].y = canvas.height - iconSize * 1.5;
        icons[icon].size = iconSize;
    });
}
/**
 * Calculates the size of the board and the padding needed to center it within a canvas.
 * This function depends on the global variables `canvas` (with width and height properties) and `pEdge` (percentage for edge padding).
 * @returns { Object } An object containing properties for board size, horizontal padding, and vertical padding.
 * @example
 * const dimensions = getBoardDimensions();
 * console.log(`Board size: ${dimensions.boardSize}px`);
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
 * Converts a percentage-based size into pixels, based on the board size.
 * If no board size is provided, the current board dimensions are used.
 * @param { number } n - The size of the object in percent
 * @param { number } [boardSize] - Optional board size in pixels. Defaults to the current board size.
 * @returns { number } The size of the object in pixels
 * @example
 * const size = PercentageToPixels(10); // Converts 10% of the board size to pixels.
 * console.log(size) // Outputs the size in pixels.
 */
export function PercentageToPixels(n, boardSize) {
    return (boardSize ?? GetBoardDimensions().boardSize) * (n / 100);
}
/**
 * Checks if anyone has won the game.
 * @returns { boolean } `true` if anyone has won, otherwise `false`
 * @example
 * if(HasWon()) {
 *     console.log('Someone has won');
 * }
 */
export function HasWon() {
    return Object.keys(history).some((piece) => history[piece].won);
}
export function GetNextPiece() {
    const keys = Object.keys(history);
    return keys[(keys.indexOf(settings.turn) + 1) % keys.length];
}
/**
 * Changes the turn between players.
 * This function should be called after a player is done with there turn.
 * @example
 * ChangeTurn(); // Changes the turn to the next player.
 */
export function ChangeTurn() {
    settings.turn = GetNextPiece();
}
/**
 * Determines if a specific square on the board is already occupied by a piece.
 * @param { coords } position - Coordinates of the square to check.
 * @returns { boolean } `true` if a piece is already placed on that square, otherwise `false`
 * @example
 * if (IsSquareOccupied([0, 0])) {
 *     console.log('This square is occupied');
 * }
 */
export function IsSquareOccupied(position) {
    return Object.keys(history).some((piece) => {
        return history[piece].coords.some((coord) => coord.x === position.x && coord.y === position.y);
    });
}
//# sourceMappingURL=util.js.map