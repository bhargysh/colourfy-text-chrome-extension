const validInputTypes = {
  TEXT: "text",
  PASSWORD: "password",
  EMAIL: "email",
  URL: "url",
};

function doesInputMatch(inputTypeStr) {
  console.log(`text: ${inputTypeStr == validInputTypes.TEXT}`);
  console.log(`password: ${inputTypeStr == validInputTypes.PASSWORD}`);

  inputTypeStr == validInputTypes.TEXT ||
    inputTypeStr == validInputTypes.PASSWORD;
}

function overrideStyle(inputFields) {
  for (var elem of inputFields) {
    doesInputMatch(elem.type)
      ? console.log(`✅ ${elem.id}`)
      : console.log("⛔️");
  }
}
const allInputs = document.getElementsByTagName("input");
overrideStyle(allInputs);
