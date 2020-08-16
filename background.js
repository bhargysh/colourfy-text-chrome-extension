chrome.runtime.onMessage.addListener((msg) => {
  if (msg.from === "content" && msg.subject === "injectCSS") {
    if (chrome.runtime.lastError) {
      console.warn("Whoops.. " + chrome.runtime.lastError.message);
    } else {
      chrome.tabs.insertCSS({ file: `${msg.theme}.scss` });
    }
    chrome.runtime.sendMessage({
      from: "background",
      msg: "CSS Injected!",
    });
  }
});
