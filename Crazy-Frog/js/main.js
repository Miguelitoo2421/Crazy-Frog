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


let hojasArray = [];
let frecuenciaHoja = 3000;






//* FUNCIONES GLOBALES:

function comenzarJuego(){
  //1: cambiamos pantallas.
  pantallaInicioNode.style.display = "none"; // ocultamos pantalla principal.
  pantallaJuegoNode.style.display = "flex";
  
  //2: añadimos elementos iniciales del juego.
  ranitaObj = new Rana();
  hojaObj = new Hoja();
  agregarHoja();
  

  //3: iniciar el intervalo del juego.
  setInterval(()=>{ // nuestro intervalo ejecuta la funcion bucleJuego 60 veces por segundo.
    bucleJuego();
  },Math.round(1000/60))

  //4: iniciaremos otros intervalos que requiera el juego
  setInterval(()=>{
    agregarHoja();
  },frecuenciaHoja)

}


function bucleJuego(){
  // esta será la funcion que se ejecute 60 veces por segundo.
  hojasArray.forEach((cadaHoja)=>{
    cadaHoja.movimientoAutomatico();
  })

  hojasArray2.forEach((cadaHoja2)=>{
    cadaHoja2.movimientoAutomatico2();
  })
}

function agregarHoja(){
  let nuevaHoja = new Hoja();
  hojasArray.push(nuevaHoja)
}



//* EVENT LISTENERS:
botonInicioNode.addEventListener("click", comenzarJuego) // al clickar en GO GAME llamamos a la function comenzar juego.

window.addEventListener("keydown",(event)=>{
  if(event.key === "w"){
    ranitaObj.saltoArriba();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "d"){
    ranitaObj.saltoDerecha();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "a"){
    ranitaObj.saltoIzquierda();
  }
})

window.addEventListener("keydown",(event)=>{
  if(event.key === "s"){
    ranitaObj.saltoAbajo();
  }
})





//*PLANIFICACION:

