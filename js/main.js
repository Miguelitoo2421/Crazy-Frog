//* ELEMENTOS DOM:

//! PANTALLAS:
const pantallaInicioNode = document.querySelector("#pantalla-inicio");
const pantallaJuegoNode = document.querySelector("#pantalla-juego");
const pantallaFinalNode = document.querySelector("#pantalla-game-over");
//! BUTTONS:
const botonInicioNode = document.querySelector("#goGame-btn");
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



//* FUNCIONES GLOBALES:

function comenzarJuego(){
  //1: cambiamos pantallas.
  pantallaInicioNode.style.display = "none"; // ocultamos pantalla principal.
  pantallaJuegoNode.style.display = "flex";
  
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

  intervaloAgregarMosca = setInterval(()=>{
    agregarMosca();
  }, 2000);

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
  console.log(moscasArray)
}

function detectarChoqueLenguaMosca(){
  if (!ranitaObj.lengua) return;

  moscasArray.forEach((cadaMosca) => {
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
      cadaMosca.removeMosca();
      console.log(cadaMosca)
      moscasArray = moscasArray.filter(mosca => mosca !== cadaMosca);
    }

    if(moscasAtrapadas === 5){
      gameOver();
    }
  });
}

// function(para agregar imagen mosca atrapada)
function imagenMoscaAplastada(){


}

function gameOver(){
  clearInterval(intervaloBucleJuego);
  clearInterval(intervaloAgregarHoja);
  clearInterval(intervaloAgregarMosca);

  /* ESTO DEBERIA OCURRIR AL REINICIAR EL JUEGO.
  cajaJuegoNode.innerHTML = ""
  ranitaObj = null;
  nuevaMosca = null;
  nuevaMosca = null;
  hojasArray = [];
  moscasArray = [];
  */

  pantallaJuegoNode.style.display = "none"
  pantallaFinalNode.style.display = "flex"


}



//* EVENT LISTENERS:
botonInicioNode.addEventListener("click", comenzarJuego) // al clickar en GO GAME llamamos a la function comenzar juego.

window.addEventListener("keydown",(event)=>{
  if(event.key === "ArrowUp"){
    ranitaObj.iniciarSalto();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "ArrowRight"){
    ranitaObj.saltoDerecha();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "ArrowLeft"){
    ranitaObj.saltoIzquierda();
  }
})

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    ranitaObj.dispararLengua(); // Lanza la lengua al presionar la barra espaciadora
  }
});


