import {
  defaultTheme,
  injectCSS,
  checkRadioButton,
  setStateToTheme
} from "./helper.js";

chrome.browserAction.setPopup({ popup: "popup.html" });

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("theme", function (obj) {
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

  document.addEventListener("change", () => {
    chrome.tabs.query({ active: true }, () => {
        document.getElementsByName("theme").forEach((input) => {
        if (input.checked) {
          injectCSS(input.id);
          setStateToTheme({ theme: input.id });
        } else console.log(`UNCHECKED ${input.id}`);
      });
    });
  });
});
