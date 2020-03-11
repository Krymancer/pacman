export default class Dot {
    constructor(context, sprites, energizer = false, position = { x: 0, y: 0 }) {
        this.context = context;
        this.sprites = sprites
        this.energizer = energizer;

        this.position = position;

        this.spriteSize = { width: 32, height: 32 };
        this.size = { x: 32, y: 32 };

        this.spritePosition = (this.energizer) ? { x: 0, y: 288 } : { x: 32, y: 288 };

    }

    show() {
        this.context.drawImage(
            this.sprites,
            this.spritePosition.x,
            this.spritePosition.y,
            this.spriteSize.width,
            this.spriteSize.height,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y);
    }
}