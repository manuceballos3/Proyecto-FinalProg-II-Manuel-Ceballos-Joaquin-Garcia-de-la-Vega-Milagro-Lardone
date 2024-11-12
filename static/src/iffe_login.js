(function () {
    
    const formLogin = document.querySelector(".form-login");
    const inputPass = document.querySelector('.form-login input[type="password"]');
    const inputEmail = document.querySelector('.form-login input[type="email"]');
    const alertaError = document.querySelector(".form-login .alerta-error");
    const alertaExito = document.querySelector(".form-login .alerta-exito");
    
    const usuariosGuardados = JSON.parse(localStorage.getItem("registro")) || [];
    const inputPassWord = document.getElementById("inputPass");
    const inputMail = document.getElementById("inputEmail");

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^.{4,12}$/;
    
    const estadoValidacionCampos = {
      userEmail: false,
      userPassword: false,
    };
    
    document.addEventListener("DOMContentLoaded", () => {
      formLogin.addEventListener("submit", (e) => {
        var bandera = false;
        e.preventDefault();

        usuariosGuardados.forEach(user => {
          // console.log(inputMail.value)
          // console.log(inputPassWord.value)
          // console.log(user.password)
          // console.log(user.password == inputPassWord.value)
          // console.log(user.email == inputMail.value)
  
          if(user.password == inputPassWord.value && user.email == inputMail.value){
            bandera = true;
            console.log("holaaaaaaaa")
            estadoValidacionCampos.userName = true;
            
          }
        });
        if(bandera == false){
          alert ("este usuario no existe");
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