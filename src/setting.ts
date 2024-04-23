export const pEdge: number = 25;
export const lineThickness: number = 2.5;
export const numCells: number = 3;

type TTurn = 'AI' | 'PLAYER';
export let turn: TTurn = 'PLAYER';
export function setTurn(str: TTurn) {
	turn = str;
}
