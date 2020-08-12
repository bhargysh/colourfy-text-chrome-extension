chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("yay running!");

    function overrideStyle(inputFields) {
      for (var item of inputFields) {
        item.value ? console.log(item.value) : console.log("no value");
      }
    }
    const allInputs = document.getElementsByTagName("input");
    overrideStyle(allInputs);
    console.log("the end");
  });
});
