import { coords, Preload } from './util.js';

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
	turn: keyof typeof history;
};

type TIcon = {
	x: number;
	y: number;
	size: number;
	link: string;
};
type TIcons = {
	[x: string]: TIcon;
};

type TPiece = {
	coords: TCoords[];
	won: boolean;
	isAI: boolean;
};
type THistory = {
	[x: string]: TPiece;
};

/*==================================================
	Settings
==================================================*/
export const settings: TSettings = {
	pEdge: 25, // How far from the edge in percent
	lineThickness: 2.5, // How thick the lines should be in percent
	numCells: 3, // How many cells it should be per row and column | smallest working size is 3
	thinking: false, //* Must start as false otherwise the game will soft lock
	turn: 'PLAYER', // The person with the starting move
};

/*==================================================
	Image preloader
==================================================*/
const imagePaths: Readonly<string[][]> = Object.freeze([
	//Pieces
	['AI', `o.svg`],
	['AIHovering', `oHovering.svg`],
	['PLAYER', `x.svg`],
	['PLAYERHovering', `xHovering.svg`],
	//Icons
	['Website', `website.svg`],
	['Extension', `extension.svg`],
]);
export const images: { [x: string]: HTMLImageElement } = Preload('./assets/img/', imagePaths);

/*==================================================
	Icon sizes
==================================================*/
// x, y and size gets set in util.ts -> ResizeCanvas
export const icons: TIcons = {
	Website: {
		x: 0,
		y: 0,
		size: 0,
		link: 'https://www.phadonia.com/',
	},
	Extension: {
		x: 0,
		y: 0,
		size: 0,
		link: 'https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse',
	},
};

/*==================================================
	History
==================================================*/
export const history: THistory = {
	AI: {
		coords: [],
		won: false,
		isAI: true,
	},
	PLAYER: {
		coords: [],
		won: false,
		isAI: false,
	},
};

/*==================================================
	Square cells coordinates
==================================================*/
export const squares: TCoords[][] = Array.from({ length: settings.numCells }, () =>
	Array.from({ length: settings.numCells }, () => ({ x: 0, y: 0 }))
);

/*==================================================
	checkArray
==================================================*/
export const checkArray: Readonly<{ [x: string]: coords }> = Object.freeze({
	vertical: { x: 0, y: 1 },
	horizontal: { x: 1, y: 0 },
	leftDiagonal: { x: 1, y: 1 },
	rightDiagonal: { x: -1, y: 1 },
});
