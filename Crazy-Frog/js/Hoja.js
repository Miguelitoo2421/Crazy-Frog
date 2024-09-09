class Hoja {
  constructor() {
    this.x = cajaJuegoNode.offsetWidth; // posición en eje x (left)
    this.y = 60; // posicion en eje y (top)
    this.h = 120; // altura.
    this.w = 120; // ancho.
    this.speed = 1.5;

    // añadir hoja al DOM.

    this.node = document.createElement("img");
    this.node.src = "./images/hoja_480.png";
    cajaJuegoNode.append(this.node);

    // ajustamos sus dimenciones.

    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
  movimientoAutomatico() {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
