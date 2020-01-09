export default class Player {
    constructor(context, sprites) {
        this.context = context;
        this.sprites = sprites;

        this.spritePosition = {x: 456, y: 0};

        this.position = { x: 6, y: 36 };
        this.spriteSize = { width: 16, height: 16 };
        this.size = { x: 16, y: 16 };

        this.frameLength = 2;
        this.frameIndex = 0;
        this.offset = 16;

        this.tickCount = 0;
        this.tickPerFrame = 20;

        this.states = {
            'RIGHT': this.spritePosition.y,
            'LEFT': this.spritePosition.y + this.size.y,
            'UP': this.spritePosition.y + 2 * this.size.y,
            'DOWN': this.spritePosition.y + 3 * this.size.y,
        }

        this.status = 'DOWN';
    }

    update() {
        this.tickCount++;
        if (this.tickCount > this.tickPerFrame) {
            this.tickCount = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frameLength;
        }
    }

    show() {
        this.context.drawImage(
            this.sprites,
            this.spritePosition.x + (this.offset * this.frameIndex),
            this.states[this.status],
            this.spriteSize.width,
            this.spriteSize.height,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y);
    }
}