chrome.browserAction.setPopup({ popup: "popup.html" });

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

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("theme", function (obj) {
    console.log(`storage on load ${logState()}`);
    console.log(obj);
    if (obj.theme) {
      const id = obj.theme;
      injectCSS(id);
      checkRadioButton(id);
    } else {
      injectCSS(defaultTheme);
      setStateToTheme({ theme: defaultTheme });
    }
  });

  const inputThemes = document.getElementsByName("theme");
  document.addEventListener("change", () => {
    chrome.tabs.query({ active: true }, () => {
      inputThemes.forEach((input) => {
        if (input.checked) {
          injectCSS(input.id);
          setStateToTheme({ theme: input.id });
        } else console.log(`unchecked ${input.id}`);
      });
    });
  });
});
