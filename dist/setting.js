import { Preload } from './util.js';
/*==================================================
    Settings
==================================================*/
export const settings = {
    pEdge: 25, // How far from the edge in percent
    lineThickness: 2.5, // How thick the lines should be in percent
    numCells: 3, // How many cells it should be per row and column | smallest working size is 3
    thinking: false, //* Must start as false otherwise the game will soft lock
    turn: 'PLAYER', // The person with the starting move
};
/*==================================================
    Image preloader
==================================================*/
const path = Object.freeze('./assets/img/');
const imagePaths = Object.freeze([
    //Pieces
    ['AI', `${path}o.svg`],
    ['AIHovering', `${path}oHovering.svg`],
    ['PLAYER', `${path}x.svg`],
    ['PLAYERHovering', `${path}xHovering.svg`],
    //Icons
    ['Website', `${path}website.svg`],
    ['Extension', `${path}extension.svg`],
]);
export const images = Preload(imagePaths);
/*==================================================
    Icon sizes
==================================================*/
// x, y and size gets set in util.ts -> ResizeCanvas
export const icons = {
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
export const history = {
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
export const squares = Array.from({ length: settings.numCells }, () => Array.from({ length: settings.numCells }, () => ({ x: 0, y: 0 })));
/*==================================================
    checkArray
==================================================*/
export const checkArray = Object.freeze({
    vertical: { x: 0, y: 1 },
    horizontal: { x: 1, y: 0 },
    leftDiagonal: { x: 1, y: 1 },
    rightDiagonal: { x: -1, y: 1 },
});
//# sourceMappingURL=setting.js.map