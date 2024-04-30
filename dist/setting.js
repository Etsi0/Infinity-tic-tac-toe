import { Preload } from './util.js';
/*==================================================
    Settings
==================================================*/
export const settings = {
    pEdge: 25, // How far from the edge in percent
    lineThickness: 2.5, // How thick the lines should be in percent
    numCells: 3, // How many cells it should be per row
    thinking: false, //* Must start as false otherwise the game will soft lock
};
/*==================================================
    Image preloader
==================================================*/
const imagePaths = [
    ['AI', './assets/img/o.svg'],
    ['AIHovering', './assets/img/oHovering.svg'],
    ['PLAYER', './assets/img/x.svg'],
    ['PLAYERHovering', './assets/img/xHovering.svg'],
];
export const images = Preload(imagePaths);
/*==================================================
    History
==================================================*/
export const history = {
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
export const squares = Array.from({ length: settings.numCells }, (v, row) => Array.from({ length: settings.numCells }, (v, col) => ({ x: 0, y: 0 })));
/*==================================================
    checkArray
==================================================*/
export const checkArray = {
    vertical: [0, 1],
    horizontal: [1, 0],
    leftDiagonal: [1, 1],
    rightDiagonal: [-1, 1],
};
//# sourceMappingURL=setting.js.map