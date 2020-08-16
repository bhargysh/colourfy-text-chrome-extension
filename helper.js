function injectCSS(id) {
  chrome.tabs.insertCSS({ file: `${id}.scss` });
}
function checkRadioButton(id) {
  document.getElementById(id).checked = true;
}
function setStateToTheme(obj) {
  chrome.storage.sync.set(obj, function () {
    checkRadioButton(obj.theme);
  });
}

function logState() {
  chrome.storage.sync.get(null, function (items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
  });
}

export {
  defaultTheme,
  injectCSS,
  checkRadioButton,
  setStateToTheme,
  logState,
};
