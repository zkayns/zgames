class Block {
    static invalidSpaces={};
    static allInvalidated=false;
    constructor(config) {
        var parent, key;
        config = config || {};
        this.boX = (config.boardOriginX || 0) + FIELD_OFFSET_X;
        this.boY = (config.boardOriginY || 0) + FIELD_OFFSET_Y;
        this.blockX = config.blockX;
        this.blockY = config.blockY;
        this.occupiedPositions = config.occupiedPositions;
        this.addOccupied(this.blockX, this.blockY);
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
        config.x = this.boX + BLOCK_WIDTH * this.blockX;
        config.y = this.boY + BLOCK_WIDTH * this.blockY;
        if (config.preview) config.image = 'media/greyblock.png';
        else if (config.empty) config.image = 'media/emptyblock.png';
        else config.image = SHAPES[config.shape].image;
        parent = new jaws.Sprite(config);
        for (let key in parent) this[key] = parent[key];
    }
    static invalidFlushed() {
        Block.invalidSpaces={};
        Block.allInvalidated=false;
    }
    static invalidateAll() {
        Block.allInvalidated=true;
    }
    moveBlock(dx, dy) {
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
        this.removeOccupied(this.blockX, this.blockY);
        this.blockX += dx;
        this.blockY += dy;
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
        this.addOccupied(this.blockX, this.blockY);
        this.x += dx * BLOCK_WIDTH;
        this.y += dy * BLOCK_WIDTH;
    }
    setColor(shape, preview) {
        if (preview) this.setImage('media/greyblock.png');
        else this.setImage(SHAPES[shape].image);
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
    }
    setPosition(blockX, blockY) {
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
        this.removeOccupied(this.blockX, this.blockY);
        this.blockX = blockX;
        this.blockY = blockY;
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
        this.addOccupied(this.blockX, this.blockY);
        this.x = this.boX + blockX * BLOCK_WIDTH;
        this.y = this.boY + blockY * BLOCK_WIDTH;
    }
    getX() { return this.blockX; }
    getY() { return this.blockY; }
    isPosition(x, y) {
        return this.blockX === x && this.blockY === y;
    }
    drawIfInvalid() {
        if (Block.invalidSpaces[this.blockX + "," + this.blockY] || Block.allInvalidated || this.blockY < 0) this.draw();
    }
    kill() {
        Block.invalidSpaces[this.blockX + "," + this.blockY] = true;
        this.removeOccupied(this.blockX, this.blockY);
    }
    removeOccupied(x, y) {
        var posString = `${x},${y}`;
        if (this.occupiedPositions && this.occupiedPositions[posString]) this.occupiedPositions[posString]--;
    }
    addOccupied(x, y) {
        var posString = `${x},${y}`;
        if (this.occupiedPositions) {
	        if (this.occupiedPositions[posString] === undefined) {
	            this.occupiedPositions[posString] = 0;
	        }
	        this.occupiedPositions[posString] += 1;
        }
    }
}