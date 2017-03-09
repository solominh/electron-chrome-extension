
// When the popup HTML has loaded
window.addEventListener('load', function (evt) {
  chrome.runtime.getBackgroundPage(function (backgroundPage) {
    // backgroundPage is the window object of extension javascript runtime
    var selectedText = backgroundPage.selectedText; // From background.js
    document.getElementById('output').innerText = selectedText || "No text selected";
  });
});
