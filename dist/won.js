import { settings, history, checkArray } from './setting.js';
/*==================================================
    WinConPrep
==================================================*/
export function WinConPrep(piece) {
    // Sorts the array so we only need to take the element that is the farthest up and look down from there.
    const sortedHistory = structuredClone(history[piece].coords).sort((a, b) => {
        return a.y === b.y ? a.x - b.x : a.y - b.y;
    });
    if (!sortedHistory[0]) {
        return false;
    }
    return WinCon(piece, [sortedHistory[0].x, sortedHistory[0].y], [0, 0], 1);
}
/*==================================================
    WinCon
==================================================*/
function WinCon(piece, currentValue, direction, count) {
    const newCount = count + 1;
    if (direction[0] === 0 && direction[1] === 0) {
        // Initial call, no direction set
        for (const dir in checkArray) {
            const nextValue = [
                currentValue[0] + checkArray[dir][0],
                currentValue[1] + checkArray[dir][1],
            ];
            if (IsValidMove(nextValue) && IsMatchingPiece(piece, nextValue)) {
                return WinCon(piece, nextValue, [...checkArray[dir]], newCount);
            }
        }
    }
    else {
        // Direction already set, follow it
        const nextValue = [currentValue[0] + direction[0], currentValue[1] + direction[1]];
        if (IsValidMove(nextValue) && IsMatchingPiece(piece, nextValue)) {
            if (newCount === settings.numCells) {
                return true;
            }
            else {
                return WinCon(piece, nextValue, direction, newCount);
            }
        }
    }
}
function IsValidMove(position) {
    return (position[0] >= 0 &&
        position[0] < settings.numCells &&
        position[1] >= 0 &&
        position[1] < settings.numCells);
}
function IsMatchingPiece(piece, position) {
    return history[piece].coords.some((item) => position[0] === item.x && position[1] === item.y);
}
//# sourceMappingURL=won.js.map