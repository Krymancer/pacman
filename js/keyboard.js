function getDirection(event) {
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

function getAction(event, player, map) {
    let direction = getDirection(event);
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

export { getDirection, checkAction, getAction };