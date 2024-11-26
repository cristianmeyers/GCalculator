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

// generador de array
function toArray(expression) {
  const tokens = [];
  let currentToken = "";

  for (let char of expression) {
    if (!isNaN(char) || char === ".") {
      // Si es número o punto decimal, añadir al token actual
      currentToken += char;
    } else {
      // Si es un operador o paréntesis, guardar el token actual y reiniciar
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char); // Añadir el operador o paréntesis como un token separado
    }
  }

  // Añadir el último token si existe
  if (currentToken) tokens.push(currentToken);

  // Normalizar ciertos operadores (si es necesario)
  return tokens.map((token) =>
    token === "x" ? "*" : token === "÷" ? "/" : token
  );
}

// agnadir a pantalla
function appendScreen(text) {
  screen.textContent =
    screen.textContent === "0" ? text : screen.textContent + text;
}

// Añadir eventos a todos los botones
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    reload = false; // Reiniciar para ocultar el botón "ac"
    toggleButtons(); // Alternar la visibilidad de los botones

    // Si es un número, lo añadimos correctamente
    if (!isNaN(value) || value === ".") {
      // Si la pantalla muestra 0 o está vacía, reemplazamos el contenido
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

        case "=":
          // class toggle
          reload = true;
          toggleButtons();
          // validate expression

          const expressionArray = toArray(screen.textContent); // Convertir a array
          console.log(expressionArray);
          const result = evaluateExpression(expressionArray); // Evaluar
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
