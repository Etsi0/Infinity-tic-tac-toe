import { canvas, ctx } from './environment.js';
import { CheckClick, mouse } from './click.js';
import { settings, history, squares, images, icons } from './setting.js';
import { ResizeCanvas, GetBoardDimensions, PercentageToPixels, HasWon } from './util.js';
import { WinConPrep } from './won.js';
addEventListener('load', ResizeCanvas);
addEventListener('resize', ResizeCanvas);
/*==================================================
    GameLoop
==================================================*/
export function GameLoop() {
    Clear();
    DrawBoard();
    // Looks if the player as won and draws it's pieces
    Object.keys(history).forEach((piece) => {
        history[piece].won = WinConPrep(piece);
        DrawPieces(piece);
        if (history[piece].won) {
            DrawText((turnText) => {
                ctx.fillText(`${piece} WON`, canvas.width / 2, turnText);
            });
        }
    });
    if (!HasWon()) {
        DrawText((turnText) => {
            ctx.fillText(`${settings.turn} TURN`, canvas.width / 2, turnText);
        });
    }
    DrawIcons();
    // Click stuff
    CheckClick();
    mouse.click = false;
    requestAnimationFrame(GameLoop);
}
/*==================================================
    Clear
==================================================*/
function Clear() {
    // overwrites previous frame with new background
    ctx.fillStyle = 'hsl(240deg 12% 10% / 100%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
/*==================================================
    DrawBoard
==================================================*/
function DrawBoard() {
    const { boardSize, squareSize, inlinePadding, blockPadding } = GetBoardDimensions();
    ctx.fillStyle = 'hsl(240deg 69% 61% / 100%)';
    ctx.fillRect(inlinePadding, blockPadding, boardSize, boardSize);
    ctx.fillStyle = 'hsl(240deg 12% 10% / 100%)';
    for (let row = 0; row < settings.numCells; row++) {
        for (let col = 0; col < settings.numCells; col++) {
            const gridStepSize = squareSize + PercentageToPixels(settings.lineThickness);
            const xPos = inlinePadding + col * gridStepSize;
            const yPos = blockPadding + row * gridStepSize;
            ctx.fillRect(xPos, yPos, squareSize, squareSize);
        }
    }
}
/*==================================================
    DrawPieces
==================================================*/
function DrawPieces(piece) {
    const { squareSize } = GetBoardDimensions();
    for (let i = 0; i < history[piece].coords.length; i++) {
        let image = images[piece];
        if (history[piece].coords.length === settings.numCells && i === 0 && !HasWon()) {
            image = images[`${piece}Hovering`];
        }
        const pieceCoords = history[piece].coords[i];
        const squareCoords = squares[pieceCoords.y][pieceCoords.x];
        ctx.drawImage(image, squareCoords.x, squareCoords.y, squareSize, squareSize);
    }
}
/*==================================================
    DrawText
==================================================*/
function DrawText(fun) {
    const turnText = PercentageToPixels(settings.pEdge / 3);
    ctx.fillStyle = '#fff';
    ctx.font = `${turnText}px ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    fun(turnText);
}
/*==================================================
    DrawIcon
==================================================*/
function DrawIcons() {
    Object.keys(icons).forEach((item) => {
        const icon = icons[item];
        ctx.drawImage(images[item], icon.x, icon.y, icon.size, icon.size);
    });
}
//# sourceMappingURL=index.js.map