class Rana {
  constructor() {
    this.x = 350; 
    this.y = 500; 
    this.h = 90; 
    this.w = 105; 
    this.velocidadSaltoLateral = 40;
    this.estaSaltando = false;
    this.limiteSalto = 85;
    this.momentoSalto = this.limiteSalto;
    this.enElAire = false;

    
    

    // añadimos ranita al DOM.
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

  iniciarSalto() {
    if (!this.estaSaltando) {
      this.estaSaltando = true;
      this.enElAire = true;
      this.momentoSalto = this.limiteSalto; 
    }
  }

  salto() {
    if (this.estaSaltando) {
      this.momentoSalto--; 

      const limiteInferior = cajaJuegoNode.offsetHeight - this.h;
      if (this.momentoSalto > this.limiteSalto / 2) {
        
        this.y -= 6; 
        if (this.y < 0) {
          this.y = 0; 
        }
      } else if (this.momentoSalto > 0) {
        this.y += 6; 
        if (this.y > limiteInferior) {
          this.y = limiteInferior; 
        }
      } else {
        this.estaSaltando = false;
        this.enElAire = false;
        this.momentoSalto = this.limiteSalto; 
      }
      this.node.style.top = `${this.y}px`;
    }
  }

  saltoDerecha() {
    if (this.lengua || this.enElAire) return;

    const limiteDerecho = cajaJuegoNode.offsetWidth -this.w;
    this.x += this.velocidadSaltoLateral; 
    if(this.x > limiteDerecho){
      this.x = limiteDerecho;
    }
    this.node.style.left = `${this.x}px`; 
  }

  saltoIzquierda() {
    if (this.lengua || this.enElAire) return;

    this.x -= this.velocidadSaltoLateral; 
    if(this.x < 0){
      this.x = 0;
    }
    this.node.style.left = `${this.x}px`; 
  }

  dispararLengua() {
    if (!this.lengua) {
      this.lengua = new Lengua(
        this.x + this.w / 2 - 5,
        this.y + this.h * 0.3,
        10,
        1
      );
      lenguaAlAire.play();

      const lenguaInterval = setInterval(() => {
        if (this.lengua) {
          this.lengua.moverLengua(); 
          if (this.lengua.h <= 0) {
            clearInterval(lenguaInterval);
            this.lengua = null;
          }
        }
      }, 30); 
    }
  }
}
