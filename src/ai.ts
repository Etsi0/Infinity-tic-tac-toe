import { numCells } from './setting.js';
import { squares, setSquares, history } from './index.js';

export function Play() {
	for (let i = 0; i < numCells; i++) {
		for (let j = 0; j < numCells; j++) {
			for (let x = 0; x < numCells; x++) {
				if (!history.x[x]) {
					continue;
				}
				if (squares[i][j].x !== history.x[x].x || squares[i][j].y !== history.x[x].y) {
					continue;
				}
				ChangeWeight([i, j]);
			}
		}
	}
}

function ChangeWeight(position: number[]) {
	setSquares(position, 'priority', -Infinity);
	for (let i = 0; i < numCells; i++) {
		for (let j = 0; j < numCells; j++) {
			squares;
		}
	}
}
