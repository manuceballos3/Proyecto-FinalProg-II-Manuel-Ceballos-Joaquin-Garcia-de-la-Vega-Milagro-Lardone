const formRegistro = document.querySelector(".form-registro");


// pattrones que ayudan a validar; expresiones regulares
const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/; //miniscula, mayuscula, 0al9, puede contener guion bajo y debe tener entre 4 y 16 caracteres
const emailregex = /^[a-zA-Z0_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/; // minuscula, mayuscula, guion bajo y simbolos +- arroba y punto
const passwordRegex = /^.{4,12}$/; // debe contener entre 4 y 12 caracteres y puede llevar punto 

formRegistro.addEventListener("submit", e => {
    e.preventDefault();
    eviarFormulario()
    console.log("Formulario enviado")
})

function enviarFormulario(){
    //validamos el envio del formulario
}
