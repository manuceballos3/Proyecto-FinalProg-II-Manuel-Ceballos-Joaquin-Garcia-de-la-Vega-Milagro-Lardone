const formRegister = document.querySelector(".form-register");
const inputUser = document.querySelector('.form-register input[type="text"]');
const inputPass = document.querySelector('.form-register input[type="password"]');
const inputEmail = document.querySelector('.form-register input[type="email"]');
const alertaError = document.querySelector(".form-register .alerta-error");
const alertaExito = document.querySelector(".form-register .alerta-exito");
const usuariosGuardados = JSON.parse(localStorage.getItem("registro")) || [];

// Se definen tres expresiones regulares para validar los campos de entrada
const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const passwordRegex = /^.{4,12}$/;

// mantiene el estado de validacion de los campos, verifica que cada campo sea valido
export const estadoValidacionCampos = {
  userName: false,
  userEmail: false,
  userPassword: false,
};

// Se añade un listener para el evento submit del formulario, el cual previene el comportamiento por defecto (envío del formulario) y llama a la función enviarFormulario.
// funcion para validar cada ccampo cuando el usuario empieza a escribir
document.addEventListener("DOMContentLoaded", () => {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarFormulario(formRegister,alertaError,alertaExito);
  });

  inputUser.addEventListener("input", () => {
    validarCampo(userNameRegex,inputUser,"El usuario tiene que ser de 4 a 16 dígitos y solo puede contener, letras y guión bajo.");
  });

  inputEmail.addEventListener("input", () => {
    validarCampo(emailRegex,inputEmail,"El correo solo puede contener letras, números, puntos, guiones y guíon bajo.");
  });

  inputPass.addEventListener("input", () => {
    validarCampo(passwordRegex,inputPass,"La contraseña tiene que ser de 4 a 12 dígitos");
  });
});


// valida un campo en particular, utilizando  una expresion regular, el campo que se va a validar y  muestra un mensaje por si falla

// si la validacion es correcta se elimina cualquier alerta previa

// si la validacion falla 
// se marca el campo como invalido, se agrrega la clase error, se muestra el mensaje de error

// eliminarAlerta(): Elimina cualquier alerta que esté actualmente visible en el campo.
// mostrarAlerta(): Muestra el mensaje de error cuando la validación falla.
export function validarCampo(regularExpresion, campo, mensaje) {
  const validarCampo= regularExpresion.test(campo.value);
  if (validarCampo) {
    eliminarAlerta(campo.parentElement.parentElement);
    estadoValidacionCampos[campo.name] = true;
    campo.parentElement.classList.remove("error");
    return;
  }
  estadoValidacionCampos[campo.name] = false;
  campo.parentElement.classList.add("error");
  mostrarAlerta(campo.parentElement.parentElement,mensaje);
}

function mostrarAlerta(referencia,mensaje) {
  eliminarAlerta(referencia);
  const alertaDiv = document.createElement("div");
  alertaDiv.classList.add("alerta");
  alertaDiv.textContent = mensaje;
  referencia.appendChild(alertaDiv);
}
// Busca una alerta existente dentro de la referencia y la elimina si la encuentra. 
function eliminarAlerta(referencia) {
  const alerta = referencia.querySelector(".alerta");

  if (alerta) alerta.remove();
}


// Esta función se encarga de validar si todos los campos del formulario son válidos antes de enviarlo
//  si todos los campos son validos se limpia el formulario con el reset, se muestar una alerta de exito y se oculta el error 
// sihay campos invalidos se oculta cualquier alerta de exito 
export function enviarFormulario(form, alertaError,alertaExito) {
  //VALIDAMOS EL ENVIO DE NUESTRO FORMULARIO
  console.log("chau")
  if (estadoValidacionCampos.userName && estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
    //Se agregó estas 3 líneas de código que evitan un error al mostrar las alertas , lo que hacen es resetear los valores del objeto
    estadoValidacionCampos.userName = false;
    estadoValidacionCampos.userEmail = false;
    estadoValidacionCampos.userPassword = false;
    
    console.log("hola")
    const token = {
      user: inputUser.value,
      password: inputPass.value,
      email: inputEmail.value
    }
  
    // Guardar la usuario en localStorage
    const usuariosGuardados = JSON.parse(localStorage.getItem("registro")) || [];
    usuariosGuardados.push(token);
    localStorage.setItem("registro", JSON.stringify(usuariosGuardados));
    
    form.reset();
    alertaExito.classList.add("alertaExito");
    alertaError.classList.remove("alertaError");
    setTimeout(() => {
      alertaExito.classList.remove("alertaExito");
    }, 3000); 
    return;
  }
  
  alertaExito.classList.remove("alertaExito");
  alertaError.classList.add("alertaError");
  setTimeout(() => {
    alertaError.classList.remove("alertaError");
  }, 3000);
}