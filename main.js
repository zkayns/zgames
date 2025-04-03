var timezone = "EST";
var logs = document.getElementById("logs");
var time = document.getElementById("time");
var keyspressed = [];
var keyspressed2 = [];
var version = document.querySelector(".version").innerHTML.split("v")[1].substring(0,5); //dont make it more than 5 characters or you're stupid btw
//alert(version)
function dlpage() {
    document.location.href = 'https://github.com/zkayns/zgames/archive/refs/heads/main.zip';
};
function popups() {
    alert(["Popups are blocked. You can unblock popups by going to chrome://settings/content/popups, pressing the \"Add\" button next to \"Allowed to send pop-ups and use redirects\", entering ", document.location.href, " under \"Site\", and pressing \"Add\"."].join(""));
};
fetch("https://zgames-telemetry.glitch.me/telemetry.php?" + new URLSearchParams({
    fromZG: true,
}));
  .then((response) => response.text());
  //.then((text) => alert(text));
// stolen ahh function
async function getVersion() {
  let x = await fetch("https://zgames-telemetry.glitch.me/version.php");
  let y = await x.text();
  if (y != version) {
      if (document.location.href.includes("file:///")) { // im indenting this LOLLLL
          var conf = confirm("A new update is available. Would you like to download it?");
          if (conf == true) {
              var link = 'https://github.com/zkayns/zgames/archive/refs/heads/main.zip'
              try { window.open(link, "_blank").focus(); }
              catch (e) /* I HATE IDIOTS AND STUPID PEOPLE */{ popups() }
          };
    };
  };
};
if (console.everything === undefined) {
  console.everything = [];
  function TS(tz){
    return (new Date).toLocaleString("sv", { timeZone: tz }); //+ tz
  };
  window.onerror = function (error, url, line) {
    console.everything.push({
      type: "exception",
      timeStamp: TS(timezone),
      value: { error, url, line }
    })
    return false;
  }
  window.onunhandledrejection = function (e) {
    console.everything.push({
      type: "promiseRejection",
      timeStamp: TS(timezone),
      value: e.reason
    })
  } 

  function hookLogType(logType) {
    const original= console[logType].bind(console)
    return function(){
      console.everything.push({ 
        type: logType, 
        timeStamp: TS(timezone), 
        value: Array.from(arguments) 
      })
      original.apply(console, arguments); updateLogs()
    }
  }

  ['log', 'error', 'warn', 'debug'].forEach(logType=>{
    console[logType] = hookLogType(logType)
  });
};   
function mcloak(url) {
  var win = window.open();
  if (url == null) {
    var url = "./index.html";
  };
  var iframe = win.document.createElement('iframe');
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.margin = "0px";
  iframe.style.overflow = "hidden";
  win.document.body.style.overflow = "hidden";
  win.document.body.style.margin = "0px";
  iframe.src = url;
  win.document.body.appendChild(iframe);
};
$("#logo").on("click", function(){
  window.location.href = "./a/megusta.html";
});
function changeTitle() {
  newTitle = prompt("Enter new page title:", "");
  if (newTitle != '' && String(newTitle) != 'null') {
    document.title = String(newTitle);
  };
};
$("img").on("click", function(e){
    if (e.shiftKey && e.ctrlKey) {
      e.preventDefault();
      var href = e.target.parentElement.getAttribute("href");
      mcloak(href);
    };
};
document.onclick = function(e) {
    if (e.target.tagName == 'IMG') {
      var alt = e.target.getAttribute("alt");
    fetch("https://zgames-telemetry.glitch.me/game.php?" + new URLSearchParams({
        fromZG: true,
        game: alt,
    }))
    }
  }
const customjs = document.getElementById("customjs");
$(".customjs").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        eval(String(customjs.value))
    }
});
const cons = document.getElementById("console");
cons.style.display = "none";
$(".console").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        eval(String(cons.value))
    };
});
const emergencybox = document.getElementById("emergency");
$(".emergency").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        localStorage.setItem("emergency", emergencybox.value)
    };
});
$("body").on('keyup', function(e) {
    if (e.key === '`' && !$("input").is(":focus")) toggleConsole();
});
setInterval(updateLogs, 10);
setInterval(updateTime, 10);
function updateLogs() {
    logs.value = "";
    for (let i = 0; i < console.everything.length; i++) {
        var logMessage = Object.values(console.everything[i]).join(" ");
        if (Object.values(console.everything[i])[2] == "[object Object]") {
        logs.value = [logs.value, logMessage, Object.values(Object.values(console.everything[i])[2]).join(" ")].join("\n");
        } else {
        logs.value = [logs.value, logMessage].join("\n");
        };
    };
    logs.value = logs.value.slice(1);
};
const injectCSS = css => {
  let el = document.createElement('style');
  el.type = 'text/css';
  el.innerText = css;
  document.head.appendChild(el);
  return el;
};
function updateTime() {
    var d = new Date();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var ampm = "AM";
    var seconds = String(d.getSeconds()).padStart(2, "0");
    var minutes = String(d.getMinutes()).padStart(2, "0");
    if (d.getHours() == 0) {
        var hours = 12
    } else if (d.getHours() >= 13) {
        ampm = "PM";
        var hours = d.getHours() - 12;
    } else {
        var hours = d.getHours();
    };
    if (d.getHours() == 12) ampm = "PM";
    var monthAsName = months[d.getMonth()];
    var timeformatted = [hours % 13, ":", minutes, ":", seconds, " ", ampm, ", ", monthAsName, " ", d.getDate(), ", ", d.getFullYear()].join("");
    time.innerHTML = timeformatted;
};
function savejs() {
    localStorage.setItem("autoload", customjs.value.toString());
};
if (localStorage.getItem("autoload")) {
    eval(localStorage.getItem("autoload"));
};
function clearjs() {
    localStorage.removeItem("autoload");
};
function getjs() {
    customjs.value = localStorage.getItem("autoload");
};
function clearlogs() {
    logs.value = "";
    console.everything = [];
};
document.onkeypress = function (e) {
    keyspressed.push(e.key);
    lastpressedkey = keyspressed.slice(-1);
    keyspressed2.push(e.key);
    var shift = e.shiftKey;
    var ctrl = e.ctrlKey;
    var alt = e.altKey;
    lookout();
    if (e.key == "E" && e.metaKey /*e.metaKey?? what was i on when i made this*/) {
        emergency();
    };
};
function lookout() {
    // put smth here idk
};
function clearkeyspressed(temp) {
    if (temp == 0) {
        keyspressed = [];
    } else {
        keyspressed2 = [];
    };
};
function emergency() {
    window.open(localStorage.getItem("emergency"));
};
function comicsans() {
    // thats crazy
    injectCSS('button { font-family: "Comic Sans MS", "Comic Sans", cursive !important; }'); injectCSS('body { font-family: "Comic Sans MS", "Comic Sans", cursive !important; }'); injectCSS('input { font-family: "Comic Sans MS", "Comic Sans", cursive !important; }'); injectCSS('textarea { font-family: "Comic Sans MS", "Comic Sans", cursive !important; }');
};
function share() {
    var data = {
        title: "ZGames",
        url: "https://zkayns.github.io/zgames"
    };
    navigator.share(data);
};
tippy('img', {
    content: (reference) => reference.alt,
    animation: 'scale-subtle',
});
function toggleConsole() {
  if (cons.style.display === "none") {
    cons.style.display = "block";
  } else {
    cons.style.display = "none";
  };
};
