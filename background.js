chrome.runtime.onMessage.addListener((msg, sender, state) => {
  if (msg.from === "content" && msg.subject === "showBrowserAction") {
    sender.tab ? getTheme : console.log("NO TAB ID");
  } else if (msg.from === "content" && msg.subject === "Update state") {
    setTheme(state);
  }
});

function getTheme() {
  // chrome.browserAction.enable(sender.tab.id);
  chrome.storage.sync.get("theme", function (data) {
    data.theme ? console.log(data.theme) : console.log("UNDEFINED");
    if (data.theme === undefined) {
      data.theme = "bubblegum"; // default value
      console.log(data.theme);
    } else {
      chrome.runtime.sendMessage({
        from: "background",
        subject: "current theme",
        theme: data.theme,
      });
      console.log(data.theme);
    }
  });
}

function setTheme(value, callback) {
  chrome.storage.sync.set({ theme: value }, function () {
    if (chrome.runtime.lastError) {
      throw Error(chrome.runtime.lastError);
    } else {
      console.log("STATE SAVED");
      callback;
    }
  });
}
