import { canvas } from './environment.js';
import { history, settings, squares } from './setting.js';
import { ChangeTurn, GetBoardDimensions, HasWon, IsCellOccupied } from './util.js';
import * as Ai from './ai.js';

export const mouse = {
	click: false,
	x: 0,
	y: 0,
};

// Update mouse position whenever it moves
document.addEventListener('mousemove', (event) => {
	const rect = canvas.getBoundingClientRect();
	mouse.x = event.clientX - rect.left;
	mouse.y = event.clientY - rect.top;
});

// Register player clicks
document.addEventListener('mousedown', (event) => {
	switch (event.buttons) {
		case 1:
			mouse.click = true;
			break;
		case 2:
			// Right click
			break;
		case 4:
			// Middle click
			break;
		case 8:
			// 4th button
			break;
		case 16:
			// 5th button
			break;
		default:
		// A button that is not added above
	}
});

document.addEventListener('contextmenu', (event) => event.preventDefault());

/*==================================================
	Place down piece
==================================================*/
export function CheckClick(): void {
	if (!HasWon()) {
		if (history.PLAYER.turn && mouse.click) {
			const selectedCell = GetSelectedCell();
			if (selectedCell && !IsCellOccupied(selectedCell.col, selectedCell.row)) {
				UpdatePlayerHistory(selectedCell.row, selectedCell.col);
				ChangeTurn();
			}
		} else if (history.AI.turn && !settings.thinking) {
			settings.thinking = true;
			setTimeout(() => {
				Ai.Play();
				ChangeTurn();
				settings.thinking = false;
			}, Math.random() * 1000);
		}
	}
}

function GetSelectedCell(): { row: number; col: number } | null {
	for (let row = 0; row < settings.numCells; row++) {
		for (let col = 0; col < settings.numCells; col++) {
			if (ClickInsideSquare(row, col)) {
				return { row, col };
			}
		}
	}
	return null;
}

function ClickInsideSquare(row: number, col: number): boolean {
	const { squareSize } = GetBoardDimensions();
	const square = squares[row][col];
	return (
		mouse.x >= square.x &&
		mouse.x <= square.x + squareSize &&
		mouse.y >= square.y &&
		mouse.y <= square.y + squareSize
	);
}

function UpdatePlayerHistory(row: number, col: number): void {
	if (history.PLAYER.coords.length === settings.numCells) {
		history.PLAYER.coords.shift();
	}
	history.PLAYER.coords.push({ x: col, y: row });
}
