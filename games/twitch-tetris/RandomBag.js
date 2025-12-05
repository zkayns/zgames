function RandomBag(queueSize) {
    randomIndex=0;
    
    // start off empty
    this.available = [];
    this.queue = [];
    if (!Cheats.randomSeed.enabled) changeSeed(Math.floor(Math.random()*randomTable.length));
    else changeSeed(Cheats.randomSeed.seed);
    // initialize by refilling the queue
    while (this.queue.length < queueSize) {
	this.queue.push(this.nextAvailable());
    }
}

RandomBag.initialList = ['i', 'o', 'j', 'l', 'z', 's', 't'];
if (Cheats.blockFilter.enabled) RandomBag.initialList=Cheats.blockFilter.whitelist.filter(piece=>!Cheats.blockFilter.blacklist.includes(piece));
/**
* Returns the letters of the queue
* @returns {[Char]} the letters of the queue in order of oldest to newest
*/
RandomBag.prototype.getQueue = function () {
    return this.queue;
};

/**
* Moves the queue forward by one
* @returns {Char} the popped value
*/
RandomBag.prototype.popQueue = function () {
    let a=this.available.filter(piece=>!this.getQueue().includes(piece));
    this.queue.push(a[generateRandomPiece()%a.length]);
    return this.queue.shift();
};

/**
* gets the next letter for the queue, and updates the random bag state
* @returns {Char} the next letter for the queue
* @private
*/
RandomBag.prototype.nextAvailable = function() {
    // if the available needs to be rebuilt
    if (!this.available.length) this.available = RandomBag.initialList.slice(0); // shallow copy
    let a=this.available.filter(piece=>!this.getQueue().includes(piece));
    return a[generateRandomPiece()%a.length];
};