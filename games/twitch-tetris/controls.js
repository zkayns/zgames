var controlsLoaded = false;
var curControl = null;
var cookies = [
    'rotateLeft',
	'rotateRight',
	'shiftLeft',
	'shiftRight',
	'softDrop',
	'hardDrop',
	'swap'
];
function onControlsLoad() {
    jaws.start(InputMonitor);
    // check for an existing controls cookie
    var customControls = readCookie('customControls');

    // these actions will trigger the controls configurations
    if (customControls=='TRUE') {
	    // if there is a cookie, set up the controls for it
	    document.getElementById('customRadio').checked = true;
	    configureCustomControls(true);
    } else {
	    // if no cookie, assign defaults, create the cookie
	    document.getElementById('defaultRadio').checked = true;
	    setDefaultControls();
    };

    configureAutoRepeat();

    controlsLoaded = true;
};

function setDefaultControls() {
    stopPollingInput();

    document.getElementById('instructionsDefault').setAttribute('class', 'withDisplay');
    document.getElementById('instructionsCustom').setAttribute('class', 'noDisplay');
    document.getElementById('instructionsPending').setAttribute('class', 'noDisplay');

    // set the cookies
    createCookie('customControls', 'FALSE', 1000);

    // configure the gui to the default text
    document.getElementById('rotateLeftValue').innerHTML = 'Z';
    document.getElementById('rotateRightValue').innerHTML = 'X, UP';
    document.getElementById('shiftLeftValue').innerHTML = 'LEFT';
    document.getElementById('shiftRightValue').innerHTML = 'RIGHT';
    document.getElementById('softDropValue').innerHTML = 'DOWN';
    document.getElementById('hardDropValue').innerHTML = 'SPACE';
    document.getElementById('swapValue').innerHTML = 'SHIFT, C';
};

function configureCustomControls(fromCookie, restoreDefaults) {
    stopPollingInput();

    document.getElementById('instructionsDefault').setAttribute('class', 'noDisplay');
    document.getElementById('instructionsCustom').setAttribute('class', 'withDisplay');
    document.getElementById('instructionsPending').setAttribute('class', 'noDisplay');

    if (restoreDefaults) {
	    // the cookies need to be created & initialized
	    createCookie('rotateLeft', 'Z', 1000);
	    createCookie('rotateRight', 'X', 1000);
	    createCookie('shiftLeft', 'LEFT', 1000);
	    createCookie('shiftRight', 'RIGHT', 1000);
	    createCookie('softDrop', 'DOWN', 1000);
	    createCookie('hardDrop', 'SPACE', 1000);
	    createCookie('swap', 'C', 1000);
        createCookie('customControls', 'TRUE', 1000);
    };

    // assign all of the GUI elements based on the cookie
    document.getElementById('rotateLeftValue').innerHTML = readCookie('rotateLeft');
    document.getElementById('rotateRightValue').innerHTML = readCookie('rotateRight');
    document.getElementById('shiftLeftValue').innerHTML = readCookie('shiftLeft');
    document.getElementById('shiftRightValue').innerHTML = readCookie('shiftRight');
    document.getElementById('softDropValue').innerHTML = readCookie('softDrop');
    document.getElementById('hardDropValue').innerHTML = readCookie('hardDrop');
    document.getElementById('swapValue').innerHTML = readCookie('swap');
    createCookie("customControls", "TRUE", 1000);
};

function controlsUnitClicked(controlName) {
    // if default controls, switch to custom
    if (readCookie('customControls') != 'TRUE') {
	    // if no cookie, assign defaults, create the cookie
	    document.getElementById('customRadio').checked = true;
	    configureCustomControls(true);
    };

    document.getElementById('instructionsDefault').setAttribute('class', 'noDisplay');
    document.getElementById('instructionsCustom').setAttribute('class', 'noDisplay');
    document.getElementById('instructionsPending').setAttribute('class', 'withDisplay');

    if (curControl !== null) stopPollingInput();
    curControl = {
	    name: controlName,
	    containerId: `${controlName}Div`
    };

    startPollingInput();
};

function startPollingInput() {
    document.getElementById(curControl.containerId).setAttribute('class', 'controlsUnit controlsUnitPending');
    
    inputPolling = true;
};

function stopPollingInput() {
    if (curControl !== null) {
	    inputPolling = false;
	
	    document.getElementById(curControl.containerId).setAttribute('class', 'controlsUnit');
	    curControl = null;
    };
};

function findWhereKeyUsed(key) {
    for (let i = 0; i < cookies.length; i += 1) if (readCookie(cookies[i]) === key) return cookies[i];
    return null;
};

function reportKeyPressed(keyLower) {
    // should never fail this case...
    if (curControl !== null) {
	    var key = keyLower.toUpperCase();

	    // if this key is used anywhere else
	    var controlUsed = findWhereKeyUsed(key);
	    if (controlUsed !== null) {
	        // swap the two controls
	        createCookie(controlUsed, readCookie(curControl.name), 1000);
	        createCookie(curControl.name, key, 1000);
	    } else {
	        // set this key to the new value
	        createCookie(curControl.name, key, 1000);
	    };

	    configureCustomControls(true);

	    stopPollingInput();
    };
};

