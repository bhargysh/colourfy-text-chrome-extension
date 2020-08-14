const inputs = document.getElementsByTagName("input");
document.addEventListener("change", () => {
  for (const elem of inputs) {
    elem.checked ? changeTheme(elem) : console.log(`NOPE ${elem.id}`);
  }
});

function changeTheme(elem) {
  console.log("ABOUT TO EXECUTE CSS...");

  chrome.browserAction.onClicked.addListener(() => {
    function onError(error) {
      console.log(`Error: ${error}`);
    }

    var insertingCSS = chrome.tabs.insertCSS({ file: `${elem.id}.scss` });
    insertingCSS.then(null, onError);
  });

  console.log("FINISHED EXECUTING CSS");
}

// function changeTheme(elem) {
//   console.log("in changeTheme");
//   chrome.tabs.sendMessage("changeTheme", function (response) {
//     console.log(response);
//   });
//   chrome.runtime.onMessage.addListener(function (message, callback) {
//     console.log(message);
//     if (message == "changeTheme") {
//       console.log("ABOUT TO EXECUTE CSS...");
//       chrome.tabs.executeScript({ file: `${elem.id}.scss` });
//       console.log("FINISHED EXECUTING CSS");
//     }
//   });
// }

// function changeTheme(elem) {
//   const port = chrome.runtime.connect({ name: "myPort" });
//   console.log(port.postMessage({ change: "theme" }));
//   port.postMessage({ change: "theme" });
//   port.onMessage.addListener(function (msg) {
//     console.log(msg);
//     if (msg.change == "theme")
//       chrome.tabs.executeScript({ file: `${elem.id}.scss` });
//   });
// }
