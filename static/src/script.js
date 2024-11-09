const btnSignIn = document.getElementById("sign-in")
    btnSignUp = document.getElementById("sign-up")
    containerFormRegistro = document.querySelector(".registro")
    containerFormLogin = document.querySelector(".login")

btnSignIn.addEventListener("click", e => {
    containerFormRegistro.classList.add("hide");
    containerFormLogin.classList.remove("hide")
})

btnSignUp.addEventListener("click", e => {
    containerFormLogin.classList.add("hide");
    containerFormRegistro.classList.remove("hide")
})
