//* ELEMENTOS DOM:

//! PANTALLAS:
const pantallaInicioNode = document.querySelector("#pantalla-inicio");
const pantallaJuegoNode = document.querySelector("#pantalla-juego");
const pantallaFinalNode = document.querySelector("#pantalla-game-over");
//! BUTTONS:
const botonInicioNode = document.querySelector("#start-btn");
const botonReinicioNode = document.querySelector("#endGame-btn");
//! CAJA DE JUEGO:
const cajaJuegoNode = document.querySelector("#caja-de-juego"); 



//* VARIABLES GLOBALES:
let ranitaObj = null;
let hojaObj = null;
let nuevaMosca = null;

let hojasArray = [];
let moscasArray = [];
let frecuenciaHoja = 3000;
let moscasAtrapadas = 0;

let intervaloBucleJuego = null;
let intervaloAgregarHoja = null;
let intervaloAgregarMosca = null;

let teclaDerechaPresionada = false;
let teclaIzquierdaPresionada = false;

let tiempoRestante = 40; 
let intervaloTemporizador = null;

const musicaFondo = new Audio("./music/musica_pantano.mp3")
musicaFondo.loop = true;

const musicaMoscaAtrapada = new Audio("./music/mosca_atrapada.mp3")

const lenguaAlAire = new Audio("./music/lengua_al_aire.mp3")

const musicaPaginaFinal = new Audio("./music/musica_pantalla_final.mp3")
musicaPaginaFinal.loop = true;

const sonidoSobreBoton = new Audio("./music/sonido_boton_inicio.mp3")



//* FUNCIONES GLOBALES:

function comenzarJuego(){

  
  setTimeout(()=>{
    pantallaInicioNode.style.display = "none"; 
    pantallaJuegoNode.style.display = "flex";
  },300)
  
  
  ranitaObj = new Rana();
  

  
  intervaloBucleJuego = setInterval(()=>{ 
    bucleJuego();
  },Math.round(1000/60))

  
  intervaloAgregarHoja = setInterval(()=>{
    agregarHoja();
  },frecuenciaHoja)

  setTimeout(()=>{
    musicaFondo.play();
  },2000)

  

  intervaloAgregarMosca = setInterval(()=>{
    agregarMosca();
    agregarMosca();
  }, 2000);

  iniciarTemporizador();

}

function bucleJuego(){
  
  hojasArray.forEach((cadaHoja)=>{
    cadaHoja.movimientoAutomatico();
  })

  detectarSalidaHoja();

  if(ranitaObj.lengua){
    ranitaObj.lengua.x = ranitaObj.x + ranitaObj.w / 2 - 5;
    ranitaObj.lengua.y = ranitaObj.y + ranitaObj.h * 0.3;
    detectarChoqueLenguaMosca();
  }

  ranitaObj.salto();
}

function agregarHoja(){
  let nuevaHoja = new Hoja(cajaJuegoNode.offsetWidth,60,-1.5);
  hojasArray.push(nuevaHoja)

  let nuevaHojaAbajo = new Hoja(-120,355,1.5);
  hojasArray.push(nuevaHojaAbajo);
}

function detectarSalidaHoja(){
  if(hojasArray.length === 0){
    return
  }

  if((hojasArray[0].x + hojasArray[0].w) <= 0){
    hojasArray[0].node.remove();
    hojasArray.shift(); 
  }
}

function agregarMosca(){
  nuevaMosca = new Mosca();
  moscasArray.push(nuevaMosca);
}

function detectarChoqueLenguaMosca(){
  if (!ranitaObj.lengua) return;

  moscasArray.forEach((cadaMosca) => {
    if (!cadaMosca.node.parentElement) {
      moscasArray = moscasArray.filter(mosca => mosca !== cadaMosca);
      return;
    }

    const lengua = ranitaObj.lengua;
    const mosca = cadaMosca;

    const lenguaX1 = lengua.x;
    const lenguaY1 = lengua.y - lengua.h; 
    const lenguaX2 = lengua.x + lengua.w;
    const lenguaY2 = lengua.y;

    const moscaX1 = mosca.x;
    const moscaY1 = mosca.y;
    const moscaX2 = mosca.x + mosca.w;
    const moscaY2 = mosca.y + mosca.h;

    const colisionX = lenguaX1 < moscaX2 && lenguaX2 > moscaX1;
    const colisionY = lenguaY1 < moscaY2 && lenguaY2 > moscaY1;
    
    if (colisionX && colisionY) {
      moscasAtrapadas ++
      
      moscaAplastada(mosca.x, mosca.y)

      cadaMosca.removeMosca();
      console.log(cadaMosca)
      moscasArray = moscasArray.filter(mosca => mosca !== cadaMosca);
    }

    if(moscasAtrapadas === 10){
      ganador();
    }
  });
}

