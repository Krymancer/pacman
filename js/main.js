import { clear, init } from './controller.js'
import { getAction } from './keyboard.js'

const { ghosts, map, player, update, show } = init();

let action;

document.addEventListener("keydown", (event) => {
    action = getAction(event, player, map);
});

main();

function main() {
    clear();
    update(ghosts, player, map, action);
    show(ghosts, player, map);
    requestAnimationFrame(main);
}