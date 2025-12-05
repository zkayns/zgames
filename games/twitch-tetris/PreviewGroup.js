class PreviewGroup {
    constructor(baseX, baseY) {
        this.blocks = [];
        this.shape = null;
        for (let i in new Uint8Array(4)) {
	        this.blocks.push(new Block({
	            boardOriginX: baseX,
	            boardOriginY: baseY,
	            blockX: 0,
	            blockY: 0,
	            shape: 'i'
	        }));
        }
    };
    setShape(shape) {
        var shapeConfig = SHAPES[shape];
        this.shape = shape;
        for (let i in new Uint8Array(4)) {
	        this.blocks[i].setPosition(shapeConfig.pos[i].x, shapeConfig.pos[i].y);
	        this.blocks[i].setColor(shape, false);
        }
    }
    getShape() {
        return this.shape;
    }
    draw() {
        for (let i in new Uint8Array(4)) this.blocks[i].draw();
    }
}
				