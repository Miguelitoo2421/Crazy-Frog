class Hoja {

  constructor(posicionX,posicionY,velocidad) {
    this.x = posicionX; 
    this.y = posicionY; 
    this.h = 200; 
    this.w = 200; 
    this.speed = velocidad;

    // añadimos Hoja al DOM.

    this.node = document.createElement("img");
    this.node.src = "./images/hojas_pagina_principal_720.png";
    cajaJuegoNode.append(this.node);

    // ajustamos sus dimenciones.

    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
  movimientoAutomatico() {
    this.x += this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
