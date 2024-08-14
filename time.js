var timezone = "EST"
var time = document.getElementById("time")
function updateTime() {
    var d = new Date()
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    if (d.getHours() >= 12) {
        var ampm = "PM"
    } else if (d.getHours() < 12) {
        var ampm = "AM"
    }
    if (d.getSeconds() < 10) {
        var seconds = "0" + d.getSeconds()
    } else {
        var seconds = d.getSeconds()
    }
    if (d.getMinutes() < 10) {
        var minutes = "0" + d.getMinutes()
    } else {
        var minutes = d.getMinutes()
    }
    if (d.getHours() == 0) {
        var hours = 12
    } else if (d.getHours() >= 13) {
        var hours = d.getHours() - 12
    } else {
        var hours = d.getHours()
    } 
    var monthAsName = months[d.getMonth()]
    var timeformatted = [hours % 13, ":", minutes, ":", seconds, " ", ampm, ", ", monthAsName, " ", d.getDate(), ", ", d.getFullYear()].join("")
    time.innerHTML = timeformatted
}
updateTime()
setInterval("updateTime()", "100")