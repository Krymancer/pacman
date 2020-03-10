
import { clear, init, getAction } from './controller.js';

const { ghosts, map, player } = init();
let action;

document.addEventListener("keydown", (event) => {
    action = getAction(event,player,map);
});

update();

function update() {
    clear();

    ghosts.forEach(ghost => {
        ghost.update();
    });

    player.update(action,map);

    map.show();

    ghosts.forEach(ghost => {
        ghost.show();
    });

    player.show();

    requestAnimationFrame(update);
}