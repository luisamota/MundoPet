import { baseUrl } from "../JS/config.js";

document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.querySelector("form");
    const btnFechar = document.querySelector(".close-btn");
    const linkCadastreSe = document.getElementById("link-cadastro");

    if (btnFechar) {
        btnFechar.addEventListener("click", () => {
            window.location.href = "../HTML/home.html";
        });
    }

    if (linkCadastreSe) {
        linkCadastreSe.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "../HTML/registerCatDog.html";
        });
    }

    if (formLogin) {
        formLogin.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("password").value;

            try {
                const resposta = await fetch(`${baseUrl}/usuario/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha })
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    alert(dados.erro || "Erro ao fazer login.");
                    return;
                }

                localStorage.setItem("token", dados.token);
                localStorage.setItem("id_usuarios", dados.id_usuarios);
                localStorage.setItem("nomePet", dados.nomePet);


                    window.location.href = "../../index.html";

            } catch (erro) {
                console.error("Erro:", erro);
                alert("Erro de conexão com o servidor.");
            }
        });
    }
});