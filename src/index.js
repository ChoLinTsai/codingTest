// import function inputValidattion from validation.js
const inputValidattion = require("./validation");

// get #check button
const CheckBtn = document.querySelector("#check");

// click event trigger to validate user input
CheckBtn.addEventListener("click", () => {
  let getUserInput = document.querySelector("#input").value;
  let getOutput = document.querySelector("#output");
  getOutput.innerHTML = inputValidattion(getUserInput);
});
