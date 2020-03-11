import { checkAction } from './keyboard.js';

export default class Player {
    constructor(context, sprites, position = { x: 10, y: 56 }) {
        this.context = context;
        this.sprites = sprites;

        this.spritePosition = { x: 0, y: 0 };

        this.position = position;
        this.spriteSize = { width: 32, height: 32 };
        this.size = { x: 32, y: 32 };

        this.frameLength = 2;
        this.frameIndex = 0;
        this.offset = 32;

        this.frameTickCount = 0;
        this.tickPerFrame = 10;

        this.actionTickCount = 0;
        this.tickPerAction = 2;

        this.velocity = 16;

        this.states = {
            'RIGHT': this.spritePosition.y,
            'LEFT': this.spritePosition.x + this.size.x * 3,
            'UP': this.spritePosition.x + this.size.x * 5,
            'DOWN': this.spritePosition.x + this.size.x * 7,
        }

        this.status = 'RIGHT';
    }

    update(action, map) {
        this.frameTickCount++;
        if (this.frameTickCount > this.tickPerFrame) {
            this.frameTickCount = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frameLength;
        }

        this.actionTickCount++;
        if (this.actionTickCount > this.tickPerAction) {
            this.actionTickCount = 0;
            if (action) {
                if (action['valid']) {
                    this.move(action);
                }
                action['valid'] = checkAction(action['direction'], this, map);
            }
        }


    }

    move(action) {
        this.status = action['direction'];

        if (this.status === 'UP') {
            this.position.y -= this.velocity;
        } else if (this.status == 'DOWN') {
            this.position.y += this.velocity;
        } else if (this.status == 'LEFT') {
            this.position.x -= this.velocity;
        } else {
            this.position.x += this.velocity;
        }
    }

    show() {
        this.context.drawImage(
            this.sprites,
            this.states[this.status] + (this.offset * this.frameIndex),
            this.spritePosition.y,
            this.spriteSize.width,
            this.spriteSize.height,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y);
    }
}