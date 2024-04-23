import { canvas } from './environment.js';
export const mouse = {
    click: false,
    x: 0,
    y: 0,
};
// Update mouse position whenever it moves
document.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
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
//# sourceMappingURL=click.js.map