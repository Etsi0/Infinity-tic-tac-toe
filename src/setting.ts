import { Preload } from './util.js';

/*==================================================
	Types
==================================================*/
type TCoords = {
	x: number;
	y: number;
};

type TSettings = {
	pEdge: number;
	lineThickness: number;
	numCells: number;
	thinking: boolean;
};

type TPiece = {
	coords: TCoords[];
	turn: boolean;
	won: boolean;
};
type THistory = {
	AI: TPiece;
	PLAYER: TPiece;
};

/*==================================================
	Settings
==================================================*/
export const settings: TSettings = {
	pEdge: 25, // How far from the edge in percent
	lineThickness: 2.5, // How thick the lines should be in percent
	numCells: 3, // How many cells it should be per row
	thinking: false, //* Must start as false otherwise the game will soft lock
};

/*==================================================
	Image preloader
==================================================*/
const imagePaths: string[][] = [
	['AI', '../assets/img/o.svg'],
	['AIHovering', '../assets/img/oHovering.svg'],
	['PLAYER', '../assets/img/x.svg'],
	['PLAYERHovering', '../assets/img/xHovering.svg'],
];
export const images: { [x: string]: HTMLImageElement } = Preload(imagePaths);

/*==================================================
	History
==================================================*/
export const history: THistory = {
	AI: {
		coords: [],
		turn: false,
		won: false,
	},
	PLAYER: {
		coords: [],
		turn: true,
		won: false,
	},
};

/*==================================================
	Square cells coordinates
==================================================*/
export const squares: TCoords[][] = Array.from({ length: settings.numCells }, (v, row) =>
	Array.from({ length: settings.numCells }, (v, col) => ({ x: 0, y: 0 }))
);

/*==================================================
	checkArray
==================================================*/
export const checkArray = {
	vertical: [0, 1],
	horizontal: [1, 0],
	leftDiagonal: [1, 1],
	rightDiagonal: [-1, 1],
} as const;
