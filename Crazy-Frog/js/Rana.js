class Rana {
  constructor() {
    this.x = 380; // posición en eje x (left)
    this.y = 500; // posicion en eje y (top)
    this.h = 90; // altura.
    this.w = 105; // ancho.
    this.velocidadSaltoLateral = 50;
    this.velocidadSaltoArriba = 300;

    // añadir ranita al DOM.
    this.node = document.createElement("img");
    this.node.src = "./images/frog_360.png";
    cajaJuegoNode.append(this.node);

    // ajustamos sus dimenciones.
    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.lengua = null;
  }


  // METODOS PARA NUESTRA RANA.
  saltoArriba() {
    if(this.lengua) return;
    this.y -= this.velocidadSaltoArriba;
    this.node.style.top = `${this.y}px`;
  }

  saltoDerecha() {
    if(this.lengua) return;
    this.x += this.velocidadSaltoLateral; // Mueve hacia la derecha
    this.node.style.left = `${this.x}px`; // Actualiza la posición horizontal
  }

  saltoIzquierda() {
    if(this.lengua) return;
    this.x -= this.velocidadSaltoLateral; // Mueve hacia la izquierda
    this.node.style.left = `${this.x}px`; // Actualiza la posición horizontal
  }

  dispararLengua() {
    if (!this.lengua) {
      // Crear una lengua solo si no hay una ya activa
      this.lengua = new Lengua(this.x + this.w / 2 - 5, this.y, 10, 1); // La lengua sale de la cabeza

      const lenguaInterval = setInterval(() => {
        if (this.lengua) {
          this.lengua.moverLengua(); // Mover la lengua cada intervalo
          // Si la lengua ya no existe (se retrajo por completo), detener el intervalo
          if (this.lengua.h <= 0) {
            clearInterval(lenguaInterval);
            this.lengua = null; // Resetear la lengua
          }
        }
      }, 30); // Intervalo para animar la lengua
    }
  }
}
