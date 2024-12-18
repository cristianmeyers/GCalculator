// Realiza pruebas automáticas para la función evaluateExpression.
function evaluationTest(expressionToTest) {
  // Definición de casos de prueba
  const testCases = [
    // 1-4: Operaciones básicas
    { input: [2, "+", 2], expected: 4, description: "Suma básica" },
    { input: [5, "-", 3], expected: 2, description: "Resta básica" },
    {
      input: [4, "x", 2],
      expected: 8,
      description: "Multiplicación con operador personalizado",
    },
    { input: [8, "/", 2], expected: 4, description: "División básica" },

    // 5-7: Funciones trigonométricas
    {
      input: ["sin", "(", 0, ")"],
      expected: 0,
      description: "Función seno en 0",
    },
    {
      input: ["cos", "(", 0, ")"],
      expected: 1,
      description: "Función coseno en 0",
    },
    {
      input: ["tan", "(", 0, ")"],
      expected: 0,
      description: "Función tangente en 0",
    },

    // 8-9: Multiplicaciones implícitas
    {
      input: [2, "(", 2, "+", 2, ")"],
      expected: 8,
      description: "Multiplicación implícita antes de paréntesis",
    },
    {
      input: ["(", 2, "+", 2, ")", "(", 2, "+", 3, ")"],
      expected: 20,
      description: "Multiplicación implícita entre paréntesis",
    },

    // 10-12: Manejo de errores
    {
      input: [5, "+", "(", 3],
      expected: "Error: paréntesis desbalanceados",
      description: "Error de paréntesis desbalanceados",
    },
    {
      input: ["(", 2, "+", 2, ")", "/", 0],
      expected: "Error al evaluar la expresión: Division by zero",
      description: "Error de división por cero",
    },
    {
      input: [3, "+", "sin"],
      expected: "Error al evaluar la expresión: Unexpected end of input",
      description: "Función sin malformada",
    },

    // 13-15: Operaciones complejas
    {
      input: [3, "+", 4, "x", 2, "/", "(", 1, "-", 5, ")"],
      expected: 1,
      description: "Expresión compleja con múltiples operadores",
    },
    {
      input: ["(", 2, "+", 3, ")", "x", "(", 4, "-", 1, ")"],
      expected: 15,
      description: "Multiplicación implícita y operaciones combinadas",
    },
    {
      input: [10, "/", "(", 2, "+", 3, ")"],
      expected: 2,
      description: "División con paréntesis",
    },

    // 16-18: Funciones trigonométricas avanzadas
    {
      input: ["sin", "(", Math.PI, "/", 2, ")"],
      expected: 1,
      description: "Función seno con PI/2",
    },
    {
      input: ["cos", "(", Math.PI, ")"],
      expected: -1,
      description: "Función coseno con PI",
    },
    {
      input: ["tan", "(", Math.PI, "/", 4, ")"],
      expected: 1,
      description: "Función tangente con PI/4",
    },

    // 19-21: Números negativos
    {
      input: [-2, "x", 3],
      expected: -6,
      description: "Multiplicación con número negativo",
    },
    {
      input: [-4, "/", 2],
      expected: -2,
      description: "División con número negativo",
    },
    {
      input: [-3, "+", "(", 4, "/", -2, ")"],
      expected: -5,
      description: "Suma y división con número negativo",
    },

    // 22-23: Operaciones con fracciones
    {
      input: [0.5, "+", 0.25],
      expected: 0.75,
      description: "Suma de fracciones",
    },
    {
      input: [5, "-", "(", 2.5, "x", 2, ")"],
      expected: 0,
      description: "Operación con fracciones y paréntesis",
    },

    // 24-26: Manejo de errores avanzados
    {
      input: ["(", 3, "+", 5, ")", "*", ")"],
      expected: "Error: paréntesis desbalanceados",
      description: "Paréntesis extraños desbalanceados",
    },
    {
      input: [10, "-", "(", 3, "*", 3, "+", "(", 1, ")"],
      expected: "Error: paréntesis desbalanceados",
      description: "Errores en el anidado de paréntesis",
    },
    {
      input: [1, "/", 0],
      expected: "Error al evaluar la expresión: Division by zero",
      description: "División por cero",
    },

    // 27-28: Expresiones regulares con paréntesis
    {
      input: [-4, "/", -2],
      expected: 2,
      description: "División con números negativos",
    },
    {
      input: ["(", -3, ")", "*", "(", 5, "-", -2, ")"],
      expected: -21,
      description: "Multiplicación implícita con paréntesis y negativos",
    },

    // 29-32: Expresiones con doble signos
    {
      input: [5, "-", "-", 5],
      expected: 10,
      description: "Operadores consecutivos '--' interpretados como suma",
    },
    {
      input: [5, "+", "-", 5],
      expected: 0,
      description: "Operadores consecutivos '+-' interpretados como resta",
    },
    {
      input: [5, "-", "+", 5],
      expected: 0,
      description: "Operadores consecutivos '-+' interpretados como resta",
    },
    {
      input: [5, "+", "+", 5],
      expected: 10,
      description: "Operadores consecutivos '++' interpretados como suma",
    },
  ];

  // Ejecutar cada caso de prueba
  testCases.forEach(({ input, expected, description }, index) => {
    const result = expressionToTest(input);

    if (result === expected) {
      console.log(`✅ Test ${index + 1}: ${description} - PASÓ`);
    } else {
      console.error(`❌ Test ${index + 1}: ${description} - FALLÓ`);
      console.error(`   Entrada: ${input}`);
      console.error(`   Resultado esperado: ${expected}`);
      console.error(`   Resultado obtenido: ${result}`);
    }
  });
}
// Redondeo
function roundResult(value, decimals = 10) {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

// Función principal evaluateExpression (incluida para que sea autónoma)
function evaluateExpression(expressionArray) {
  function preprocessExpression(input) {
    // Convierte operadores consecutivos:
    // "--" se convierte en "+"
    // "+-" se convierte en "-"
    // "-+" se convierte en "-"
    // "++" se mantiene como "+"
    return input
      .replace(/--/g, "+")
      .replace(/\+-/g, "-")
      .replace(/-\+/g, "-")
      .replace(/\+\+/g, "+");
  }
  // Reemplazar operadores y funciones personalizadas
  let processedArray = expressionArray.map((item) => {
    if (item === "x") return "*"; // Reemplazo para multiplicación x normal
    if (item === "✕") return "*"; // simbolo ✕
    if (item === "sin") return "Math.sin"; // Reemplazo para seno
    if (item === "cos") return "Math.cos"; // Reemplazo para coseno
    if (item === "tan") return "Math.tan"; // Reemplazo para tangente
    if (item === "log") return "Math.log10"; // Logaritmo base 10
    if (item === "ln") return "Math.log"; // Logaritmo natural
    if (item === "sqrt") return "Math.sqrt"; // Raíz cuadrada
    if (item === "e") return "Math.E"; // Constante de Euler

    return item;
  });

  let resultArray = [];
  processedArray.forEach((data, index) => {
    // Insertar multiplicación implícita antes de paréntesis abierto si es necesario
    if (data === "(" && !isNaN(processedArray[index - 1])) {
      resultArray.push("*");
    }

    // Insertar multiplicación implícita entre paréntesis consecutivos
    if (data === "(" && processedArray[index - 1] === ")") {
      resultArray.push("*");
    }

    resultArray.push(data);

    // Insertar multiplicación implícita después de paréntesis cerrado si es necesario
    if (data === ")" && !isNaN(processedArray[index + 1])) {
      resultArray.push("*");
    }
  });

  // Validar paréntesis balanceados
  let openParen = 0;
  let isValid = true;
  resultArray.forEach((item) => {
    if (item === "(") openParen++;
    if (item === ")") openParen--;
    if (openParen < 0) isValid = false; // Paréntesis cerrado antes de abrir uno
  });

  if (openParen !== 0) isValid = false; // Paréntesis desbalanceados
  if (!isValid) {
    return "Error: paréntesis desbalanceados";
  }

  // Evaluar la expresión
  try {
    let expression = eval(preprocessExpression(resultArray.join("")));
    if (expression === Infinity) {
      return "Error al evaluar la expresión: Division by zero";
    } else if (isNaN(expression)) {
      return "Error al evaluar la expresión: Unexpected end of input";
    } else {
      return roundResult(expression); // Redondear antes de devolver
    }
  } catch (error) {
    return `Error al evaluar la expresión: ${error.message}`;
  }
}

// Llamar a la función de pruebas
//evaluationTest(evaluateExpression);

// input2 = ['(', 2, '+', 2, ')', '(', 2, '+', 3, ')', 'sin', '(', 2, ')', '+', 7];

//console.log(evaluateExpression(input2));