function configureAutoRepeat() {
    var autoRepeat = readCookie('autoRepeat');
    if (autoRepeat === null) {
	    autoRepeat = "50";
	    createCookie('autoRepeat', autoRepeat, 1000);
    };
    var threshold = readCookie('threshold');
    if (threshold === null) {
	    threshold = "200";
	    createCookie("threshold", threshold, 1000);
    };
    document.getElementById('autoRepeatRange').value = autoRepeat;
    document.getElementById('autoRepeatValue').innerHTML = autoRepeat;
    document.getElementById('thresholdRange').value = threshold;
    document.getElementById('thresholdValue').innerHTML = threshold;
};

function updateAutoRepeat() {
    var newVal = document.getElementById('autoRepeatRange').value;
    document.getElementById('autoRepeatValue').innerHTML = newVal;
    createCookie('autoRepeat', newVal, 1000);
};

function updateThreshold() {
    var newVal = document.getElementById('thresholdRange').value;
    document.getElementById('thresholdValue').innerHTML = newVal;
    createCookie('threshold', newVal, 1000);
};

function resetAutoRepeat() {
    eraseCookie('autoRepeat');
    eraseCookie('threshold');
    configureAutoRepeat();
};
document.getElementById("exportProfile").addEventListener("click", (e)=>{
    let a=document.createElement("a");
    let controlObject={
        autoRepeat: readCookie("autoRepeat"),
        threshold: readCookie("threshold")
    };
    cookies.forEach(c=>controlObject[c]=readCookie(c));
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(controlObject)));
    a.setAttribute('download', "ControlProfile.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
});
document.getElementById("importProfileButton").addEventListener("click", (e)=>{
    document.getElementById("importProfile").click();
});
document.getElementById("importProfile").addEventListener("change", (e)=>{
    if (!e.target.files.length) return false;
    let f=e.target.files[0];
    let fr=new FileReader();
    fr.addEventListener("load", (e)=>{
        let controlObject=JSON.parse(e.target.result);
        if (!controlObject) return false;
        Object.keys(controlObject).forEach(key=>{
            createCookie(key, controlObject[key], 1000);
        });
        configureCustomControls(true);
        configureAutoRepeat();
    });
    fr.readAsText(f);
});
document.getElementById("restoreDefaults").addEventListener("click", (e)=>{
    configureCustomControls(true, true);
    document.getElementById("customRadio").checked=true;
});
function loadCheats() {
    if (readCookie("Cheats.enabled")&&readSpecialCookie("Cheats.enabled")==true) document.getElementById("cheats").checked=true;
    if (readCookie("Cheats.randomSeed.enabled")&&readSpecialCookie("Cheats.randomSeed.enabled")==true) document.getElementById("randomSeed").checked=true;
    if (readCookie("Cheats.randomSeed.seed")) document.getElementById("seed").value=readSpecialCookie("Cheats.randomSeed.seed");
    if (readCookie("Cheats.multiHold.enabled")&&readSpecialCookie("Cheats.multiHold.enabled")==true) document.getElementById("multiHold").checked=true;
    if (readCookie("Cheats.pieceFilter.enabled")&&readSpecialCookie("Cheats.pieceFilter.enabled")==true) document.getElementById("pieceFilter").checked=true;
    if (readCookie("Cheats.pieceFilter.whitelist")) readSpecialCookie("Cheats.pieceFilter.whitelist").forEach(piece=>{
        document.getElementById(`${piece}Piece`).checked=true;
    });
    if (readCookie("Cheats.rowBlocker.enabled")&&readSpecialCookie("Cheats.rowBlocker.enabled")==true) document.getElementById("rowBlocker").checked=true;
    if (readCookie("Cheats.rowBlocker.count")) document.getElementById("rowCount").value=readSpecialCookie("Cheats.rowBlocker.count");
    if (readCookie("Cheats.pieceBinds.enabled")&&readSpecialCookie("Cheats.pieceBinds.enabled")==true) document.getElementById("pieceBinds").checked=true;
};
loadCheats();
function updateCheatState() {
    createCookie("Cheats.enabled", `BOOLEAN_${document.getElementById("cheats").checked}`, 1000);
    createCookie("Cheats.randomSeed.enabled", `BOOLEAN_${document.getElementById("randomSeed").checked}`, 1000);
    createCookie("Cheats.randomSeed.seed", `NUMBER_${document.getElementById("seed").value}`, 1000);
    createCookie("Cheats.multiHold.enabled", `BOOLEAN_${document.getElementById("multiHold").checked}`, 1000);
    createCookie("Cheats.pieceFilter.enabled", `BOOLEAN_${document.getElementById("pieceFilter").checked}`, 1000);
    let whitelistArray=new Array();
    document.querySelectorAll("*").forEach(el=>{
        if ((new RegExp(".Piece", "i")).test(el.id)&&el?.checked) whitelistArray.push(el.id[0]);
    });
    createCookie("Cheats.pieceFilter.whitelist", `OBJECT_${JSON.stringify(whitelistArray)}`, 1000);
    createCookie("Cheats.rowBlocker.enabled", `BOOLEAN_${document.getElementById("rowBlocker").checked}`, 1000);
    createCookie("Cheats.rowBlocker.count", `NUMBER_${document.getElementById("rowCount").value}`, 1000);
    createCookie("Cheats.pieceBinds.enabled", `BOOLEAN_${document.getElementById("pieceBinds").checked}`, 1000);
};
setInterval(updateCheatState, 16);
jaws.clearPreventedKeys();