import { baseUrl } from './config.js';

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
                const resposta = await fetch(`${baseUrl}/usuarios/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha })
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    alert(dados.erro || "Erro ao fazer login.");
                    return;
                }

                // Salva o id temporariamente pra usar na verificação
                localStorage.setItem("id_usuarios_temp", dados.id_usuarios);

                // Pede o código que foi enviado pro email
                const codigo = prompt("Digite o código enviado para o seu email:");

                if (!codigo) {
                    alert("Código não informado.");
                    return;
                }

                const respostaVerificacao = await fetch(`${baseUrl}/usuarios/verificar-codigo`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        id_usuarios: dados.id_usuarios, 
                        codigo 
                    })
                });

                const dadosVerificacao = await respostaVerificacao.json();

                if (!respostaVerificacao.ok) {
                    alert(dadosVerificacao.erro || "Código inválido.");
                    return;
                }

                // Login completo! Salva o token e redireciona
                localStorage.setItem("token", dadosVerificacao.token);
                localStorage.setItem("id_usuarios", dadosVerificacao.id_usuarios);
                localStorage.setItem("nomePet", dadosVerificacao.nomePet);
                localStorage.removeItem("id_usuarios_temp");

                window.location.href = "index.html";

            } catch (erro) {
                console.error("Erro:", erro);
                alert("Erro de conexão com o servidor.");
            }
        });
    }
});