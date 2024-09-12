class Rana {
  constructor() {
    this.x = 350; // posición en eje x (left)
    this.y = 500; // posicion en eje y (top)
    this.h = 90; // altura.
    this.w = 105; // ancho.
    this.velocidadSaltoLateral = 40;
    this.estaSaltando = false;
    this.limiteSalto = 85;
    this.momentoSalto = this.limiteSalto;
    this.enElAire = false;

    
    

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
    this.node.style.zIndex = "10";

    this.lengua = null;
  }

  // METODOS PARA NUESTRA RANA.
  iniciarSalto() {
    if (!this.estaSaltando) {
      this.estaSaltando = true;
      this.enElAire = true;
      this.momentoSalto = this.limiteSalto; // Reiniciar el momento del salto
    }
  }

  salto() {
    if (this.estaSaltando) {
      this.momentoSalto--; // Disminuir el momento del salto

      // Verificar los límites del `game box` (ajusta el tamaño según tu contenedor)
      const limiteInferior = cajaJuegoNode.offsetHeight - this.h;

      if (this.momentoSalto > this.limiteSalto / 2) {
        // Movimiento hacia arriba
        this.y -= 6; // Ajusta la velocidad del salto si es necesario
        if (this.y < 0) {
          this.y = 0; // Evitar que la rana suba más allá del borde superior
        }
      } else if (this.momentoSalto > 0) {
        // Movimiento hacia abajo
        this.y += 6; // Ajusta la velocidad del salto si es necesario
        if (this.y > limiteInferior) {
          this.y = limiteInferior; // Evitar que la rana baje más allá del borde inferior
        }
      } else {
        // Finalizar el salto
        this.estaSaltando = false;
        this.enElAire = false;
        this.momentoSalto = this.limiteSalto; // Reiniciar el momento del salto
      }

      this.node.style.top = `${this.y}px`;
    }
  }

  saltoDerecha() {
    if (this.lengua || this.enElAire) return;

    const limiteDerecho = cajaJuegoNode.offsetWidth -this.w;
    this.x += this.velocidadSaltoLateral; // Mueve hacia la derecha
    if(this.x > limiteDerecho){
      this.x = limiteDerecho;
    }
    this.node.style.left = `${this.x}px`; // Actualiza la posición horizontal
  }

  saltoIzquierda() {
    if (this.lengua || this.enElAire) return;

    this.x -= this.velocidadSaltoLateral; // Mueve hacia la izquierda
    if(this.x < 0){
      this.x = 0;
    }
    this.node.style.left = `${this.x}px`; // Actualiza la posición horizontal
  }

  dispararLengua() {
    if (!this.lengua) {
      // creamos la lengua solo si no tenemos una yá activa.
      this.lengua = new Lengua(
        this.x + this.w / 2 - 5,
        this.y + this.h * 0.3,
        10,
        1
      ); // posicion de salida de la lengua.
      lenguaAlAire.play();

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
