const displayvalue = document.getElementById("value");
const displayanswer = document.getElementById("anwser");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
let operation = "";
const display = new Display(displayvalue);
const calculator = new Calculator(operation);
// const ac = document.getElementById("ac");
// const ec = document.getElementById("ec");

number.forEach((button) => {
  button.addEventListener("click", () => {
    const newbutton = button.textContent;
    display.addDigit(newbutton);
    if (displayvalue.textContent !== "0") {
      calculator.add(newbutton);
      console.log(calculator.operation);
    } else {
      console.log("First number is 0");
    }
  });
});

//=============================================== prueba

operator.forEach((pressed) => {
  pressed.addEventListener("click", () => {
    switch (pressed.id) {
      case "equal":
        if (displayvalue.textContent !== "0") {
          // Llama a evaluate para obtener el resultado
          calculator.evaluate();
          // Actualiza el contenido del elemento de la pantalla con el resultado
          displayvalue.textContent = calculator.operation;
          break;
        } else {
          console.log("Empty");
        }
      case "ec":
        display.deleteDigit();
        calculator.delete(); // Reiniciar la operación actual
        break;
      case "ac":
        displayvalue.textContent = "0";
        calculator.clear(); // Borramos la operación actual
        break;
      case "+":
        calculator.handleAddition();
        display.addDigit("+");
        break;
      case "-":
        calculator.handleSubtraction();
        display.addDigit("-");
        break;
      case "x":
        calculator.handleMultiplication();
        display.addDigit("×");
        break;
      case "÷":
        calculator.handleDivision();
        display.addDigit("÷");
        break;
      case "%":
        calculator.handlePercentage();
        display.addDigit("%");
        break;
      case "p1":
        calculator.handleOpeningParenthesis();
        display.addParentheses(pressed.id);
        break;
      case "p2":
        calculator.handleClosingParenthesis();
        display.addParentheses(pressed.id);
        break;
      default:
        break;
    }
  });
});
