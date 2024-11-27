const buttons = document.querySelectorAll(".btn");
const screen = document.getElementById("value"); // Pantalla de la calculadora
let reload = false;
// Alternar las clases 'hide' para los botones
function toggleButtons() {
  const acButton = document.getElementById("ac");
  const ecButton = document.getElementById("ec");

  if (screen.textContent !== "0" && reload === true) {
    acButton.classList.remove("hide");
    ecButton.classList.add("hide");
  } else {
    acButton.classList.add("hide");
    ecButton.classList.remove("hide");
  }
}
// agroupador de funciones matematicas
function groupMathFunctions(arr) {
  // Definir las funciones matemáticas que buscamos
  const functions = ["sin", "cos", "tan", "log", "sqrt", "ln"];

  let result = [];
  let temp = ""; // Variable temporal para construir las palabras

  // Recorremos el array
  for (let i = 0; i < arr.length; i++) {
    temp += arr[i]; // Vamos añadiendo los caracteres a la cadena temporal

    // Si la cadena temporal corresponde a una función matemática, la agregamos al resultado
    if (functions.includes(temp)) {
      result.push(temp); // Añadir la función al array de resultado
      temp = ""; // Reiniciar la cadena temporal
    }
  }

  // Si queda algo en 'temp' que no es una función, lo añadimos tal cual
  if (temp) {
    result.push(temp);
  }

  return result;
}

// Generador de array
function toArray(expression) {
  let array = expression.split("");
  // Filtrar los elementos que no sean espacios en blanco
  let cleanedArray = array.filter((item) => !/^\s*$/.test(item));
  return groupMathFunctions(cleanedArray);
}

// agnadir a pantalla
function appendScreen(text) {
  screen.textContent =
    screen.textContent === "0" ? text : screen.textContent + text;
}

// toggle for each
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    reload = false;
    toggleButtons();
    switch (button.value) {
      case "=":
        reload = true;
        toggleButtons();
        break;
      default:
        break;
    }
  });
});

// Añadir eventos a todos los botones
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    // Si es un número, lo añadimos correctamente
    if (!isNaN(value) || value === ".") {
      appendScreen(value);
    } else {
      // Si es un operador o función especial
      switch (value) {
        case "sin":
        case "cos":
        case "tan":
        case "sqrt":
        case "log":
        case "ln":
          appendScreen(value + "(");
          break;

        case "ac":
          // Limpiar la pantalla
          screen.textContent = "0";
          break;

        case "ec":
          // Eliminar el último carácter
          screen.textContent = screen.textContent.slice(0, -1) || "0";
          break;
        case "*":
          appendScreen(button.textContent);
          break;

        case "=":
          // validate expression

          const expressionArray = toArray(screen.textContent); // Convertir a array
          console.log(expressionArray);

          const result = evaluateExpression(expressionArray); // Evaluar

          // imprimir el valor si no es un error
          if (typeof result === "string" && result.startsWith("Error")) {
            console.error("Error detectado:", result); // Para depuración
            screen.textContent = "Error";
          } else {
            screen.textContent = result;
          }

          break;

        default:
          // Para cualquier otro operador, lo añadimos a la pantalla
          appendScreen(value);
          break;
      }
    }
  });
});
