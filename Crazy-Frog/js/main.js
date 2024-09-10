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
let nuevaMosca = null

let hojasArray = [];
let lenguasArray = [];
let moscasArray = [];

let frecuenciaHoja = 3000;








//* FUNCIONES GLOBALES:

function comenzarJuego(){
  //1: cambiamos pantallas.
  pantallaInicioNode.style.display = "none"; // ocultamos pantalla principal.
  pantallaJuegoNode.style.display = "flex";
  
  //2: añadimos elementos iniciales del juego.
  ranitaObj = new Rana();
  

  //3: iniciar el intervalo del juego.
  setInterval(()=>{ // nuestro intervalo ejecuta la funcion bucleJuego 60 veces por segundo.
    bucleJuego();
  },Math.round(1000/60))

  //4: iniciaremos otros intervalos que requiera el juego
  setInterval(()=>{
    agregarHoja();
  },frecuenciaHoja)

  setInterval(()=>{
    agregarMosca();
  }, 2000);

}

function bucleJuego(){
  // esta será la funcion que se ejecute 60 veces por segundo.
  hojasArray.forEach((cadaHoja)=>{
    cadaHoja.movimientoAutomatico();
  })

  lenguasArray.forEach((cadaLengua)=>{
    cadaLengua.moverLengua();
    detectarChoqueLenguaMosca(cadaLengua);
  })

  detectarSalidaHoja();

  ranitaObj.gravedadSaltoArriba();
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
  moscasArray.forEach((cadaMosca) => {
    const xOverlap = lengua.x < cadaMosca.x + cadaMosca.w && cadaLengua.x + cadaLengua.w > cadaMosca.x;
    const yOverlap = lengua.y < cadaMosca.y + cadaMosca.h && cadaLengua.y + cadaLengua.h > cadaMosca.y;

    if (xOverlap && yOverlap) {
      cadaMosca.removeMosca(); // Eliminar la mosca en caso de colisión
      moscasArray = moscasArray.filter(mosca => mosca !== cadaMosca); // Eliminar la mosca del array
    }
  })
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

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    ranitaObj.dispararLengua(); // Lanza la lengua al presionar la barra espaciadora
  }
});


