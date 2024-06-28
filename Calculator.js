class Calculator {
  constructor() {
    this.operation = ""; // Inicializamos la operación como una cadena
    this.result = null;
  }

  // Método para concatenar un número o un operador a la operación actual
  add(value) {
    // Concatenamos el valor al final de la operación actual
    this.operation += value;
  }

  // Método para evaluar la operación actual y devolver el resultado
  evaluate() {
    if (this.operation != "") {
      this.result = eval(this.operation);
      this.operation = this.result.toString(); // Actualizamos operation con el resultado convertido a cadena
      console.log(this.result);
    }
  }

  // Método para eliminar el último carácter de la operación actual
  delete() {
    // Verificar si la operación actual no está vacía
    if (this.operation !== "") {
      // Obtener el último carácter de la operación actual
      const lastChar = this.operation.slice(-1);

      // Verificar si el último carácter es un paréntesis de apertura
      if (lastChar === "(") {
        // Eliminar el paréntesis de apertura y el operador que lo precede
        this.operation = this.operation.slice(0, -2);
      } else {
        // Si no es un paréntesis de apertura, eliminar solo el último carácter
        this.operation = this.operation.slice(0, -1);
      }
    }
  }

  // Método para borrar la operación actual
  clear() {
    this.operation = ""; // Reiniciamos la operación como una cadena vacía
    this.result = null; // Reiniciamos el resultado
  }
  // Método para manejar la adición de un operador '+'
  handleAddition() {
    this.add("+");
    console.log(this.operation);
  }

  // Método para manejar la adición de un operador '-'
  handleSubtraction() {
    this.add("-");
    console.log(this.operation);
  }

  // Otros métodos para manejar diferentes operaciones
  handleMultiplication() {
    this.add("*");
    console.log(this.operation);
  }

  // Método para manejar la adición de un operador '/'
  handleDivision() {
    this.add("/");
    console.log(this.operation);
  }

  // Método para manejar la adición de un operador '%'
  handlePercentage() {
    this.add("%");
    console.log(this.operation);
  }
  // Método para manejar la adición de un paréntesis '('
  handleOpeningParenthesis() {
    const lastChar = this.operation.slice(-1);
    if (lastChar !== "" && !isNaN(parseInt(lastChar))) {
      //  ! => inverso
      //  isNaN() true si es un numero
      //  parseInt(lastChar) si lastChar es un numero, o cadena de numero, retorna el numero

      // Agregar automáticamente el símbolo de multiplicación antes de abrir el paréntesis
      this.add("*");
    }
    this.add("(");
    console.log(this.operation);
  }

  // Método para manejar la adición de un paréntesis ')'
  handleClosingParenthesis() {
    this.add(")");
    console.log(this.operation);
  }
}
