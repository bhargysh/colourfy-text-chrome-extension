chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.from === "content" && msg.subject === "showBrowserAction") {
    sender.tab
      ? chrome.browserAction.enable(sender.tab.id)
      : console.log("NO TAB ID");
  }
});
