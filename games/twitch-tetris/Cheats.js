var Cheats={
    /*
    Block/Piece Filter
        Only pieces in the whitelist will be allowed in the random bag.
        Any piece in the blacklist array will not be allowed in the random bag.
        The blacklist takes priority over the whitelist, so if a piece is present in both the whitelist and blacklist it will be treated as a blacklisted piece.
    */
    blockFilter: {
        enabled: false,
        blacklist: [],
        whitelist: ['i', 'o', 'j', 'l', 'z', 's', 't']
    },
    /*
    Multi Hold/Swap
        Allows for the repeated holding/swapping of pieces.
    */
    multiHold: {
        enabled: false
    },
    /*
    Random Seed
        Forces the game to use a set random seed.
    */
    randomSeed: {
        enabled: true,
        seed: 3
    }
};
function cheatLoop() {
    if (Cheats.blockFilter.enabled) {
        RandomBag.initialList=Cheats.blockFilter.whitelist;
        Cheats.blockFilter.blacklist.forEach(blacklistedBlock=>{
            RandomBag.initialList=RandomBag.initialList.join("").split(blacklistedBlock);
        };
    } else {
        RandomBag.initialList=['i', 'o', 'j', 'l', 'z', 's', 't'];
    };
};
setInterval(cheatLoop, 16);