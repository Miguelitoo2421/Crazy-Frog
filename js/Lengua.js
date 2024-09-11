class Lengua {
  constructor(x, y, width, height) {
    this.x = x; // La posición X de la lengua se inicia desde la posición de la rana
    this.y = y; // La posición Y de la lengua se inicia desde la cabeza de la rana
    this.w = width; // Ancho inicial de la lengua (podemos hacerlo crecer)
    this.h = height; // Altura de la lengua
    this.maxHeight = 150; // Longitud máxima de la lengua (hasta donde se extiende)
    this.speed = 10; // Velocidad a la que se extiende/retrae


    this.node = document.createElement("div");
    cajaJuegoNode.append(this.node);

    // Crear el elemento visual de la lengua
    
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = "red"; // Color de la lengua
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.borderRadius = `${this.w / 2}px`;
    this.node.style.border = "1px solid black";


    
    this.isExtending = true; // Estado inicial: la lengua se extiende

  }

  moverLengua() {
    if (this.isExtending) {
      // Si la lengua se está extendiendo
      this.h += this.speed; // Incrementa la altura (se extiende hacia arriba)
      if (this.h >= this.maxHeight) {
        this.isExtending = false; // Comienza a retraerse al llegar a la longitud máxima
      }
    } else {
      // Si la lengua se está retrayendo
      this.h -= this.speed;
      if (this.h <= 0) {
        this.removeLengua(); // Eliminar la lengua cuando se retrae por completo
      }
    }

    // Actualiza la posición de la lengua
    this.node.style.height = `${this.h}px`; // Actualiza la altura de la lengua
    this.node.style.left = `${this.x}px`; // Mantiene la posición horizontal constante
    this.node.style.top = `${this.y - this.h}px`; // Actualiza la posición vertical (mueve hacia arriba)
  }

  removeLengua() {
    this.node.remove(); // Eliminar la lengua del DOM
  }
}
