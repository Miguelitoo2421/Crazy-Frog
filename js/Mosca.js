class Mosca {
  constructor() {
    
    const margen = 5;
    const mitadAltura = cajaJuegoNode.offsetHeight / 2;

    this.x = Math.random() * (cajaJuegoNode.offsetWidth - 2 * margen - 50) +margen; // Posición aleatoria en el eje x
    this.y = Math.random() * (mitadAltura - 50); // Posición aleatoria en el eje y
    this.h = 50; // Altura de la mosca
    this.w = 50; // Ancho de la mosca


    this.node = document.createElement("img");
    this.node.src = "./images/mosca_480.png";
    cajaJuegoNode.append(this.node);

    // Crear el elemento de la mosca
    this.node.style.height = `${this.h}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    // Añadir la mosca a la caja de juego
    cajaJuegoNode.append(this.node);

    setTimeout(() => {
      this.removeMosca();
    }, 2000); // Desaparece después de 5 segundos
  }
    removeMosca(){
    this.node.remove();
  }
}
