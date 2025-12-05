function createCookie(name,value,days) {
    localStorage.setItem(name, value);
}

function readCookie(name) {
    return localStorage.getItem(name);
}

function eraseCookie(name) {
    localStorage.removeItem(name);
}