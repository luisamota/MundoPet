document.addEventListener("DOMContentLoaded", () => {
    // 1. Seleção dos elementos (Certifique-se de que os IDs batem com o seu HTML de login)
    const formLogin = document.querySelector("form");
    const btnFechar = document.getElementById("btn-fechar");
    const linkCadastreSe = document.getElementById("link-cadastro");

    // 2. Evento ao clicar no "X" (Redireciona para a página de seleção Cat/Dog)
    if (btnFechar) {
        btnFechar.addEventListener("click", () => {
            window.location.href = "../HTML/home.html";
        });
    }

    // 3. Evento ao clicar no botão "Logar" (Envio do formulário)
    if (formLogin) {
        formLogin.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede o recarregamento automático da página
            
            // Se quiser, no futuro você pode colocar validações de login aqui
            
            // Retorna para a página home
            window.location.href = "index.html"; // Caso o index esteja na mesma pasta do login. Se estiver fora, use ../index.html
        });
    }

    // 4. Evento ao clicar em "Cadastre-se"
    if (linkCadastreSe) {
        linkCadastreSe.addEventListener("click", (event) => {
            event.preventDefault(); // Evita o comportamento padrão do link
            window.location.href = "../HTML/registerCatDog.html";
        });
    }
});