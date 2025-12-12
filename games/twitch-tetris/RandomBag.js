class RandomBag {
    static initialList=['i', 'o', 'j', 'l', 'z', 's', 't'];
    static {
        if (cheatEnabled("pieceFilter")) this.initialList=Cheats.pieceFilter.whitelist.filter(piece=>!Cheats.pieceFilter.blacklist.includes(piece));
    };
    constructor(queueSize) {
        randomIndex=0;
        // start off empty
        this.available = [];
        this.queue = [];
        if (!cheatEnabled("randomSeed")) changeSeed(Math.floor(Math.random()*randomTable.length));
        else changeSeed(Cheats.randomSeed.seed);
        // initialize by refilling the queue
        while (this.queue.length < queueSize) this.queue.push(this.nextAvailable());
    };
    /**
    * Returns the letters of the queue
    * @returns {[Char]} the letters of the queue in order of oldest to newest
    */
    getQueue() {
        return this.queue;
    };
    /**
    * Moves the queue forward by one
    * @returns {Char} the popped value
    */
    popQueue() {
        let a=this.available.filter(piece=>!this.getQueue().includes(piece));
        if (a.length==0) a=RandomBag.initialList;
        this.queue.push(a[generateRandomPiece()%a.length]);
        return this.queue.shift();
    };
    /**
    * gets the next letter for the queue, and updates the random bag state
    * @returns {Char} the next letter for the queue
    * @private
    */
    nextAvailable() {
        // if the available needs to be rebuilt
        if (!this.available.length) this.available = RandomBag.initialList.slice(0); // shallow copy
        let a=this.available.filter(piece=>!this.getQueue().includes(piece));
        if (a.length==0) a=RandomBag.initialList;
        return a[generateRandomPiece()%a.length];
    };
};