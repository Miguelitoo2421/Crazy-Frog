class Rana {
  constructor() {
    this.x = 380; // posición en eje x (left)
    this.y = 500; // posicion en eje y (top)
    this.h = 90; // altura.
    this.w = 105; // ancho.
    this.velocidadSaltoLateral = 50;
    this.velocidadSaltoArriba = 300;
    this.velocidadGravedad = 4;
    this.enElAire = false;
    this.alturaSaltoOriginal = this.y;

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
    this.node.style.zIndex = "10"

    this.lengua = null;
  }


  // METODOS PARA NUESTRA RANA.
  saltoArriba() {
    if(this.lengua || this.enElAire) return;
    this.enElAire =  true;
    this.alturaSaltoOriginal = this.y;
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
      this.lengua = new Lengua(this.x + this.w / 2 - 5, this.y + this.h * 0.9, 10, 1); // La lengua sale de la cabeza

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

  gravedadSaltoArriba(){
    if (this.enElAire) {
      this.y += this.velocidadGravedad;
      this.node.style.top = `${this.y}px`;

      // Verificar si la rana ha vuelto a su altura original o está por debajo
      if (this.y >= this.alturaSaltoOriginal) {
        this.y = this.alturaSaltoOriginal; // Asegúrate de que no se pase de la altura original
        this.node.style.top = `${this.y}px`;
        this.enElAire = false; // La rana ya no está en el aire
      }
    }
  }
}
