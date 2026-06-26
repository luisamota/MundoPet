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

            // ─── TENTA LOGIN USUÁRIO ───────────────────────────────────
            try {
                const respostaUsuario = await fetch(`${baseUrl}login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, senha })
                });

                const dadosUsuario = await respostaUsuario.json();

                if (respostaUsuario.ok) {
                    sessionStorage.setItem("token", dadosUsuario.token);
                    sessionStorage.setItem("id_usuarios", dadosUsuario.id_usuarios);
                    sessionStorage.setItem("nomePet", dadosUsuario.nomePet);

                    window.location.href = "../../index.html";
                    return;
                }

            } catch (erro) {
                console.error("Erro ao tentar login usuário:", erro);
            }

            // ─── SE FALHOU, TENTA LOGIN ADMIN ─────────────────────────
            try {
                const respostaAdmin = await fetch(`${baseUrl}admin/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email_admin: email, senha_admin: senha })
                });

                const dadosAdmin = await respostaAdmin.json();

                if (respostaAdmin.ok) {
                    sessionStorage.setItem("tokenAdmin", dadosAdmin.token);
                    sessionStorage.setItem("nome_admin", dadosAdmin.nome_admin);
                    sessionStorage.setItem("id_admin", dadosAdmin.id_admin);

                    window.location.href = "../../Dashboard/HTML/dashboard.html";
                    return;
                }

                // Se os dois falharam
                alert(dadosAdmin.erro || "Email ou senha incorretos.");

            } catch (erro) {
                console.error("Erro ao tentar login admin:", erro);
                alert("Erro de conexão com o servidor.");
            }
        });
    }
});