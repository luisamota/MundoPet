const btnFechar = document.querySelector('.close-btn');
const linkLogin = document.getElementById('link-login');

linkLogin.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "../HTML/login.html";
});

if (btnFechar) {
    btnFechar.addEventListener("click", () => {
        window.location.href = "../HTML/registerCatDog.html";
    });
}

import { baseUrl } from './config.js';

// navegação
const btnFechar = document.querySelector('.close-btn');
const linkLogin = document.getElementById('link-login');

if (linkLogin) {
    linkLogin.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "../HTML/login.html";
    });
}

if (btnFechar) {
    btnFechar.addEventListener("click", () => {
        window.location.href = "../HTML/registerCatDog.html";
    });
}

// cadastro
var btnCadastrar = document.getElementById("btn-cadastrar");

btnCadastrar.addEventListener("click", function (event) {
    event.preventDefault();

    var frmCadastro = document.querySelector("#frmCadastro");
    const emailValor = frmCadastro.querySelector("#email").value;

    const especieSalva = localStorage.getItem("especieSelecionada");
    if (!especieSalva) {
        alert("Por favor, selecione se o seu pet é um cachorro ou um gato antes de preencher o cadastro.");
        window.location.href = "../HTML/registerCatDog.html";
        return;
    }

    var usuario = {
        email: emailValor,
        nome_usuario: frmCadastro.querySelector("#tutor-name").value,
        nomePet: frmCadastro.querySelector("#petName").value,
        especie: especieSalva,
        raca: frmCadastro.querySelector("#breed").value,
        senha: frmCadastro.querySelector("#confirm-password").value
    };

    fetch(`${baseUrl}/usuario/cadastrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
    .then(async response => {
        if (!response.ok) {
            const dadosErro = await response.json();
            throw new Error(dadosErro.erro || "Erro ao cadastrar usuário");
        }
        return response.json();
    })
    .then(dados => {
        alert(dados.mensagem);
        frmCadastro.reset();
        localStorage.removeItem("especieSelecionada");
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
});