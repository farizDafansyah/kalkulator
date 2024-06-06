const input = document.querySelector(".input input");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");
const keyword = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00"];
const operator = ["%", "=", "-", "+", "x", `/`, ".", "^", "clear", "del"];

function handle(value) {
  if (!keyword.includes(value) && !operator.includes(value)) return;

  if (value == "=") {
    input.value = result.innerHTML;
  } else if (value == "clear") {
    input.value = "";
  } else if (value == "del") {
    input.value = input.value.slice(0, -1);
  } else {
    if (operator.includes(input.value[input.value.length - 1]) && operator.includes(value)) {
      input.value = input.value.slice(0, -1);
    }
    input.value += value;
  }
  try {
    if (!operator.includes(input.value[0]) || input.value[0] == "-") {
      result.innerHTML = eval(input.value.replace("^", "**").replace("x", "*")) ?? "0";
    } else {
      result.innerHTML = "error";
    }
  } catch (error) {}

  input.scrollLeft = input.scrollWidth;
}

buttons.forEach((button) => {
  button.addEventListener("click", ({ target }) => {
    handle(target.innerHTML);
  });
  addEventListener("keydown", ({ key }) => {
    if (key == button.innerHTML) {
      button.style.backgroundColor = "blue";
    }
  });
  addEventListener("keyup", ({ key }) => {
    if (key == button.innerHTML) {
      button.style.backgroundColor = "";
    }
  });
});

addEventListener("keydown", ({ key }) => {
  if (key == "Backspace") handle("del");
  else if (key == "Enter") handle("=");
  else handle(key);
});
