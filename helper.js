const defaultTheme = "bubblegum"

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

export {
  defaultTheme,
  injectCSS,
  checkRadioButton,
  setStateToTheme
};
