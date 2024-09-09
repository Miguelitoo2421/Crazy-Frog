class Rana{

    constructor(){
        this.x = 360; // posición en eje x (left)
        this.y = 500; // posicion en eje y (top)
        this.h = 65; // altura.
        this.w = 70; // ancho.
        this.velocidadSalto = 100;

        // añadir ranita al DOM.

        this.node = document.createElement ("img")
        this.node.src = "./images/frog_360.png"
        cajaJuegoNode.append(this.node);


        // ajustamos sus dimenciones.

        this.node.style.height = `${this.h}px`
        this.node.style.width = `${this.w}px`
        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`

    }
    // METODOS PARA NUESTRA RANA.

    saltoArriba(){
        this.y -= this.velocidadSalto
        this.node.style.top = `${this.y}px`
    }

    saltoDerecha() {
        this.x += this.velocidadSalto; // Mueve hacia la derecha
        this.node.style.left = `${this.x}px`; // Actualiza la posición horizontal
    }
    
    saltoIzquierda() {
        this.x -= this.velocidadSalto; // Mueve hacia la izquierda
        this.node.style.left = `${this.x}px`; // Actualiza la posición horizontal
    }

    saltoAbajo(){
        this.y += this.velocidadSalto
        this.node.style.top = `${this.y}px`
    }


}