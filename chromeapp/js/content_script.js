document.addEventListener('mouseup', function (event) {
  var selectedText = window.getSelection().toString();

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
