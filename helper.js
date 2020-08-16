const defaultTheme = "bubblegum";
function injectCSS(id) {
  console.log(`injectCSS ${id}`);
  chrome.tabs.insertCSS({ file: `${id}.scss` });
}
function checkRadioButton(id) {
  console.log(`checkRadioButton ${id}`);
  console.log(`checkRadioButton before ${document.getElementById(id).checked}`);
  document.getElementById(id).checked = true;
  console.log(`checkRadioButton after ${document.getElementById(id).checked}`);
}
function setStateToTheme(obj) {
  console.log(`storage before setting ${logState()}`);
  chrome.storage.sync.set(obj, function () {
    console.log(`in set state: ${obj}`);
    checkRadioButton(obj.theme);
  });
  console.log(`storage after setting ${logState()}`);
}

function logState() {
  chrome.storage.sync.get(null, function (items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
  });
}

export { defaultTheme, injectCSS, checkRadioButton, setStateToTheme, logState };
