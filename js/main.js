let puntuacion = 0; // 25 aciertas -15 fallas
let numIntentos = 6;
let numIntentosOriginales = numIntentos;
let palabraAdivinar = [];
let palabraMostrar = [];
let teclasBloqueadas = [];
let nodoPista = document.querySelector('#pista');
let nodoResultado = document.querySelector('#resultado').firstChild;
let nodoIntentos = document.querySelector('#intentos');
let nodoIntentosOriginales = document.querySelector('#intentosOriginales');
let nodoPuntuacion = document.querySelector('#puntuacionH2');
let nodoBotonReiniciar = document.querySelector('#BotonReiniciar');

//FUNCION PARA INICIAR LA PARTIDA
function iniciarPartida() {
  var posicionAleatoria = Math.floor(Math.random() * listaPalabras.length);
  
  if (posicionAleatoria % 2 != 0) {
    posicionAleatoria -= 1;
  }
  
  var palabraAleatoria = listaPalabras[posicionAleatoria];
  var tamanioPalabraAleatoria = palabraAleatoria.length;

  for (var i = 0; i < tamanioPalabraAleatoria; i++) {
    if (!palabraAleatoria.charAt(i).match(/[a-zñA-ZÑ]/)) {
      palabraAdivinar.push(palabraAleatoria.charAt(i));
      palabraMostrar.push(palabraAleatoria.charAt(i));
    }
    else {
      palabraAdivinar.push(palabraAleatoria.charAt(i).toLowerCase());
      palabraMostrar.push("_");
    }
  }
  nodoPista.textContent = listaPalabras[posicionAleatoria + 1];
  nodoIntentosOriginales.textContent = numIntentosOriginales;
  actualizarDatosPantalla();
}

// FUNCION PARA ACTUALIZAR LOS DATOS DE LA PANTALLA Y SUS GRÁFICOS
function actualizarDatosPantalla() {
  nodoResultado.textContent = palabraMostrar.join(' ').toUpperCase();
  nodoIntentos.textContent = numIntentos;
  nodoPuntuacion.textContent = puntuacion + " PUNTOS";
}

// FUNCION PARA OBTENER LA LETRA ESCOGIDA
function cogerTecladoFisico(evObject) {
  var capturado = String.fromCharCode(evObject.which);
  if (!teclasBloqueadas.includes("tecla" + capturado)) {
    comprobarTecla(capturado);
  }
}

// FUNCIÓN PARA VERIFICAR SI LA LETRA ESCOGIDA ES CORRECTA EN LA PALABRA
function comprobarTecla(letraUsuario) {
  for (var i = 0; i < palabraAdivinar.length; i++) {
    if (letraUsuario == palabraAdivinar[i]) {
      palabraMostrar[i] = letraUsuario;
      document.getElementById("tecla" + letraUsuario).disabled = true;
      document.getElementById("tecla" + letraUsuario).className = "btn btn-secondary  mr-md-3";
      teclasBloqueadas.push("tecla" + letraUsuario);
      puntuacion += 25;
    }
  }
  if (!palabraAdivinar.includes(letraUsuario)) {
    if (numIntentos > 0) {
      numIntentos -= 1;
      puntuacion -= 15;
    }
    if (numIntentos == 5) {
      document.getElementById('imagen').src = 'img/cabeza.png';
    } else if (numIntentos == 4) {
      document.getElementById('imagen').src = 'img/cuerpo.png';
    } else if (numIntentos == 3) {
      document.getElementById('imagen').src = 'img/brazoIzq.png';
    } else if (numIntentos == 2) {
      document.getElementById('imagen').src = 'img/brazoDer.png';
    } else if (numIntentos == 1) {
      document.getElementById('imagen').src = 'img/piernaIzq.png';
    } else if (numIntentos == 0) {
      document.getElementById('imagen').src = 'img/piernaDer.png';
    }
    // Para deshabilitar la letra ya utilizada
    document.getElementById("tecla" + letraUsuario).disabled = true;
    document.getElementById("tecla" + letraUsuario).className = "btn btn-secondary  mr-md-3";
    teclasBloqueadas.push("tecla" + letraUsuario);
  }

  estadoPartida();
  actualizarDatosPantalla();
}

// FUNCION PARA VERIFICAR CUANDO LA PARTIDA HAYA TERMINADO

function estadoPartida() {
  if (!palabraMostrar.includes('_')) {
    bloquearTodasTeclas()
    document.getElementById('imagen').src = 'img/victoria.png';
    nodoBotonReiniciar.textContent = "Siguiente";
  }

  if (numIntentos == 0) {
    bloquearTodasTeclas()
    palabraMostrar = palabraAdivinar;
    nodoBotonReiniciar.textContent = "Siguiente";
  }
}

// FUNCION PARA DESHABILITAR TODAS LAS LETRAS AL FINALIZAR LA PARTIDA
function bloquearTodasTeclas() {
  var teclas = document.querySelectorAll('button.tecla');
  for (var i = 0; i < teclas.length; i++) {
    teclas[i].disabled = true;
    document.getElementById(teclas[i].id).className = "btn btn-secondary  mr-md-3";
    teclasBloqueadas.push(teclas[i].id);
  }
}

// FUNCION PARA REINICIAR LA PARTIDA

function reiniciarPartida() {
  palabraAdivinar = [];
  palabraMostrar = [];
  numIntentos = numIntentosOriginales;
  if (nodoBotonReiniciar.textContent == "Reiniciar") {
    puntuacion = 0;
  }

  nodoBotonReiniciar.textContent = "Reiniciar";
  document.getElementById('imagen').src = 'img/horca.png';

  for (var i = 0; i < teclasBloqueadas.length; i++) {
    document.getElementById(teclasBloqueadas[i]).disabled = false;
    document.getElementById(teclasBloqueadas[i]).className = "btn btn-primary mr-md-3";
  }
  teclasBloqueadas = [];
  iniciarPartida();
}


// PARA LOS EVENTOS AL CARGAR LA PÁGINA
window.onload = function() {
  document.onkeypress = cogerTecladoFisico;
}

iniciarPartida();

