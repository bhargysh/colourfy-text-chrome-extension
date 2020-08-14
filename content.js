chrome.runtime.sendMessage({
  from: "content",
  subject: "showBrowserAction",
});

chrome.runtime.onMessage.addListener((msg, _sender, state) => {
  if (msg.from === "background" && msg.subject === "current theme") {
    checkRadioButton(state);
    insertChosenCSS(state);
  }
});

const inputs = document.getElementsByTagName("input");
document.addEventListener("change", () => {
  for (const elem of inputs) {
    elem.checked ? changeTheme(elem) : "";
  }
});

function changeTheme(elem) {
  try {
    console.log("ABOUT TO EXECUTE CSS...");
    insertChosenCSS(elem.id);
    console.log("FINISHED EXECUTING CSS");

    updateState(elem.id);
  } catch (error) {
    console.error(error);
  }
}

function insertChosenCSS(themeStr) {
  chrome.tabs.insertCSS({ file: `${themeStr}.scss` });
}

function updateState(theme) {
  chrome.runtime.sendMessage({
    from: "content",
    subject: "Update state",
    state: theme,
  });
}

function checkRadioButton(state) {
  const elem = document.getElementsById(state)
  console.log(`ID: ${elem.id} CHECKED: ${elem.checked}`);
  elem.checked = true;
}

// https://stackoverflow.com/questions/23339944/remember-state-chrome-extension
