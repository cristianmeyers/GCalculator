class Display {
  constructor(displayElement) {
    this.displayElement = displayElement;
  }

  // Método para añadir un dígito a la pantalla
  addDigit(digit) {
    if (this.displayElement.textContent === "0") {
      this.displayElement.textContent = digit;
    } else {
      // Agrega el nuevo dígito al final del contenido existente
      this.displayElement.textContent += digit;
    }
  }

  // Método para borrar un dígito de la pantalla
  deleteDigit() {
    if (this.displayElement.textContent.length === 1) {
      this.displayElement.textContent = "0";
    } else {
      this.displayElement.textContent = this.displayElement.textContent.slice(
        0,
        -1
      );
    }
  }
  // add parentheses
  addParentheses(pressed) {
    if (
      this.displayElement.textContent === "0" ||
      this.displayElement.textContent === "1"
    ) {
      if (pressed === "p1") {
        this.displayElement.textContent = "(";
      } else {
        this.displayElement.textContent = ")";
      }
    } else {
      if (pressed === "p1") {
        this.displayElement.textContent += "(";
      } else {
        this.displayElement.textContent += ")";
      }
    }
  }
  aece() {}
}
