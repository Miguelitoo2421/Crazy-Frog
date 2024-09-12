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
let ranitaObj = null; // iniciamos en null ya que en la pantalla de inico la ranita aun no existe
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

let tiempoRestante = 60; // Tiempo en segundos
let intervaloTemporizador = null;

const musicaFondo = new Audio("../music/musica_pantano.mp3")
musicaFondo.loop = true;

const musicaMoscaAtrapada = new Audio("../music/mosca_atrapada.mp3")

const lenguaAlAire = new Audio("../music/lengua_al_aire.mp3")

const musicaPaginaFinal = new Audio("../music/musica_pantalla_final.mp3")
musicaPaginaFinal.loop = true;




//* FUNCIONES GLOBALES:

function comenzarJuego(){

  //1: cambiamos pantallas.
  setTimeout(()=>{
    pantallaInicioNode.style.display = "none"; // ocultamos pantalla principal.
    pantallaJuegoNode.style.display = "flex";
  },300)
  
  //2: añadimos elementos iniciales del juego.
  ranitaObj = new Rana();
  

  //3: iniciar el intervalo del juego.
  intervaloBucleJuego = setInterval(()=>{ // nuestro intervalo ejecuta la funcion bucleJuego 60 veces por segundo.
    bucleJuego();
  },Math.round(1000/60))

  //4: iniciaremos otros intervalos que requiera el juego
  intervaloAgregarHoja = setInterval(()=>{
    agregarHoja();
  },frecuenciaHoja)

  musicaFondo.play();

  intervaloAgregarMosca = setInterval(()=>{
    agregarMosca();
    agregarMosca();
  }, 2000);

  iniciarTemporizador();

}

function bucleJuego(){
  // esta será la funcion que se ejecute 60 veces por segundo.
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
    hojasArray.shift(); // cuando la primera hoja sale del eje x las eliminamos.
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
    const lenguaY1 = lengua.y - lengua.h; // Ajusta según la altura extendida
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
      // llamar function atrape mosca
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
  impacto.src = "../images/explosion-removebg-preview.png"; 
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

  cajaJuegoNode.innerHTML = ""

  pantallaFinalNode.style.display = "none"; // ocultamos pantalla principal.
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
}

function actualizarEstadisticasFinales() {
  // Seleccionamos los elementos span dentro del div
  document.getElementById("moscas").textContent = moscasAtrapadas;
  
}

function iniciarTemporizador() {
  tiempoRestante = 40; // Reiniciar el tiempo
  document.getElementById("tiempo").textContent = tiempoRestante;

  intervaloTemporizador = setInterval(() => {
    tiempoRestante--;
    document.getElementById("tiempo").textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
      clearInterval(intervaloTemporizador);
      gameOver(); // Llamar a la función de fin de juego
    }
  }, 1000); // Actualizar cada segundo
}

function gameOver() {
  musicaPaginaFinal.play();
  // Detener música y otros intervalos
  musicaFondo.pause();
  musicaFondo.currentTime = 0;
  clearInterval(intervaloBucleJuego);
  clearInterval(intervaloAgregarHoja);
  clearInterval(intervaloAgregarMosca);
  clearInterval(intervaloTemporizador);

  // Mostrar pantalla de fin de juego
  pantallaJuegoNode.style.display = "none";
  pantallaFinalNode.style.display = "flex";

  // Actualizar estadísticas finales
  actualizarEstadisticasFinales();
}



//* EVENT LISTENERS:
botonInicioNode.addEventListener("click", comenzarJuego) // al clickar en START llamamos a la function comenzar juego.

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
    ranitaObj.dispararLengua(); // Lanza la lengua al presionar la barra espaciadora
  }
});

botonReinicioNode.addEventListener("click",volverAlInicio)