function moscaAplastada(x,y){
  const impacto = document.createElement("img");
  impacto.src = "./images/explosion_mosca.png"; 
  impacto.style.position = "absolute";
  impacto.style.left = `${x}px`;
  impacto.style.top = `${y}px`;
  impacto.style.width = "50px"; 
  impacto.style.height = "50px"; 

  cajaJuegoNode.appendChild(impacto);
  musicaMoscaAtrapada.play();

  setTimeout(() => {
    impacto.remove();
  }, 500); //
}

function volverAlInicio(){
  musicaPaginaFinal.pause();
  musicaPaginaFinal.currentTime = 0;
  clearInterval(intervaloBucleJuego);
  clearInterval(intervaloAgregarHoja);
  clearInterval(intervaloAgregarMosca);
  ranitaObj = null;
  hojaObj = null;
  nuevaMosca = null;
  moscasAtrapadas = 0;
  hojasArray = [];
  moscasArray = [];
  tiempoRestante = 40;

  cajaJuegoNode.innerHTML = ""

  pantallaFinalNode.style.display = "none"; 
  pantallaInicioNode.style.display = "flex";
  actualizarEstadisticasFinales();
}

function ganador(){
  pantallaJuegoNode.style.display = "none"
  pantallaFinalNode.style.display = "flex"
  
  musicaFondo.pause();
  musicaPaginaFinal.play();
  musicaFondo.currentTime = 0;

  actualizarEstadisticasFinales();
  clearInterval(intervaloTemporizador);

  //tiempoRestante = 40; 
  //document.getElementById("tiempo").textContent = tiempoRestante;

  
}

function actualizarEstadisticasFinales() {
  
  document.getElementById("moscas").textContent = moscasAtrapadas;
  
}

function iniciarTemporizador() {
  tiempoRestante = 40; 
  document.getElementById("tiempo").textContent = tiempoRestante;

  intervaloTemporizador = setInterval(() => {
    tiempoRestante--;
    document.getElementById("tiempo").textContent = tiempoRestante;

    if (tiempoRestante === 0) {
      clearInterval(intervaloTemporizador);
      gameOver(); 
    }
  }, 1000); 
}

function gameOver() {
  musicaPaginaFinal.play();
  
  musicaFondo.pause();
  musicaFondo.currentTime = 0;
  clearInterval(intervaloBucleJuego);
  clearInterval(intervaloAgregarHoja);
  clearInterval(intervaloAgregarMosca);
  clearInterval(intervaloTemporizador);

  // Mostrar pantalla de fin de juego
  pantallaJuegoNode.style.display = "none";
  pantallaFinalNode.style.display = "flex";

  
  actualizarEstadisticasFinales();
}


//* EVENT LISTENERS:
botonInicioNode.addEventListener("click", comenzarJuego)

botonInicioNode.addEventListener("mouseover", ()=>{
  sonidoSobreBoton.play();
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "ArrowUp"){
    ranitaObj.iniciarSalto();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "ArrowRight" && !teclaDerechaPresionada){
    teclaDerechaPresionada = true;
    ranitaObj.saltoDerecha();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "ArrowLeft" && !teclaIzquierdaPresionada){
    teclaIzquierdaPresionada = true;
    ranitaObj.saltoIzquierda();
  }
})
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    teclaDerechaPresionada = false;
  }

  if (event.key === "ArrowLeft") {
    teclaIzquierdaPresionada = false;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    ranitaObj.dispararLengua(); 
  }
});

botonReinicioNode.addEventListener("click",volverAlInicio)


