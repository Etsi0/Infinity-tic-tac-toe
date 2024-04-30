import { settings, history, checkArray } from './setting.js';

export function Play(): void {
	// Creates the priority board
	const priority = Array.from({ length: settings.numCells }, (v, row) =>
		Array.from({ length: settings.numCells }, (v, col) => 0)
	);

	// computes where it should be placed
	ChangePriority(priority);
	const position = GetPosition(priority);

	// remove piece
	if (history.AI.coords.length === settings.numCells) {
		history.AI.coords.shift();
	}
	// add piece
	history.AI.coords.push({ x: position[0], y: position[1] });
}

function ChangePriority(board: number[][]): void {
	//adds priority to empty squares so the ai know where to place its piece
	//adds more priority if they are about to win or lose
	Object.keys(history).forEach((piece: keyof typeof history) => {
		history[piece].coords.forEach((item) => {
			board[item.x][item.y] = -Infinity;

			// check for collisions on the vertical and horizontal plane
			MiddleHand(piece, board, [item.x, 0], [...checkArray.vertical]);
			MiddleHand(piece, board, [0, item.y], [...checkArray.horizontal]);

			// check for collisions on the diagonal plane
			if (isMiddleOrCorner(item.x, item.y)) {
				MiddleHand(piece, board, [0, 0], [...checkArray.leftDiagonal]);
				MiddleHand(piece, board, [settings.numCells - 1, 0], [...checkArray.rightDiagonal]);
			}
		});
	});
}

function MiddleHand(
	piece: keyof typeof history,
	board: number[][],
	position: number[],
	direction: number[]
): void {
	if (!DoesCollide(piece, position, direction)) {
		ChangeLine(board, position, direction);
		winAndBlock(piece, board, position, direction);
	}
}

function DoesCollide(
	piece: keyof typeof history,
	position: number[],
	direction: number[]
): boolean {
	const keys = Object.keys(history);
	const invertPiece = (piece === keys[0] ? keys[1] : keys[0]) as keyof typeof history;
	return history[invertPiece].coords.some((item) => {
		for (let i = 0; i < settings.numCells; i++) {
			if (
				item.x === position[0] + direction[0] * i &&
				item.y === position[1] + direction[1] * i
			) {
				return true;
			}
		}
	});
}

function ChangeLine(board: number[][], position: number[], direction: number[]): void {
	for (let i = 0; i < settings.numCells; i++) {
		board[position[0] + direction[0] * i][position[1] + direction[1] * i] += 1;
	}
}

function winAndBlock(
	piece: keyof typeof history,
	board: number[][],
	position: number[],
	direction: number[]
): void {
	let piecesInALine = 0;
	for (let i = 0; i < history[piece].coords.length; i++) {
		for (let j = 0; j < settings.numCells; j++) {
			const coord = history[piece].coords[i];
			if (
				coord.x === position[0] + direction[0] * j &&
				coord.y === position[1] + direction[1] * j
			) {
				piecesInALine++;
			}
		}
	}

	if (piecesInALine === settings.numCells - 1) {
		ChangeLine(board, position, direction);
	}
}

function isMiddleOrCorner(row: number, col: number): boolean {
	return isCorner(row, col) || isMiddle(row, col);
}

function isMiddle(row: number, col: number): boolean {
	const middle = Math.floor(settings.numCells / 2);
	return (
		(row === middle || (settings.numCells % 2 === 0 && row === middle - 1)) &&
		(col === middle || (settings.numCells % 2 === 0 && col === middle - 1))
	);
}

function isCorner(row: number, col: number): boolean {
	return (
		(row === 0 || row === settings.numCells - 1) && (col === 0 || col === settings.numCells - 1)
	);
}

function GetPosition(board: number[][]): number[] {
	const positions = PositionsWithHighestNum(board);
	return positions[Math.floor(Math.random() * positions.length)];

	function PositionsWithHighestNum(board: number[][]): number[][] {
		let maxValue: number = -Infinity;
		let maxPositions: number[][] = [];

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				const current = board[i][j];
				if (current > maxValue) {
					maxValue = current;
					maxPositions = [[i, j]];
				} else if (current === maxValue) {
					maxPositions.push([i, j]);
				}
			}
		}

		return maxPositions;
	}
}
