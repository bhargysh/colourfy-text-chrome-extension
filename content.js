chrome.runtime.sendMessage({
  from: "content",
  subject: "showBrowserAction",
});

const inputs = document.getElementsByTagName("input");
document.addEventListener("change", () => {
  for (const elem of inputs) {
    elem.checked ? changeTheme(elem) : "";
  }
});

function changeTheme(elem) {
  console.log("ABOUT TO EXECUTE CSS...");

  console.log(chrome.tabs);
  const insertingCSS = chrome.tabs.insertCSS({ file: `${elem.id}.scss` });
  console.log(insertingCSS);

  console.log("FINISHED EXECUTING CSS");
}
