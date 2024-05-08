import { canvas } from './environment.js';
import { history, icons, settings, squares } from './setting.js';
import { ChangeTurn, GetBoardDimensions, HasWon, IsSquareOccupied, coords } from './util.js';
import * as Ai from './ai.js';

//* only change this array when the mouse moves or clicks
//* disable click at the end of the GameLoop so the click gets only triggered on one frame
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

	ChangeCursorState();
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

// Disables so the right click menu doesn't popup
document.addEventListener('contextmenu', (event) => event.preventDefault());

/**
 * Changes the cursor state so the user knows if they can click on the item they are hovering over or not
 */
function ChangeCursorState(): void {
	document.body.style.cursor = '';

	Object.keys(icons).forEach((item: keyof typeof icons) => {
		const icon = icons[item];
		if (InsideObject(icon, icon.size)) {
			document.body.style.cursor = 'pointer';
		}
	});

	if (GetSquare()) {
		document.body.style.cursor = 'pointer';
	}
}

/**
 * Checks if a cell has been selected and if it's not occupied.
 * Delays the AI's move to simulate thinking time.
 *
 * Opens link if you click on a icon
 */
export function CheckClick(): void {
	// place piece on the board
	if (!HasWon()) {
		if (!history[settings.turn].isAI && mouse.click) {
			const selectedCell = GetSquare();
			if (selectedCell && !IsSquareOccupied({ x: selectedCell.x, y: selectedCell.y })) {
				UpdatePlayerHistory({ x: selectedCell.x, y: selectedCell.y });
				ChangeTurn();
			}
		} else if (history[settings.turn].isAI && !settings.thinking) {
			settings.thinking = true;
			setTimeout(() => {
				Ai.Play();
				ChangeTurn();
				settings.thinking = false;
			}, Math.random() * 1000);
		}
	}

	// click on icons
	if (mouse.click) {
		Object.keys(icons).forEach((item: keyof typeof icons) => {
			const icon = icons[item];
			if (InsideObject(icon, icon.size)) {
				window.open(icon.link, '_blank');
			}
		});
	}
}

/**
 * Iterates through all cells and uses InsideSquare to check if the click is within a cell's boundaries.
 * @returns { coords | null } The coordinates of the cell that has been clicked, otherwise null.
 */
function GetSquare(): coords | null {
	for (let row = 0; row < settings.numCells; row++) {
		for (let col = 0; col < settings.numCells; col++) {
			if (InsideObject(squares[row][col], GetBoardDimensions().squareSize)) {
				return { x: col, y: row };
			}
		}
	}
	return null;
}

/**
 * Checks if the mouse is inside the specified object based on the mouse's current position.
 * @param { coords } position - The x and y axis of the object to check.
 * @param { number } size - The size of the object to check
 * @returns { boolean } `true` if the click is inside the square, otherwise `false`.
 * @example
 * if (InsideObject({x: 100, y: 200}, 300)) {
 *     console.log('Mouse is inside this object')
 * }
 */
function InsideObject(position: coords, size: number): boolean {
	return (
		mouse.x >= position.x &&
		mouse.x <= position.x + size &&
		mouse.y >= position.y &&
		mouse.y <= position.y + size
	);
}

/**
 * Updates the player's move history.
 * If the history exceeds the number of cells, it removes the oldest entry.
 * @param { coords } coordinates - The x and y coordinates of the player's latest move.
 */
function UpdatePlayerHistory(coordinates: coords): void {
	if (history[settings.turn].coords.length === settings.numCells) {
		history[settings.turn].coords.shift();
	}
	history[settings.turn].coords.push(coordinates);
}
