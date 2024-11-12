import { validarCampo, emailRegex, passwordRegex, estadoValidacionCampos,enviarFormulario} from "./registro.js";

const formLogin = document.querySelector(".form-login");
const inputPass = document.querySelector('.form-login input[type="password"]');
const inputEmail = document.querySelector('.form-login input[type="email"]');
const alertaErrorLogin = document.querySelector(".form-login .alerta-error");
const alertaExitoLogin = document.querySelector(".form-login .alerta-exito");
const usuariosGuardados = JSON.parse(localStorage.getItem("registro")) || [];
const inputPassWord = document.getElementById("inputPass");
const inputMail = document.getElementById("inputEmail");


document.addEventListener("DOMContentLoaded", () => {
  formLogin.addEventListener("submit", (e) => {
      var bandera = false;
      e.preventDefault();
      usuariosGuardados.forEach(user => {
        console.log(inputMail.value)
        console.log(inputPassWord.value)
        console.log(user.password)
        console.log(user.password == inputPassWord.value)
        console.log(user.email == inputMail.value)

        if(user.password == inputPassWord.value && user.email == inputMail.value){
          bandera = true;
          console.log("holaaaaaaaa")
          estadoValidacionCampos.userName = true;
          enviarFormulario(formLogin,alertaErrorLogin,alertaExitoLogin);
        }
      });
      if(bandera == false){
        alert ("este usuario no existe");
      }
    });

    inputEmail.addEventListener("input", () => {
      validarCampo(emailRegex,inputEmail,"El correo solo puede contener letras, números, puntos, guiones y guíon bajo.");
    });
  
    inputPass.addEventListener("input", () => {
      validarCampo(passwordRegex,inputPass,"La contraseña tiene que ser de 4 a 12 dígitos");
    });
});