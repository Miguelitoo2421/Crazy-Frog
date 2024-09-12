class Lengua {
  constructor(x, y, width, height) {
    this.x = x; 
    this.y = y; 
    this.w = width;
    this.h = height; 
    this.maxHeight = 250; 
    this.speed = 20; 
    
    this.node = document.createElement("div");
    cajaJuegoNode.append(this.node);

    this.node.style.position = "absolute";
    this.node.style.backgroundColor = "red"; 
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.borderRadius = `${this.w / 2}px`;
    this.node.style.border = "1px solid black";
    
    this.isExtending = true; 
  }

  moverLengua() {
    if (this.isExtending) {
      this.h += this.speed; 
      if (this.h >= this.maxHeight) {
        this.isExtending = false; 
      }
    } else {
      
      this.h -= this.speed;
      if (this.h <= 0) {
        this.removeLengua();
      }
    }
    this.node.style.height = `${this.h}px`; 
    this.node.style.left = `${this.x}px`; 
    this.node.style.top = `${this.y - this.h}px`; 
  }

  removeLengua() {
    this.node.remove(); 
  }
}
