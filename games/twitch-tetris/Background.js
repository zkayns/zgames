class Background {
    constructor(config) {
        config = config || {};

        this.originX = (config.x || 0) + FIELD_OFFSET_X;
        this.originY = (config.y || 0) + FIELD_OFFSET_Y;

        this.width = 10;
        this.height = 20;

        this.tiles = [];
        for (let x = 0; x < this.width; x++) {
	        for (let y = 0; y < this.height; y++) {
	            let curTile = new Block({ empty: true, blockX: x, blockY: y });
	            this.tiles.push(curTile);
	        };
        };

        this.backdrop = new jaws.Sprite({image: TEXTURE_INDEX["backdrop"]});
        this.backdrop.x = 0;
        this.backdrop.y = 0;

        this.topBar = new jaws.Sprite({image: TEXTURE_INDEX["topbar"]});
        this.topBar.x = 181;
        this.topBar.y = 0;

        this.fullRedrawNeeded = true;
    };
    draw(lastPaused) {
        if (this.fullRedrawNeeded || lastPaused) {
	        this.backdrop.draw();
	        for (let i = 0; i < this.tiles.length; i++) this.tiles[i].draw();
	        this.fullRedrawNeeded = false;
        } else {
	        this.topBar.draw();
	        // clear the swap group / previews
	        jaws.context.fillStyle = "#000D00";
	        jaws.context.fillRect(24, 42, 118, 60);
	        jaws.context.fillRect(457, 18, 107, 341);
	        for (let i = 0; i < this.tiles.length; i++) this.tiles[i].drawIfInvalid();
        };
    };
};