
const HOST_NAME = "com.solominh.chrome.textcapture";
let port = null;

function sendNativeMessage(message) {
  const cleanedMessage=message.trim();
  if (cleanedMessage.length <= 0) return;

  const out = {
    selectedText: cleanedMessage
  }

  console.log("Sent message: <b>" + JSON.stringify(out) + "</b>");
  if (port) {
    port.postMessage(out);
  } else {
    // chrome.runtime.sendNativeMessage(HOST_NAME, out, function (response) {
    //   console.log("Received " + response);
    // });
  }
}

function onNativeMessage(message) {
  console.log("Received message: <b>" + JSON.stringify(message) + "</b>");
}

function onDisconnected() {
  console.log("Failed to connect: " + chrome.runtime.lastError.message);
  port = null;
}

function connect() {

  port = chrome.runtime.connectNative(HOST_NAME);
  port.onMessage.addListener(onNativeMessage);
  port.onDisconnect.addListener(onDisconnected);
}

connect();

var selectedText = "";

// RECEIVE MESSAGE FROM CONTENT SCRIPT
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'SELECT_TEXT': {
      window.selectedText = request.payload;
      sendNativeMessage(window.selectedText);
      break;
    }

    default: {
      sendResponse({ data: 'Invalid arguments' });
      break;
    }
  }
});
