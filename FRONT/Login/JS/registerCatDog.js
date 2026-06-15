document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos do HTML
    const btnDog = document.querySelector(".btn-dog");
    const btnCat = document.querySelector(".btn-cat");
    const btnClose = document.querySelector(".close-btn");

    // Evento de clique no botão Cachorro
    if (btnDog) {
        btnDog.addEventListener("click", () => {
            window.location.href = "../HTML/register.html";
        });
    }

    // Evento de clique no botão Gato
    if (btnCat) {
        btnCat.addEventListener("click", () => {
            window.location.href = "../HTML/register.html";
        });
    }

    // Evento de clique no botão Fechar (X)
    if (btnClose) {
        btnClose.addEventListener("click", () => {
            // Se a index estiver na mesma pasta:
            window.location.href = "../HTML/home.html"; 
            
            // NOTA: Se a sua index estiver uma pasta para trás (junto com a pasta HTML), 
            // mude a linha de cima para: window.location.href = "../index.html";
        });
    }
});