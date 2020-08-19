const defaultTheme = "bubblegum";

function askBackgroundToInjectCSS(id, timerStart) {
  chrome.runtime.sendMessage(
    { from: "content", subject: "injectCSS", theme: id },
    function () {
      console.log(`INJECTED ${Date.now() - timerStart}`);
    }
  );
}

function preLoadCss(id, timerStart) {
  const preloadLink = document.createElement("link");
  preloadLink.href = `${id}.scss`;
  preloadLink.rel = "preload";
  preloadLink.as = "style";
  document.head.appendChild(preloadLink);
  console.log(`PRELOADED ${Date.now() - timerStart}`);
}

function setStateToTheme(obj) {
  chrome.storage.sync.set(obj, function () {
    checkRadioButton(obj.theme);
  });
}
if (document.readyState === "loading") {
  const timerStart = Date.now();
  console.log(`PAGE LOADING, ${Date.now() - timerStart}`);
  chrome.storage.sync.get("theme", function (obj) {
    console.log(`syncing with storage, ${Date.now() - timerStart}`);
    if (obj.theme) {
      const theme = obj.theme;
      preLoadCss(theme, timerStart);
      askBackgroundToInjectCSS(theme, timerStart);
    } else {
      askBackgroundToInjectCSS(defaultTheme);
      setStateToTheme({ theme: defaultTheme });
    }
  });
}
