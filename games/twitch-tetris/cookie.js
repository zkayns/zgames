function createCookie(name,value,days) {
    localStorage.setItem(name, value);
};
function readCookie(name) {
    return localStorage.getItem(name);
};
function eraseCookie(name) {
    localStorage.removeItem(name);
};
function readSpecialCookie(name) {
    if (!readCookie(name)) return null;
    switch (readCookie(name).split("_")[0]) {
        case "BOOLEAN":
            return readCookie(name)=="BOOLEAN_true";
        case "NUMBER":
            return parseFloat(readCookie(name).slice(readCookie(name).indexOf("_")+1));
        case "STRING":
            return readCookie(name).slice(readCookie(name).indexOf("_")+1);
        case "OBJECT":
            return JSON.parse(readCookie(name).slice(readCookie(name).indexOf("_")+1));
        default:
            return readCookie(name);
    };
    return 0;
};
readCheatCookies();