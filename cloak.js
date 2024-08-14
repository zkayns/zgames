function cloak(url) {
  var win = window.open()
  if (url == null) {
    var url = "./index.html"
  }
  var iframe = win.document.createElement('iframe')
  iframe.style.width = "100%"
  iframe.style.height = "100%"
  iframe.style.border = "none"
  iframe.style.margin = "0px"
  iframe.style.overflow = "hidden"
  win.document.body.style.overflow = "hidden"
  win.document.body.style.margin = "0px"
  iframe.src = url
  win.document.body.appendChild(iframe)
}