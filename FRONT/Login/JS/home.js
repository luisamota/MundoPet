document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos do DOM pelas classes
    const btnCadastro = document.querySelector('.btn-cadastro');
    const btnLogin = document.querySelector('.btn-login');
    const btnFechar = document.querySelector('.close-btn');

    // Evento para o botão de Cadastro
    if (btnCadastro) {
        btnCadastro.addEventListener('click', () => {
            window.location.href = '../HTML/registerCatDog.html';
        });
    }

    // Evento para o botão de Login
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            window.location.href = '../HTML/login.html';
        });
    }

    // Evento para o botão de Fechar (X) voltar para a index
    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            window.location.href = 'index.html'; // Altere para '../index.html' se a index estiver na pasta raiz acima
        });
    }
});