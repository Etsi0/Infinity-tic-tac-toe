import { settings, history, checkArray } from './setting.js';
/**
 * Main function to initiate the play for AI. It calculates the best position to place a piece on the board
 * based on board state.
 */
export function Play() {
    // Creates the priority board
    const priority = Array.from({ length: settings.numCells }, (_, row) => Array.from({ length: settings.numCells }, (_, col) => 0));
    // computes where it should be placed
    ChangePriority(priority);
    const position = GetCoordinate(priority);
    // remove piece
    if (history[settings.turn].coords.length === settings.numCells) {
        history[settings.turn].coords.shift();
    }
    // add piece
    history[settings.turn].coords.push(position);
}
/**
 * Updates the priority for each square on the board, so the AI can decide the best move.
 * @param { number[][] } board - An array with the priorities for each square.
 */
function ChangePriority(board) {
    //adds priority to squares that is not occupied so the ai know where to place its piece
    //adds more priority if they are about to win or lose
    Object.keys(history).forEach((piece) => {
        history[piece].coords.forEach((coord) => {
            board[coord.y][coord.x] = -Infinity;
            // check for collisions on the vertical and horizontal plane
            MiddleHand(piece, board, { x: coord.x, y: 0 }, checkArray.vertical);
            MiddleHand(piece, board, { x: 0, y: coord.y }, checkArray.horizontal);
            // check for collisions on the diagonal plane
            if (coord.x === coord.y) {
                MiddleHand(piece, board, { x: 0, y: 0 }, checkArray.leftDiagonal);
            }
            if (settings.numCells - 1 - coord.x === coord.y) {
                MiddleHand(piece, board, { x: settings.numCells - 1, y: 0 }, checkArray.rightDiagonal);
            }
        });
    });
}
/**
 * Adjusts the priority of board if they can get all pieces in a from that position and in that direction.
 * @param { keyof typeof history } piece - The current piece type being analyzed.
 * @param { number[][] } board - An array with the priorities for each square.
 * @param { coords } position - The starting position for checking.
 * @param { coords } direction - The direction to check and adjust.
 */
function MiddleHand(piece, board, position, direction) {
    if (CanMakeLine(piece, position, direction)) {
        ChangeLine(board, position, direction);
        WinAndBlock(piece, board, position, direction);
    }
}
/**
 * Checks if it is possible to make a line without colliding into a opponent's piece.
 * @param { keyof typeof history } piece - The piece type.
 * @param { coords } position - The starting position for the check.
 * @param { coords } direction - The direction vector for the check.
 * @returns { boolean } True if there is a collision; otherwise, false.
 */
function CanMakeLine(piece, position, direction) {
    const keys = Object.keys(history);
    const key = keys.indexOf(piece);
    for (let i = 0; i < keys.length; i++) {
        if (i === key) {
            continue;
        }
        return !history[keys[i]].coords.some((coord) => {
            for (let i = 0; i < settings.numCells; i++) {
                if (coord.x === position.x + direction.x * i &&
                    coord.y === position.y + direction.y * i) {
                    return true;
                }
            }
        });
    }
}
/**
 * Gives a line more priority if it's about to win or lose.
 * @param { keyof typeof history } piece - The piece type.
 * @param { number[][] } board - An array with the priorities for each square.
 * @param { coords } position - The starting position.
 * @param { coords } direction - The direction of alignment.
 */
function WinAndBlock(piece, board, position, direction) {
    let piecesInALine = 0;
    for (let i = 0; i < history[piece].coords.length; i++) {
        for (let j = 0; j < settings.numCells; j++) {
            const coord = history[piece].coords[i];
            if (coord.x === position.x + direction.x * j &&
                coord.y === position.y + direction.y * j) {
                piecesInALine++;
            }
        }
    }
    if (piecesInALine === settings.numCells - 1) {
        ChangeLine(board, position, direction);
    }
}
/**
 * Modifies the priority along a line determined by a starting position and direction.
 * @param { number[][] } board - An array with the priorities for each square.
 * @param { coords } position - The starting position.
 * @param { coords } direction - The direction to change.
 */
function ChangeLine(board, position, direction) {
    for (let i = 0; i < settings.numCells; i++) {
        board[position.y + direction.y * i][position.x + direction.x * i] += 1;
    }
}
/**
 * Determines the best coordinates to place a piece on depending on witch square has the highest priority.
 * @param { number[][] } board - An array with the priorities for each square.
 * @returns { coords } The coordinates to place the piece on.
 * @example
 * console.log(GetCoordinate([[0, 1, 3, 2], [1, 4, 2, 6], [3, 3, 6, 5]])) // returns { x: 3, y: 1 } or { x: 2, y: 2 }
 */
function GetCoordinate(board) {
    const positions = CoordsWithHighestPriority(board);
    return positions[Math.floor(Math.random() * positions.length)];
}
/**
 * Finds the coordinates with the highest priority on the board.
 * @param { number[][] } board - An array with the priorities for each square.
 * @returns { coords[] } Object containing the x and y coordinates of the squares with the highest priority.
 * @example
 * console.log(CoordinatesWithHighestPriority([[0, 1, 3, 2], [1, 4, 2, 6], [3, 3, 6, 5]])) // returns [{ x: 3, y: 1 }, { x: 2, y: 2 }] because 6 is the biggest number
 */
function CoordsWithHighestPriority(board) {
    let maxValue = -Infinity;
    let maxPositions = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const current = board[i][j];
            if (current > maxValue) {
                maxValue = current;
                maxPositions = [{ x: j, y: i }];
            }
            else if (current === maxValue) {
                maxPositions.push({ x: j, y: i });
            }
        }
    }
    return maxPositions;
}
//# sourceMappingURL=ai.js.map