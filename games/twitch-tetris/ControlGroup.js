class ControlGroup {
    /**
    * The blocks that can be moved by the user
    * @param {Array} blocks - an array of [Block] of size 4 that can be operated on
    * @param {Char} shape - the block type: i, o, j, l, s, z, t
    * @param {function({Number}x, {Number}y)} isLegalCallback - a function that retursn true if a block can be moved
    * to the new position
    */
    constructor(blocks, shape, isLegalCallback) {
        // place the blocks according to the shape
        let shapeConf = SHAPES[shape];
        this.pos = shapeConf.pos;
        this.spin = shapeConf.spin;
        this.bottomed = false;
        this.blocks = blocks;
        this.baseX = shapeConf.startX;
        this.baseY = shapeConf.startY;
        this.shape = shape;
        this.kickOffsets = WALL_KICK_OFFSETS[shapeConf.kickType];
        this.dir = 0;
        this.isIllegalStart = false;
        this.isLegalCallback = isLegalCallback || function() {return true;};
        this.lastWasSpin = false;
        for (let i = 0; i < blocks.length; i++) {
	        let newX = this.baseX + this.pos[i].x;
	        let newY = this.baseY + this.pos[i].y;
	        // see if the block placement is illegal before placing
	        this.isIllegalStart=!this.isLegalCallback(newX, newY)
	        this.blocks[i].setPosition(newX, newY);
        };
        this.updateBottomedState();
    };
    updateBottomedState() {
        for (let i = 0; i < this.blocks.length; i++) {
	        if (!this.isLegalPosition(this.blocks[i].getX(), this.blocks[i].getY() + 1)) {
	            this.bottomed = true;
	            return;
	        };
        };
        this.bottomed = false;
    };
    /**
    * if the position is legal
    * @param {Number} x
    * @param {Number} y
    * @returns {Boolean} true if the position is legal to move to
    */
    isLegalPosition(x, y) {
        // if it's a currently occupied, it must be legal
        for (let i = 0; i < 4; i++) if (this.blocks[i].isPosition(x, y)) return true;
        // if it's still not proven legal, then defer to the game to decide
        return this.isLegalCallback(x, y);
    };
    /**
    * Shift the block left or right
    * @param {Boolean} left - true to shift left false to shift right
    * @returns {Boolean} true iff the shift was successful
    */
    shift(left) {
        var dx = left?-1:1;
        for (let i = 0; i < 4; i++) if (!this.isLegalPosition(this.blocks[i].getX()+dx, this.blocks[i].getY())) return false;
        this.lastWasSpin = false;
        this.baseX += dx;
        for (let i = 0; i < this.blocks.length; i++) this.blocks[i].moveBlock(dx, 0);
        this.updateBottomedState();
        return true;
    };
    /**
    * Drop the block by one
    */
    drop() {
        // don't drop if bottomed
        if (this.bottomed) return;
        this.lastWasSpin = false;
        this.baseY++;
        for (let i = 0; i < this.blocks.length; i++) this.blocks[i].moveBlock(0, 1);
        this.updateBottomedState();
    };
    /**
    * Sets the preview blocks to the approproriate positions
    * @param {[Block]} previews - the 4 blocks to be modified to be put into position as preview blocks
    */
    configurePreviewBlocks(previews) {
        var positions = this.getFallPositions().positions;
        for (let i = 0; i < 4; i++) previews[i].setPosition(positions[i].x, positions[i].y);
    };
    /*
    * Gets the type of T spin that the group is in
    * @returns {String} 'mini' for a mini-t, 'normal' for a normal t, null for not a t spin
    */
    getTSpin() {
        var testPoints = [{x:-1,y:-1},{x:1,y:-1},{x:1,y:1},{x:-1,y:1}],
        count = 0,
        mini = false;
    
        if (!this.lastWasSpin) return null;
        // make sure it's actually a t
        if (this.shape !== 't') return null;
        testPoints[this.dir].miniCheck=true;
        testPoints[(this.dir+1)%4].miniCheck=true;

        // 3 point t test
        for (let i = 0; i < 4; i++) {
	        let curPoint = testPoints[i]
	        if (!this.isLegalPosition(this.baseX + curPoint.x, this.baseY + curPoint.y)) count++;
	        else if (curPoint.miniCheck) mini = true;
        };

        if (count >= 3) {
	        if (mini) return 'mini';
	        return 'normal';
        };
        return null;
    };
    /**
    * @returns {Boolean} true if the block is bottomed and another should spawn
    */
    isBottomed() {
        return this.bottomed;
    };
    /**
    * Turns the block
    * @param {Boolean} cw - true for clockwise, false for counter-clockwise
    * @returns {Boolean} true iff the block was successfully turned
    */
    turn(cw) {
        var direction = `${!cw?"c":""}cw`,
        availableKicks = this.kickOffsets[this.dir][direction];
        // for possible each kick offset
        for (let i = 0; i < availableKicks.length; i++) {
	        var kick = availableKicks[i];
	        var newPos = this.tryTurn(cw, kick);
	        if (newPos) break;
        };
        // if there s still no valid rotation, fail
        if (!newPos) return false;
        this.lastWasSpin = true;
        // must be legal at this point move the bocks
        for (let i = 0; i < 4; i++) this.blocks[i].setPosition(newPos[i].x, newPos[i].y);
        this.baseX += kick.x;
        this.baseY += kick.y;
        // keep track of the direction
        if (cw) {
	        this.dir++;
	        if (this.dir === 4) this.dir = 0;
	    } else {
	        this.dir--;
	        if (this.dir === -1) this.dir = 3;
        };
        this.updateBottomedState();
        return true;
    };
    /**
    * makes the block fall all the way to the bottom
    * forces the next cycle to be recognized as bottomed
    * @returns {Number} the distance fallen
    */
    fall() {
        var fall = this.getFallPositions(),
        positions = fall.positions,
        dist = fall.dist;
        if (dist !== 0) this.lastWasSpin = false;
        // for each block
        for (let i = 0; i < 4; i++) {
	        var curPos = positions[i];
	        this.blocks[i].setPosition(curPos.x, curPos.y);
        };
        this.bottomed = true;
        return dist;
    };
    getBlocks() {
        return this.blocks;
    };
    getShape() {
        return this.shape;
    };
    /**
    * Gets the positions that the block will use when it falls
    * @returns {Object} {dist:{Number}, positions: {[Object]} array of hashs of {x: Number, y: Number}}
    */
    getFallPositions() {
        var res = [],
        dist = 0,
        notDone = true;

        while (notDone) {
	        dist++;

	        // for each block
	        for (let i = 0; i < 4 && notDone; i++) {
                let curBlock = this.blocks[i];
	            // if it's not a legal position
	            if (!this.isLegalPosition(curBlock.getX(), curBlock.getY() + dist)) {
		            // back up one and stop dropping
		            dist--;
		            notDone = false;
	            };
	        };
        };
        // for each block
        for (let i = 0; i < 4; i++) {
	        let curBlock = this.blocks[i];
	        res.push({x: curBlock.getX(), y: curBlock.getY() + dist});
        };
        return {dist: dist, positions: res};
    };
    /**
    * Checks if the given rotation and kick is valid.
    * @param {Boolean} cw - true if cw, false if ccw
    * @param {Object} kick - the kick offset x/y object to try
    * @returns {Array} and array of x/y objects if valid, null if not valid
    */
    tryTurn(cw, kick) {
        var newPos = [];
        if (this.spin === 'block') {
	        for (let i = 0; i < this.blocks.length; i++) {
	            let newX = (cw ? -1 : 1) * (this.blocks[i].blockY - this.baseY) + this.baseX + kick.x;
	            let newY = (cw ? 1 : -1) * (this.blocks[i].blockX - this.baseX) + this.baseY + kick.y;

	            newPos[i] = {x: newX, y: newY};
	        };
        } else {
	        // point turning
	        for (let i = 0; i < this.blocks.length; i++) {
	            let oldX = this.blocks[i].blockX - this.baseX;
	            let oldY = this.blocks[i].blockY - this.baseY;

	            if (oldX >= 0) oldX++; 
	            if (oldY >= 0) oldY++; 

	            let newX = (cw ? -1 : 1) * oldY;
	            let newY = (cw ? 1 : -1) * oldX;

	            if (newX > 0) newX--;
	            if (newY > 0) newY--;

	            newPos[i] = {x: newX + this.baseX + kick.x, y: newY + this.baseY + kick.y};
	        };
        };
        // for each block
        for (let i = 0; i < 4; i++) {
	        let curPos = newPos[i];
	        if (!this.isLegalPosition(curPos.x, curPos.y)) return null;
        };
        return newPos;
    };
};