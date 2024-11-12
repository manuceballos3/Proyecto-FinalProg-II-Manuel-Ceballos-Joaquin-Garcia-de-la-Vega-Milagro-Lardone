// Hacemos que la función iniciar se ejecute apenas arranca el sitio web.
window.onload = iniciar;

function iniciar() {
  // Traemos y le agregamos función al boton btnReserva
  var btnReserva = document.getElementById("btnReserva");
  btnReserva.addEventListener("click", reservar);

  // Traemos y le agregamos función al botón btnAnterior
  var btnAnterior = document.getElementById("btnAnterior");
  btnAnterior.addEventListener("click", borrarAnterior);
  mostrarReservas();

  // Inicializamos bandReserva basándonos en localStorage
  var bandReserva = localStorage.getItem("bandReserva") === "true";
}


// Creamos la función reservar
function reservar() {
  // Traemos el input reserva y lo convertimos en localStorage para que se guarde si actualizamos la página
  var reserva = document.getElementById("reserva");
  var fecha = document.getElementById("fecha");
  var cant = document.getElementById("cant");
  
  // Verificamos el estado de bandReserva
  var bandReserva = localStorage.getItem("bandReserva") === "true";

  var reservas = [];
  if (localStorage.reservas != undefined) {
    reservas = JSON.parse(localStorage.reservas);
  }

  // Validaciones
  if (reserva.value === "") {
    alert("Debe completar su nombre y apellido para hacer una reserva");
  } else if (fecha.value === "") {
    alert("Debe completar la fecha y hora para poder hacer una reserva");
  } else if (cant.value === "" || cant.value > 30) {
    alert("Ingrese una cantidad de personas válida, máximo 30 personas");
  } else if (bandReserva) {  // Compara bandReserva como booleano
    alert("Usted ya tiene una reserva hecha. Revise la sección 'Tu Reserva'");
  } else {
    // Añadimos la reserva
    reservas.push(reserva.value + "<br/>Fecha y hora reservadas: " + fecha.value + "<br/>Mesa para " + cant.value);
    localStorage.reservas = JSON.stringify(reservas);
    alert("Usted reservó correctamente. Lo esperamos.");
    
    document.getElementById("formReserva").reset();
    mostrarReservas();
    localStorage.setItem("bandReserva", "true");
  }
}

// Función para mostrar todas las reservas hechas
function mostrarReservas() {
  var divReservas = document.getElementById("divReservas");
  var reservas = [];
  if (localStorage.reservas != undefined) {
    reservas = JSON.parse(localStorage.reservas);
  }
  var html = "<h1 style='text-align: center;'>Tu Reserva:</h1>";
  for (let reserva of reservas) {
    html += "<h2> A nombre de " + reserva + "<h2/><br/>";
  }
  divReservas.innerHTML = html;
}

// Función para borrar la última reserva
function borrarAnterior() {
  var reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  if (reservas.length > 0) {
    reservas.pop();
    localStorage.setItem("reservas", JSON.stringify(reservas));
    alert("Reserva eliminada correctamente.");
    if (reservas.length === 0) {
      localStorage.setItem("bandReserva", "false");
    }
  } else {
    alert("No hay reservas para eliminar.");
  }
  
  mostrarReservas();
}