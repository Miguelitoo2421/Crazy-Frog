class Hoja {

  constructor(posicionX,posicionY,velocidad) {
    this.x = posicionX; // posición en eje x (left)
    this.y = posicionY; // posicion en eje y (top)
    this.h = 200; // altura.
    this.w = 200; // ancho.
    this.speed = velocidad;

    // añadir cada hoja al DOM.

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
