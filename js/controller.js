import Ghost from './ghost.js';
import Player from './player.js';
import Map from './map.js';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const sprites = new Image();
const mapSprite = new Image();

function init() {
    sprites.src = 'assets/sprites.png';
    mapSprite.src = 'assets/map.png';

    return {
        ghosts: getGhots(),
        map: getMap(),
        player: getPlayer(),
        update: update,
        show: show
    }
}

function update(ghosts, player, map, action) {
    ghosts.forEach(ghost => {
        ghost.update();
    });

    player.update(action, map);
}

function show(ghosts, player, map) {
    map.show();

    ghosts.forEach(ghost => {
        ghost.show();
    });

    player.show();

}

function getGhots() {
    return [
        new Ghost(context, sprites, 'blinky', { x: 190, y: 265 }),
        new Ghost(context, sprites, 'pinky', { x: 230, y: 265 }),
        new Ghost(context, sprites, 'inky', { x: 140, y: 215 }),
        new Ghost(context, sprites, 'clyde', { x: 275, y: 216 })
    ];

}

function getPlayer() {
    return new Player(context, sprites, { x: 202, y: 408 });
}

function getMap() {
    return new Map(context, mapSprite);
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export { clear, init };