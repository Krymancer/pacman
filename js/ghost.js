export default class Ghost {
    constructor(context, sprites, ghost) {
        this.context = context;
        this.sprites = sprites;

        this.spritePositions = {
            'blinky': { x: 456, y: 64 },
            'pinky': { x: 456, y: 80 },
            'inky': { x: 456, y: 96 },
            'clyde': { x: 456, y: 112 }
        };

        this.spritePosition = this.spritePositions[ghost];

        this.position = { x: 6, y: 4};
        this.spriteSize = { width: 16, height: 16 };
        this.size = { x: 16, y: 16 };

        this.frameLength = 2;
        this.frameIndex = 0;
        this.offset = 16;

        this.tickCount = 0;
        this.tickPerFrame = 20;

        this.states = {
            'RIGHT': this.spritePosition.x,
            'LEFT': this.spritePosition.x + 2 * this.size.x,
            'UP': this.spritePosition.x + 4 * this.size.x,
            'DOWN': this.spritePosition.x + 6 * this.size.x,
            'SCARY': this.spritePositions['blinky'].x + 8 * this.size.x
        }

        this.status = 'RIGHT';
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
            this.states[this.status] + (this.offset * this.frameIndex),
            (this.status == 'SCARY') ? this.spritePositions['blinky'].y : this.spritePosition.y,
            this.spriteSize.width,
            this.spriteSize.height,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y);
    }
}