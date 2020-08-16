const defaultTheme = "bubblegum";

function askBackgroundToInjectCSS(id) {
  chrome.runtime.sendMessage(
    { from: "content", subject: "injectCSS", theme: id },
    function (response) {
      console.log(response);
    }
  );
}

function setStateToTheme(obj) {
  chrome.storage.sync.set(obj, function () {
    checkRadioButton(obj.theme);
  });
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    chrome.storage.sync.get("theme", function (obj) {
      if (obj.theme) {
        const theme = obj.theme;
        askBackgroundToInjectCSS(theme);
      } else {
        askBackgroundToInjectCSS(defaultTheme);
        setStateToTheme({ theme: defaultTheme });
      }
    });
  }
});
