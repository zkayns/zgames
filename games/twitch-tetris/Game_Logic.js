
/**
* @returns {[Number]} the line numbers of all the completed rows
*/ 
Game.prototype.getRows = function () {
    var res = [];
    // initialize the rows to 0
    var rows = [...(new Uint8Array(20))];
    // for each block
    for (let i = 0; i < this.blocks.length; i++) {
	    // increment the appropriate row
	    let curRow = this.blocks[i].getY();
	    rows[curRow]++;
	    // if the row is full
	    if (rows[curRow] === 10) {
            res.push(curRow);
            if (this.blocks[i].getY()>=20-Cheats.rowBlocker.count&&Cheats.rowBlocker.enabled&&Cheats.rowBlocker.count>=1) res.pop();
        };
    };
    return res;
};

/**
* Removes the rows from the field
*/
Game.prototype.removeRows = function (rows) {
    var remove = {};
    // initialize drops to 0
    var dropDist = [...(new Uint8Array(24))];
    // for each removed row
    for (let i = 0; i < rows.length; i++) {
	    remove[rows[i]] = true;
	    // every row above this should be dropped another spot
	    for (let j = -4; j < rows[i]; j++) dropDist[j]++;
    };

    // for each block
    for (let i = 0; i < this.blocks.length; i++) {
	    let curBlock = this.blocks[i];
	    let curY = curBlock.getY();
	    // if it is being removed
	    if (remove[curY]) {
	        // remove the block
	        this.removeBlock(i);
	        i--;
	    } else {
	        // it is being dropped
	        curBlock.setPosition(curBlock.getX(), curBlock.getY() + dropDist[curY]);
	    };
    };
};

Game.prototype.removeBlock = function(index) {
    this.blocks[index].kill();
    return this.blocks.splice(index, 1);
};

Game.prototype.applyGravity = function (dTime) {
    this.timeToNextDrop -= dTime;

    // drop until there is a positive time until the next drop time is positive, or the control group s bottomed out
    while (this.timeToNextDrop < 0 && !this.controlGroup.isBottomed()) {
	    this.dropBlock(true);
	    this.timeToNextDrop += this.dropPeriod;
    };

    // if it exited through bottoming, reset the drop period
    if (this.controlGroup.isBottomed()) this.timeToNextDrop = this.dropPeriod;
};

/**
* Changes the shapes of the preview along the side
* @param {[Char]} queue - the queue of pieces
*/
Game.prototype.updatePreviews = function(queue) {
    for (let i in queue) this.previewGroups[i].setShape(queue[i]);
};

/**
* called when the user attempts to swap a block
*/
Game.prototype.swap = function(force) {
    var newShape,
    oldShape = this.controlGroup.getShape(),
    oldBlocks = this.controlGroup.getBlocks(),
    newBlocks = [],
    thisObject = this;

    // can only be called once per drop
    if (!this.swapAllowed&&!cheatEnabled("multiHold")&&!force) return;
    this.swapAllowed = false;

    // Reset the locking
    this.resetLockCounter(false);

    // remove the blocks
    // for each block on the field
    for (let i = 0; i < this.blocks.length; i++) {
	    // if the block is part of the control group, remove it
	    for (let j = 0; j < 4; j++) {
	        if (oldBlocks[j] === this.blocks[i]) {
		        this.removeBlock(i);
		        i--;
	        };
	    };
    };
    
    // if there is a block waiting
    if (this.swapGroup) {
	newShape = this.swapGroup.getShape();
	for (let i = 0; i < 4; i++) {
	    newBlocks.push(new Block({blockX:-10, blockY:-10, shape: newShape, occupiedPositions: this.occupiedPositions}));
	    this.blocks.push(newBlocks[i]);
	};
	
	this.controlGroup = new ControlGroup(newBlocks, newShape, (x, y)=>{
	    return thisObject.isLegalPosition(x, y);
	});

	this.swapGroup.setShape(oldShape);

	return;
    }

    // if there is no block waiting
    this.swapGroup = new PreviewGroup(-100, 60);
    this.swapGroup.setShape(oldShape);
    this.newBlock(true);    

};

/**
* locks the current piece in, registers lines and makes a new block
*/
Game.prototype.lockBlocks = function() {
    // figure out if it a t-spin/t-spin mini
    var tSpinType = this.controlGroup.getTSpin(),
    scoreObject = {};
    if (tSpinType) scoreObject[`${tSpinType}T`]=true;
    // look for rows
    var rows = this.getRows();
    scoreObject.lines = rows.length;
    if (rows.length > 0) this.removeRows(rows);

    // apply the score
    this.scoreTracker.updateScore(scoreObject);

    this.newBlock();
    this.resetLockCounter(false);
};

/**
* Resets the lock counter, and the slide counter if not soft
* @param {Boolean} soft = true if a soft reset, and the slide counter should not be reset
*/
Game.prototype.resetLockCounter = function (soft) {
    this.slideCount+=soft;
    this.bottomTimer = this.bottomLockTime;
};

/**
 * Determines if the game is over and returns a score object
 * if it is. Otherwise, returns null
 */
Game.prototype.getResults = function() {
    if (this.gameLost || this.scoreTracker.gameWon()) return this.scoreTracker.getResults();
    return null;
};
