import Ghost from './ghost.js';
import Player from './player.js';
import Map from './map.js';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const sprites = new Image();
const mapSprite = new Image();

function move(event) {
    const key = event.code;
    if (key === 'ArrowUp') {
        return 'UP';
    } else if (key === 'ArrowDown') {
        return 'DOWN';
    } else if (key === 'ArrowLeft') {
        return 'LEFT';
    } else if (key === 'ArrowRight') {
        return 'RIGHT';
    } else {
        return 'INVALID';
    }

}

function init() {
    sprites.src = 'assets/sprites.png';
    mapSprite.src = 'assets/map.png';

    return { 
        ghosts: getGhots(),
        map: getMap(),
        player: getPlayer()
    }
}

function getAction(event,player,map){
    let direction = move(event);
    let valid = checkAction(direction, player, map);

    return {
        'direction': direction,
        'valid': valid
    }
}

function checkAction(direction, player, map) {

    function map_range(value, low1, high1, low2, high2) {
        return Math.round(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
    }

    let i = map_range(player.position.y, 40, 520, 0, 30);
    let j = map_range(player.position.x, 0, 430, 0, 27);

    switch (direction) {
        case 'UP': {
            if (map.map[i - 1][j] === map.status['WALL']) {
                return false;
            }
            break;
        }
        case 'DOWN': {
            if (map.map[i + 1][j] === map.status['WALL']) {
                return false;
            }
            break;
        }
        case 'LEFT': {
            if (map.map[i][j - 1] === map.status['WALL']) {
                return false;
            }
            break;
        }
        case 'RIGHT': {
            if (map.map[i][j + 1] === map.status['WALL']) {
                return false;
            }
            break;
        }
        case 'INVALID': {
            return false;
            break;
        }
    }

    return true;
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

export { move, getGhots, getPlayer, getMap, clear, init, checkAction, getAction };