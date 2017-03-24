document.addEventListener('mouseup', function (event) {
  var selectedText = window.getSelection().toString().trim();

  showCaptureWindow(selectedText, event)

  // SHOULD SEND EMPTY STRING IF NO TEXT SELECTED
  // if (selectedText.length <= 0) return;

  // Send message to extension
  chrome.runtime.sendMessage({
    'type': 'SELECT_TEXT',
    'payload': selectedText
  }, function (response) {
    console.log(response);
  });
})


let captureWindow = null;

function showCaptureWindow(selectedText, event) {
  if (selectedText.length <= 0) {
    if (captureWindow) {
      document.querySelector('body').removeChild(captureWindow)
      captureWindow = null;
    }
    return
  }

  if (captureWindow) {
    document.querySelector('body').removeChild(captureWindow)
    captureWindow = null;
  }

  // Capture window
  captureWindow = document.createElement('div')
  captureWindowStyle = {
    position: 'fixed',
    top: `${event.clientY}px`,
    left: `${event.clientX}px`,
    maxHeight: '400px',
    boxShadow: '0px 0px 5px #e1e1e1'
  }
  Object.assign(captureWindow.style, captureWindowStyle)

  // Iframe
  let iframeSite = document.createElement('iframe')
  iframeSite.src = 'http://localhost:3000/dictionary/' + selectedText
  iframeSite.width = '400px'
  iframeSite.height = '600px'
  iframeSite.frameBorder = 0

  captureWindow.appendChild(iframeSite)
  document.querySelector('body').appendChild(captureWindow)
}
