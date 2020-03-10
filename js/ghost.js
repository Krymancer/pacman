export default class Ghost {
    constructor(context, sprites, ghost, position = { x: 10, y: 120 }) {
        this.context = context;
        this.sprites = sprites;
        this.ghost = ghost;

        this.spritePositions = {
            'blinky': { x: 0, y: 64 },
            'pinky': { x: 0, y: 96 },
            'inky': { x: 0, y: 128 },
            'clyde': { x: 0, y: 160 }
        };

        this.spritePosition = this.spritePositions[ghost];

        this.position = position;
        this.spriteSize = { width: 32, height: 32 };
        this.size = { x: 32, y: 32 };

        this.frameLength = 2;
        this.frameIndex = 0;
        this.offset = 32;

        this.tickCount = 0;
        this.tickPerFrame = 10;

        this.frightenedTickCount = 0;
        this.frightenedTickTime = 400;
        this.frightenedRestoreTime = 300;

        this.modes = {
            'CHASE': 0,
            'SCATTER': 1,
            'FRIGHTENED': 2
        }

        this.mode = 2;

        this.states = {
            'RIGHT': this.spritePosition.x,
            'DOWN': this.spritePosition.x + 2 * this.size.x,
            'LEFT': this.spritePosition.x + 4 * this.size.x,
            'UP': this.spritePosition.x + 6 * this.size.x,
            'FRIGHTENED': this.size.y + 192

        }

        this.status = 'FRIGHTENED';
    }

    update(state) {
        this.tickCount++;
        if (this.tickCount > this.tickPerFrame) {
            this.tickCount = 0;
            this.frameIndex = (this.frameIndex + 1) % this.frameLength;
        }

        if (this.mode === this.modes['FRIGHTENED']) {
            this.frightenedTickCount++;
            if (this.frightenedTickCount > this.frightenedTickTime) {
                this.changeState('FRIGHTENED');
                if (this.frightenedTickCount - this.frightenedTickTime > this.frightenedRestoreTime) {
                    this.changeState(this.modes['CHASE']);
                    this.status = 'RIGHT'
                }
            }
        }
    }

    changeState(state) {
        if (state === 'FRIGHTENED') {
            this.frameLength = 4;
            this.status = state;
        } else {
            this.frameLength = 2;
            this.status = state;
        }
    }

    show() {
        this.context.drawImage(
            this.sprites,
            (this.status === 'FRIGHTENED') ? (this.offset * this.frameIndex) : this.states[this.status] + (this.offset * this.frameIndex),
            (this.status == 'FRIGHTENED') ? this.states[this.status] : this.spritePosition.y,
            this.spriteSize.width,
            this.spriteSize.height,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y);
    }
}