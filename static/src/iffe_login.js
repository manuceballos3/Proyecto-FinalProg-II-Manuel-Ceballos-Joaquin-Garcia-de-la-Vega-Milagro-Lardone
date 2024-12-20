//se utilizaun iife, la funcion se ejecuta inmediatamente despues de ser definida, de esta forma evitamos problemas con variables globales

(function () {
    
  const formLogin = document.querySelector(".form-login");
  const inputPass = document.querySelector('.form-login input[type="password"]');
  const inputEmail = document.querySelector('.form-login input[type="email"]');
  const alertaError = document.querySelector(".form-login .alerta-error");
  const alertaExito = document.querySelector(".form-login .alerta-exito");
  let savedUser = "";

  //llamamos a los elementos guardados del local storage
  const usuariosGuardados = JSON.parse(localStorage.getItem("registro")) || [];
  const inputPassWord = document.getElementById("inputPass");
  const inputMail = document.getElementById("inputEmail");

  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegex = /^.{4,12}$/;
  
  // validamos si los campos son correctos
  const estadoValidacionCampos = {
    userEmail: false,
    userPassword: false,
  };
  
  // usuario encontrado, almacena el nombre y se establece la bandera
  document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      var bandera = false;

      usuariosGuardados.forEach(user => {
        
        if(user.password == inputPassWord.value && user.email == inputMail.value){
          savedUser = user.user;
          bandera = true;
          estadoValidacionCampos.userName = true;
        }
      });
      if(bandera == false){
        alert ("este usuario no existe");
        return null;
      }
      enviarFormulario();
    });
  
  
    inputEmail.addEventListener("input", () => {
      validarCampo(emailRegex,inputEmail,"El correo solo puede contener letras, números, puntos, guiones y guíon bajo.");
    });
  
    inputPass.addEventListener("input", () => {
      validarCampo(passwordRegex,inputPass,"La contraseña tiene que ser de 4 a 12 dígitos");
    });
  });
  
  //si eo campo coicide se eliminan alertas y es valido, sino error
  function validarCampo(regularExpresion, campo, mensaje) {
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
  
  function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");
  
    if (alerta) alerta.remove();
  }
  
  
  function enviarFormulario() {
    //VALIDAMOS EL ENVIO DE NUESTRO FORMULARIO
  
    if (estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
    
      estadoValidacionCampos.userEmail = false;
      estadoValidacionCampos.userPassword = false;
  
      formLogin.reset();
      alertaExito.classList.add("alertaExito");
      alert("Bienvenido " + savedUser);
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
  
  })()