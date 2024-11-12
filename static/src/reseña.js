const estrellas = document.querySelectorAll(".estrella");
const valoracion = document.getElementById("valuacion");
const textoResena = document.getElementById("reseña");
const botonEnviar = document.getElementById("enviar");
const contenedorResenas = document.getElementById("reseñas");

// Cargar datos de localStorage
function cargarDatos() {
    const calificacionGuardada = localStorage.getItem("calificacion");
    const resenasGuardadas = JSON.parse(localStorage.getItem("resenas")) || [];

    // Si calificacion existe establecer valores y estrellas
    if (calificacionGuardada) {
        valoracion.innerText = calificacionGuardada;
        estrellas.forEach((estrella, index) => {
            estrella.classList.remove("uno", "dos", "tres", "cuatro", "cinco", "seleccionada");
            if (index < calificacionGuardada) {
                estrella.classList.add(obtenerClaseColorEstrella(calificacionGuardada));
            }
        });
    }

    //Recorrer arreglo para cargar y mostrar las reseñas guardadas
    resenasGuardadas.forEach(resena => {
        agregarResena(resena.valor, resena.texto);
    });
}

// Función para agregar una reseña al contenedor
function agregarResena(valor, texto) {
    const elementoResena = document.createElement("div");
    elementoResena.classList.add("reseña");
    elementoResena.innerHTML = `<p><strong>Calificación: ${valor}/5</strong></p><p>${texto}</p>`;
    contenedorResenas.appendChild(elementoResena);
}

// Event listener para seleccionar calificación
estrellas.forEach((estrella) => {
    estrella.addEventListener("click", () => {
        const valor = parseInt(estrella.getAttribute("data-value"));
        valoracion.innerText = valor;
        localStorage.setItem("calificacion", valor); // Guardar calificación en localStorage

        // Eliminar clases y agregar la clase correcta
        estrellas.forEach((e) => e.classList.remove("uno", "dos", "tres", "cuatro", "cinco"));
        estrellas.forEach((e, index) => {
            if (index < valor) {
                e.classList.add(obtenerClaseColorEstrella(valor));
            }
        });
    });
});

// Event listener para enviar la reseña
botonEnviar.addEventListener("click", () => {
    const resena = textoResena.value;
    const valorUsuario = parseInt(valoracion.innerText);

    if (!valorUsuario || !resena) {
        alert("Por favor selecciona una calificación y escribe una reseña antes de enviar.");
        return;
    }
    
    if (valorUsuario > 0) {
        agregarResena(valorUsuario, resena);

        // Guardar la reseña en localStorage
        const resenasGuardadas = JSON.parse(localStorage.getItem("resenas")) || [];
        resenasGuardadas.push({ valor: valorUsuario, texto: resena });
        localStorage.setItem("resenas", JSON.stringify(resenasGuardadas));

        // Reiniciar el formulario
        textoResena.value = "";
        valoracion.innerText = "0";
        estrellas.forEach((e) => e.classList.remove("uno", "dos", "tres", "cuatro", "cinco"));
    }
});

function obtenerClaseColorEstrella(valor) {
    switch (valor) {
        case 1:
            return "uno";
        case 2:
            return "dos";
            case 3:
                return "tres";
                case 4:
                    return "cuatro";
        case 5:
            return "cinco";
        default:
            return "";
        }
}

// Llamada para cargar los datos al iniciar la página

cargarDatos();